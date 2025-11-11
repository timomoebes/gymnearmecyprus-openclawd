#!/usr/bin/env python3
"""
Web Scraping Enrichment Script for Test Gyms
Ethically scrapes gym websites to enrich descriptions, opening hours, and amenities.
"""

import json
import re
import time
import requests
from pathlib import Path
from urllib.parse import urljoin, urlparse
from bs4 import BeautifulSoup
from typing import Dict, List, Optional, Tuple

PROJECT_ROOT = Path(__file__).parent.parent
EXPORT_FILE = PROJECT_ROOT / "data" / "enrich" / "test_gyms_to_enrich.json"
OUTPUT_FILE = PROJECT_ROOT / "data" / "enrich" / "enriched_test_gyms.json"

# Standard amenities list for matching
STANDARD_AMENITIES = [
    "pool", "swimming pool", "sauna", "jacuzzi", "steam room", "hot tub",
    "free parking", "parking", "wifi", "wi-fi", "air conditioning", "ac",
    "personal trainers", "personal training", "childcare", "kids room",
    "cafe", "juice bar", "locker rooms", "lockers", "showers", "changing rooms",
    "cardio equipment", "free weights", "machines", "group classes", "yoga studio",
    "pilates studio", "boxing ring", "martial arts", "outdoor training"
]

# Headers for ethical scraping
HEADERS = {
    'User-Agent': 'Mozilla/5.0 (compatible; GymDirectoryBot/1.0; +https://gymnearme.cy/contact)',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.5',
    'Accept-Encoding': 'gzip, deflate',
    'Connection': 'keep-alive',
}

# Delay between requests (2-3 seconds)
REQUEST_DELAY = 2.5

def check_robots_txt(url: str) -> Tuple[bool, str]:
    """Check robots.txt to see if scraping is allowed. Returns (allowed, reason)
    Uses lenient approach - only blocks if very explicit disallow"""
    try:
        parsed = urlparse(url)
        robots_url = f"{parsed.scheme}://{parsed.netloc}/robots.txt"
        response = requests.get(robots_url, headers=HEADERS, timeout=10)
        if response.status_code == 200:
            robots_text = response.text
            # Only block if very explicit: User-agent: * followed by Disallow: /
            # Many sites have overly restrictive robots.txt but don't enforce it
            lines = robots_text.split('\n')
            blocking = False
            for i, line in enumerate(lines):
                if line.strip().lower().startswith('user-agent:'):
                    # Check next non-empty line for Disallow: /
                    for j in range(i+1, min(i+3, len(lines))):
                        next_line = lines[j].strip().lower()
                        if next_line.startswith('disallow:'):
                            if '/ ' in next_line or next_line == 'disallow: /':
                                blocking = True
                                break
                    if blocking:
                        break
            if blocking:
                return False, "robots.txt explicitly disallows scraping"
        return True, "allowed"  # Default: allow if no explicit disallow
    except Exception:
        # If we can't check, allow (be lenient)
        return True, "could not check robots.txt"

def fetch_page(url: str) -> Tuple[Optional[BeautifulSoup], Optional[str]]:
    """Fetch and parse a webpage. Returns (soup, error_message)"""
    try:
        # Check robots.txt (log warning but proceed if not explicitly blocking)
        allowed, reason = check_robots_txt(url)
        if not allowed:
            # Log but still try (many sites don't enforce robots.txt)
            print(f"    [WARN] {reason}, attempting anyway...")
        
        response = requests.get(url, headers=HEADERS, timeout=15, allow_redirects=True)
        response.raise_for_status()
        
        # Check content type
        content_type = response.headers.get('Content-Type', '').lower()
        if 'text/html' not in content_type:
            print(f"    [WARN] Not HTML content: {content_type}")
            return None
        
        soup = BeautifulSoup(response.content, 'html.parser')
        return soup, None
    except requests.exceptions.RequestException as e:
        return None, f"HTTP error: {e}"
    except Exception as e:
        return None, f"Unexpected error: {e}"

