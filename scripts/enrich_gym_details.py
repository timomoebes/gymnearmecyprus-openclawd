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

# Standard amenities list for matching (with variations)
STANDARD_AMENITIES = [
    "pool", "swimming pool", "sauna", "jacuzzi", "steam room", "hot tub",
    "free parking", "parking", "wifi", "wi-fi", "air conditioning", "ac",
    "personal trainers", "personal training", "childcare", "kids room",
    "cafe", "juice bar", "locker rooms", "lockers", "showers", "changing rooms",
    "cardio equipment", "free weights", "machines", "group classes", "yoga studio",
    "pilates studio", "boxing ring", "martial arts", "outdoor training"
]

# Fuzzy amenity mapping (variations -> standard)
AMENITY_VARIATIONS = {
    # Air conditioning
    'ac': 'air conditioning',
    'air con': 'air conditioning',
    'air-conditioning': 'air conditioning',
    'a/c': 'air conditioning',
    'airconditioning': 'air conditioning',
    
    # WiFi
    'wifi': 'wifi',
    'wi-fi': 'wifi',
    'wireless': 'wifi',
    'internet': 'wifi',
    
    # Parking
    'parking': 'parking',
    'free parking': 'parking',
    'car park': 'parking',
    'parking lot': 'parking',
    
    # Pool
    'pool': 'swimming pool',
    'swimming pool': 'swimming pool',
    'swimming': 'swimming pool',
    
    # Personal training
    'personal training': 'personal training',
    'personal trainers': 'personal training',
    'pt': 'personal training',
    'trainer': 'personal training',
    
    # Locker rooms
    'locker room': 'locker rooms',
    'locker rooms': 'locker rooms',
    'lockers': 'locker rooms',
    'changing rooms': 'locker rooms',
    'changing room': 'locker rooms',
    
    # Showers
    'showers': 'showers',
    'shower': 'showers',
    
    # Group classes
    'group classes': 'group classes',
    'classes': 'group classes',
    'group training': 'group classes',
    
    # Yoga/Pilates (these are specialties, but can be amenities too)
    'yoga studio': 'yoga studio',
    'pilates studio': 'pilates studio',
    
    # Martial arts (specialty, but can be amenity)
    'martial arts': 'martial arts',
    'mma': 'martial arts',
    'boxing': 'martial arts',
}

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
    """Extract opening hours from page using structured and plain-text methods"""
    hours_dict = {}
    
    # Method 1: Structured scraping (tables, lists)
    keywords = ['opening hours', 'hours', 'schedule', 'opening times', 'business hours', 'class schedule']
    
    for keyword in keywords:
        elements = soup.find_all(string=re.compile(keyword, re.IGNORECASE))
        for elem in elements:
            parent = elem.find_parent()
            if parent:
                # Look for table
                table = parent.find('table')
                if table:
                    rows = table.find_all('tr')
                    for row in rows:
                        cells = row.find_all(['td', 'th'])
                        if len(cells) >= 2:
                            day = cells[0].get_text(strip=True).lower()
                            time_str = cells[1].get_text(strip=True)
                            if day and time_str and 'closed' not in time_str.lower():
                                hours_dict[day] = time_str
                
                # Look for list
                ul = parent.find('ul') or parent.find('ol')
                if ul:
                    items = ul.find_all('li')
                    for item in items:
                        text = item.get_text(strip=True)
                        match = re.match(r'([A-Za-z]+day?):\s*(.+)', text, re.IGNORECASE)
                        if match:
                            day = match.group(1).lower()
                            time_str = match.group(2)
                            hours_dict[day] = time_str
    
    # Method 2: Plain-text regex extraction (more robust)
    all_text = soup.get_text(separator='\n')
    lines = all_text.split('\n')
    
    # Day patterns
    day_patterns = {
        r'\b(monday|mon\.?)\b': 'monday',
        r'\b(tuesday|tue\.?|tues\.?)\b': 'tuesday',
        r'\b(wednesday|wed\.?)\b': 'wednesday',
        r'\b(thursday|thu\.?|thur\.?|thurs\.?)\b': 'thursday',
        r'\b(friday|fri\.?)\b': 'friday',
        r'\b(saturday|sat\.?)\b': 'saturday',
        r'\b(sunday|sun\.?)\b': 'sunday',
    }
    
    # Time patterns (flexible)
    time_pattern = r'(\d{1,2}[:.]?\d{0,2}\s*(?:am|pm|AM|PM|:00)?)\s*[-–—]\s*(\d{1,2}[:.]?\d{0,2}\s*(?:am|pm|AM|PM|:00)?)'
    time_pattern_simple = r'(\d{1,2}[:.]?\d{0,2})\s*(?:am|pm|AM|PM)?\s*[-–—]\s*(\d{1,2}[:.]?\d{0,2})\s*(?:am|pm|AM|PM)?'
    
    # Search each line for day + time pattern
    for line in lines:
        line_lower = line.lower().strip()
        if len(line) < 10 or len(line) > 100:  # Skip very short/long lines
            continue
        
        # Check if line contains a day
        for day_pattern, day_name in day_patterns.items():
            if re.search(day_pattern, line_lower):
                # Try to extract time from this line
                time_match = re.search(time_pattern, line, re.IGNORECASE)
                if not time_match:
                    time_match = re.search(time_pattern_simple, line, re.IGNORECASE)
                
                if time_match:
                    start_time = time_match.group(1).strip()
                    end_time = time_match.group(2).strip()
                    time_str = f"{start_time}-{end_time}"
                    hours_dict[day_name] = time_str
                    break
                # Also check for "closed" or "24/7"
                elif 'closed' in line_lower:
                    hours_dict[day_name] = 'closed'
                elif '24/7' in line_lower or '24 hours' in line_lower:
                    hours_dict[day_name] = '24/7'
    
    # Method 3: Look for specific class/ID patterns
    selectors = [
        'div.opening-hours', 'div.hours', 'div.schedule', 'div.timetable',
        'table.opening-hours', 'table.hours', 'div#hours', 'section.hours',
        '.opening-times', '.business-hours'
    ]
    
    for selector in selectors:
        try:
            element = soup.select_one(selector)
            if element:
                text = element.get_text(separator='\n')
                for line in text.split('\n'):
                    line_lower = line.lower().strip()
                    for day_pattern, day_name in day_patterns.items():
                        if re.search(day_pattern, line_lower):
                            time_match = re.search(time_pattern, line, re.IGNORECASE)
                            if not time_match:
                                time_match = re.search(time_pattern_simple, line, re.IGNORECASE)
                            if time_match:
                                start_time = time_match.group(1).strip()
                                end_time = time_match.group(2).strip()
                                time_str = f"{start_time}-{end_time}"
                                hours_dict[day_name] = time_str
        except:
            continue
    
    # Standardize day names to 3-letter codes
    day_mapping = {
        'monday': 'mon', 'tuesday': 'tue', 'wednesday': 'wed', 'thursday': 'thu',
        'friday': 'fri', 'saturday': 'sat', 'sunday': 'sun',
        'mon': 'mon', 'tue': 'tue', 'wed': 'wed', 'thu': 'thu',
        'fri': 'fri', 'sat': 'sat', 'sun': 'sun'
    }
    
    standardized = {}
    for day, time_str in hours_dict.items():
        day_key = day_mapping.get(day.lower(), day[:3].lower())
        if day_key in ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']:
            standardized[day_key] = time_str
    
    return standardized if standardized else None