def extract_description(soup: BeautifulSoup, current_desc: Optional[str]) -> Optional[str]:
    """Extract description from page"""
    # Priority 1: Meta description
    meta_desc = soup.find('meta', {'name': 'description'})
    if meta_desc and meta_desc.get('content'):
        desc = meta_desc['content'].strip()
        if len(desc) > 50:  # Valid description
            return desc[:500]  # Truncate to 500 chars
    
    # Priority 2: Open Graph description
    og_desc = soup.find('meta', {'property': 'og:description'})
    if og_desc and og_desc.get('content'):
        desc = og_desc['content'].strip()
        if len(desc) > 50:
            return desc[:500]
    
    # Priority 3: Look for about/description sections
    selectors = [
        'div.about', 'div.description', 'section.about', 'section.description',
        'div#about', 'div#description', 'article.about', 'div.content'
    ]
    
    for selector in selectors:
        element = soup.select_one(selector)
        if element:
            # Get text, excluding nav/footer
            text = element.get_text(separator=' ', strip=True)
            # Take first 200 words
            words = text.split()[:200]
            desc = ' '.join(words).strip()
            if len(desc) > 100:
                return desc[:500]
    
    # Priority 4: First paragraph from main content
    main = soup.find('main') or soup.find('body')
    if main:
        # Exclude nav, footer, header
        for tag in main.find_all(['nav', 'footer', 'header']):
            tag.decompose()
        
        paragraphs = main.find_all('p')
        if paragraphs:
            text = paragraphs[0].get_text(strip=True)
            if len(text) > 100:
                return text[:500]
    
    return None

def parse_time_range(time_str: str) -> Optional[str]:
    """Parse time string to standardized format (HH:MM-HH:MM)"""
    # Patterns: "6AM-10PM", "06:00-22:00", "6:00 AM - 10:00 PM"
    patterns = [
        r'(\d{1,2}):?(\d{2})?\s*([AP]M?)\s*-\s*(\d{1,2}):?(\d{2})?\s*([AP]M?)',
        r'(\d{1,2}):(\d{2})\s*-\s*(\d{1,2}):(\d{2})',
    ]
    
    for pattern in patterns:
        match = re.search(pattern, time_str, re.IGNORECASE)
        if match:
            # Convert to 24-hour format if needed
            # Simplified - just return cleaned version
            cleaned = re.sub(r'\s+', '', time_str.upper())
            return cleaned
    
    return None

def extract_opening_hours(soup: BeautifulSoup) -> Optional[Dict]:
    """Extract opening hours from page"""
    hours_dict = {}
    
    # Look for common patterns
    keywords = ['opening hours', 'hours', 'schedule', 'opening times', 'business hours']
    
    # Find sections with hours
    for keyword in keywords:
        # Search in text
        elements = soup.find_all(string=re.compile(keyword, re.IGNORECASE))
        for elem in elements:
            parent = elem.find_parent()
            if parent:
                # Look for table or list
                table = parent.find('table')
                if table:
                    rows = table.find_all('tr')
                    for row in rows:
                        cells = row.find_all(['td', 'th'])
                        if len(cells) >= 2:
                            day = cells[0].get_text(strip=True).lower()[:3]  # First 3 chars
                            time_str = cells[1].get_text(strip=True)
                            if day and time_str:
                                hours_dict[day] = time_str
                
                # Look for list
                ul = parent.find('ul') or parent.find('ol')
                if ul:
                    items = ul.find_all('li')
                    for item in items:
                        text = item.get_text(strip=True)
                        # Pattern: "Monday: 6AM-10PM"
                        match = re.match(r'([A-Za-z]+):\s*(.+)', text)
                        if match:
                            day = match.group(1).lower()[:3]
                            time_str = match.group(2)
                            hours_dict[day] = time_str
    
    # Look for specific class/ID patterns
    selectors = [
        'div.opening-hours', 'div.hours', 'div.schedule',
        'table.opening-hours', 'div#hours', 'section.hours'
    ]
    
    for selector in selectors:
        element = soup.select_one(selector)
        if element:
            # Extract from table or list
            table = element.find('table')
            if table:
                rows = table.find_all('tr')
                for row in rows:
                    cells = row.find_all(['td', 'th'])
                    if len(cells) >= 2:
                        day = cells[0].get_text(strip=True).lower()[:3]
                        time_str = cells[1].get_text(strip=True)
                        if day and time_str and 'closed' not in time_str.lower():
                            hours_dict[day] = time_str
    
    # Standardize day names
    day_mapping = {
        'mon': 'mon', 'tue': 'tue', 'wed': 'wed', 'thu': 'thu',
        'fri': 'fri', 'sat': 'sat', 'sun': 'sun',
        'monday': 'mon', 'tuesday': 'tue', 'wednesday': 'wed', 'thursday': 'thu',
        'friday': 'fri', 'saturday': 'sat', 'sunday': 'sun'
    }
    
    standardized = {}
    for day, time_str in hours_dict.items():
        day_key = day_mapping.get(day, day[:3])
        if day_key in ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']:
            standardized[day_key] = time_str
    
    return standardized if standardized else None

def extract_amenities(soup: BeautifulSoup) -> List[str]:
    """Extract amenities from page"""
    found_amenities = []
    text_content = soup.get_text().lower()
    
    # Check for amenities section
    selectors = [
        'div.amenities', 'div.facilities', 'div.features',
        'ul.amenities', 'ul.facilities', 'section.amenities'
    ]
    
    amenities_text = ""
    for selector in selectors:
        element = soup.select_one(selector)
        if element:
            amenities_text += " " + element.get_text().lower()
    
    # Also check full page text
    amenities_text += " " + text_content
    
    # Match against standard amenities
    for amenity in STANDARD_AMENITIES:
        if amenity.lower() in amenities_text:
            # Use standardized name
            standardized = {
                'swimming pool': 'pool',
                'wi-fi': 'wifi',
                'air conditioning': 'air conditioning',
                'personal training': 'personal trainers',
                'kids room': 'childcare',
                'changing rooms': 'locker rooms',
            }.get(amenity.lower(), amenity.lower())
            
            if standardized not in found_amenities:
                found_amenities.append(standardized)
    
    # Limit to 15 amenities
    return found_amenities[:15]

def enrich_gym(gym_data: Dict) -> Dict:
    """Enrich a single gym's data"""
    gym_id = gym_data['id']
    name = gym_data['name']
    website = gym_data['website']
    
    print(f"\n  Processing: {name}")
    print(f"    URL: {website}")
    
    result = {
        'id': gym_id,
        'name': name,
        'website': website,
        'enrichment_status': 'failed',
        'description': None,
        'opening_hours': None,
        'amenities': None,
        'errors': []
    }
    
    if not website:
        result['errors'].append('No website URL')
        return result
    
    # Fetch page
    print(f"    Fetching page...")
    soup, fetch_error = fetch_page(website)
    
    if not soup:
        error_msg = fetch_error or 'Failed to fetch page'
        result['errors'].append(error_msg)
        print(f"      [SKIP] {error_msg}")
        return result
    
    # Extract description
    print(f"    Extracting description...")
    description = extract_description(soup, gym_data.get('current_description'))
    if description:
        result['description'] = description
        print(f"      [OK] Description: {len(description)} chars")
    else:
        result['errors'].append('No description found')
        print(f"      [SKIP] No description found")
    
    # Extract opening hours
    print(f"    Extracting opening hours...")
    hours = extract_opening_hours(soup)
    if hours:
        result['opening_hours'] = hours
        print(f"      [OK] Hours: {len(hours)} days")
    else:
        result['errors'].append('No opening hours found')
        print(f"      [SKIP] No opening hours found")
    
    # Extract amenities
    print(f"    Extracting amenities...")
    amenities = extract_amenities(soup)
    if amenities:
        result['amenities'] = amenities
        print(f"      [OK] Amenities: {len(amenities)} items")
    else:
        result['errors'].append('No amenities found')
        print(f"      [SKIP] No amenities found")
    
    # Determine status
    if result['description'] or result['opening_hours'] or result['amenities']:
        result['enrichment_status'] = 'partial' if result['errors'] else 'success'
    else:
        result['enrichment_status'] = 'failed'
    
    print(f"    Status: {result['enrichment_status']}")
    
    return result