def extract_amenities(soup: BeautifulSoup) -> List[str]:
    """Extract amenities from page using structured and fuzzy text matching"""
    found_amenities = []
    all_text = soup.get_text(separator=' ').lower()
    
    # Method 1: Structured scraping (amenities sections)
    selectors = [
        'div.amenities', 'div.facilities', 'div.features', 'div.services',
        'ul.amenities', 'ul.facilities', 'section.amenities', 'section.facilities',
        '.amenity', '.facility', '.feature'
    ]
    
    amenities_text = ""
    for selector in selectors:
        try:
            elements = soup.select(selector)
            for element in elements:
                amenities_text += " " + element.get_text(separator=' ').lower()
        except:
            continue
    
    # Method 2: Plain-text keyword search (fuzzy matching)
    # Combine structured and full text
    search_text = amenities_text + " " + all_text
    
    # Direct keyword matching (case-insensitive)
    keyword_patterns = {
        r'\b(pool|swimming pool|swimming)\b': 'swimming pool',
        r'\b(sauna)\b': 'sauna',
        r'\b(jacuzzi|hot tub|spa)\b': 'jacuzzi',
        r'\b(steam room|steam)\b': 'steam room',
        r'\b(parking|free parking|car park)\b': 'parking',
        r'\b(wifi|wi-fi|wireless|internet)\b': 'wifi',
        r'\b(ac|air con|air-conditioning|airconditioning|a/c)\b': 'air conditioning',
        r'\b(personal training|personal trainers|pt|trainer)\b': 'personal training',
        r'\b(childcare|kids room|children)\b': 'childcare',
        r'\b(cafe|coffee|juice bar)\b': 'cafe',
        r'\b(locker room|locker rooms|lockers|changing room|changing rooms)\b': 'locker rooms',
        r'\b(shower|showers)\b': 'showers',
        r'\b(cardio equipment|cardio|treadmill|elliptical)\b': 'cardio equipment',
        r'\b(free weights|weights|dumbbells)\b': 'free weights',
        r'\b(group classes|classes|group training)\b': 'group classes',
        r'\b(yoga studio|yoga)\b': 'yoga studio',
        r'\b(pilates studio|pilates)\b': 'pilates studio',
        r'\b(martial arts|mma|boxing|judo|karate)\b': 'martial arts',
    }
    
    # Search for patterns
    for pattern, standard_name in keyword_patterns.items():
        if re.search(pattern, search_text, re.IGNORECASE):
            if standard_name not in found_amenities:
                found_amenities.append(standard_name)
    
    # Method 3: List/table extraction
    for selector in ['ul.amenities', 'ul.facilities', 'ol.amenities']:
        try:
            ul = soup.select_one(selector)
            if ul:
                items = ul.find_all('li')
                for item in items:
                    text = item.get_text(strip=True).lower()
                    # Try to match against variations
                    for variation, standard in AMENITY_VARIATIONS.items():
                        if variation in text:
                            if standard not in found_amenities:
                                found_amenities.append(standard)
                            break
        except:
            continue
    
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
        # Check if we have high confidence data
        has_hours = bool(result['opening_hours'] and len(result['opening_hours']) >= 3)
        has_amenities = bool(result['amenities'] and len(result['amenities']) > 0)
        has_desc = bool(result['description'])
        
        if has_hours and has_amenities:
            result['enrichment_status'] = 'success'
        elif has_hours or has_amenities or has_desc:
            # If we have some data but it's incomplete, mark for review
            if not has_hours and not has_amenities:
                result['enrichment_status'] = 'manual_review_needed'
            else:
                result['enrichment_status'] = 'partial'
        else:
            result['enrichment_status'] = 'failed'
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