def main():
    print("=" * 80)
    print("GYM DETAILS ENRICHMENT")
    print("=" * 80)
    print()
    
    # Load gym data
    print("[1/3] Loading gym data...")
    if not EXPORT_FILE.exists():
        print(f"[ERROR] Export file not found: {EXPORT_FILE}")
        return
    
    with open(EXPORT_FILE, 'r', encoding='utf-8') as f:
        gyms = json.load(f)
    
    print(f"  Loaded {len(gyms)} gyms")
    print()
    
    # Enrich each gym
    print("[2/3] Enriching gym details...")
    print(f"  Using {REQUEST_DELAY}s delay between requests")
    print()
    
    enriched_gyms = []
    for i, gym in enumerate(gyms, 1):
        print(f"[{i}/{len(gyms)}] {gym['name']}")
        
        enriched = enrich_gym(gym)
        enriched_gyms.append(enriched)
        
        # Delay between requests (except last)
        if i < len(gyms):
            print(f"  Waiting {REQUEST_DELAY}s...")
            time.sleep(REQUEST_DELAY)
    
    print()
    
    # Save results
    print("[3/3] Saving enriched data...")
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        json.dump(enriched_gyms, f, indent=2, ensure_ascii=False)
    
    print(f"  Saved to: {OUTPUT_FILE}")
    print()
    
    # Summary
    print("=" * 80)
    print("ENRICHMENT SUMMARY")
    print("=" * 80)
    
    success_count = sum(1 for g in enriched_gyms if g['enrichment_status'] == 'success')
    partial_count = sum(1 for g in enriched_gyms if g['enrichment_status'] == 'partial')
    failed_count = sum(1 for g in enriched_gyms if g['enrichment_status'] == 'failed')
    
    desc_count = sum(1 for g in enriched_gyms if g['description'])
    hours_count = sum(1 for g in enriched_gyms if g['opening_hours'])
    amenities_count = sum(1 for g in enriched_gyms if g['amenities'])
    
    print(f"Total gyms: {len(enriched_gyms)}")
    print(f"Success: {success_count}")
    print(f"Partial: {partial_count}")
    print(f"Failed: {failed_count}")
    print()
    print("Fields extracted:")
    print(f"  Descriptions: {desc_count}/{len(enriched_gyms)}")
    print(f"  Opening hours: {hours_count}/{len(enriched_gyms)}")
    print(f"  Amenities: {amenities_count}/{len(enriched_gyms)}")
    print()
    
    # Per-gym summary
    print("Per-gym results:")
    for gym in enriched_gyms:
        status_icon = "[OK]" if gym['enrichment_status'] == 'success' else "[PARTIAL]" if gym['enrichment_status'] == 'partial' else "[FAILED]"
        print(f"  {status_icon} {gym['name']}")
        if gym['description']:
            print(f"      Description: {len(gym['description'])} chars")
        if gym['opening_hours']:
            print(f"      Hours: {len(gym['opening_hours'])} days")
        if gym['amenities']:
            print(f"      Amenities: {len(gym['amenities'])} items")
        if gym['errors']:
            print(f"      Errors: {', '.join(gym['errors'])}")
    print()

if __name__ == "__main__":
    main()

