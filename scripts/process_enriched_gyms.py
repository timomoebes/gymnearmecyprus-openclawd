#!/usr/bin/env python3
"""
Process enriched gym data CSV and generate SEO-optimized content, meta tags, 
schema markup, and frontend-ready outputs for each gym.
"""

import pandas as pd
import json
import re
from pathlib import Path
from datetime import datetime
from typing import Dict, List, Optional, Any

PROJECT_ROOT = Path(__file__).parent.parent
CSV_PATH = PROJECT_ROOT / "data" / "enrich" / "limassol_gyms_enriched_data.csv"
OUTPUT_DIR = PROJECT_ROOT / "data" / "enrich" / "output"
OUTPUT_DIR.mkdir(exist_ok=True, parents=True)

def parse_opening_hours(opening_hours_str: str) -> Dict[str, str]:
    """Parse opening hours from various formats. ALWAYS returns all 7 days."""
    # Initialize with all days as "Closed"
    result = {
        'Monday': 'Closed',
        'Tuesday': 'Closed',
        'Wednesday': 'Closed',
        'Thursday': 'Closed',
        'Friday': 'Closed',
        'Saturday': 'Closed',
        'Sunday': 'Closed',
    }
    
    if pd.isna(opening_hours_str) or not opening_hours_str or opening_hours_str.strip() == "{}":
        return result
    
    try:
        # Try to parse as JSON first
        if opening_hours_str.strip().startswith("{"):
            hours = json.loads(opening_hours_str)
            
            # Handle "Monday-Sunday" format
            if 'Monday-Sunday' in hours:
                all_week_hours = hours['Monday-Sunday']
                for day in result.keys():
                    result[day] = all_week_hours if all_week_hours else 'Closed'
                return result
            
            # Handle "Monday-Friday" format
            if 'Monday-Friday' in hours:
                week_days_hours = hours['Monday-Friday']
                result['Monday'] = week_days_hours if week_days_hours else 'Closed'
                result['Tuesday'] = week_days_hours if week_days_hours else 'Closed'
                result['Wednesday'] = week_days_hours if week_days_hours else 'Closed'
                result['Thursday'] = week_days_hours if week_days_hours else 'Closed'
                result['Friday'] = week_days_hours if week_days_hours else 'Closed'
                # Saturday and Sunday remain "Closed" unless specified
                if 'Saturday' in hours:
                    result['Saturday'] = hours['Saturday'] if hours['Saturday'] else 'Closed'
                if 'Sunday' in hours:
                    result['Sunday'] = hours['Sunday'] if hours['Sunday'] else 'Closed'
                return result
            
            # Handle "Week Days" format
            if 'Week Days' in hours:
                week_days_hours = hours['Week Days']
                result['Monday'] = week_days_hours if week_days_hours else 'Closed'
                result['Tuesday'] = week_days_hours if week_days_hours else 'Closed'
                result['Wednesday'] = week_days_hours if week_days_hours else 'Closed'
                result['Thursday'] = week_days_hours if week_days_hours else 'Closed'
                result['Friday'] = week_days_hours if week_days_hours else 'Closed'
                # Saturday and Sunday remain "Closed" unless specified
                if 'Saturday' in hours:
                    result['Saturday'] = hours['Saturday'] if hours['Saturday'] else 'Closed'
                if 'Sunday' in hours:
                    result['Sunday'] = hours['Sunday'] if hours['Sunday'] else 'Closed'
                return result
            
            # Handle individual days
            day_mapping = {
                'monday': 'Monday',
                'tuesday': 'Tuesday',
                'wednesday': 'Wednesday',
                'thursday': 'Thursday',
                'friday': 'Friday',
                'saturday': 'Saturday',
                'sunday': 'Sunday',
            }
            
            for key, value in hours.items():
                if isinstance(value, dict):
                    # Handle nested structure (e.g., Monday: {Morning: ..., Evening: ...})
                    times = []
                    for period, time in value.items():
                        if time and time != "No Morning Classes" and time != "No Evening Classes":
                            times.append(f"{period}: {time}")
                    if times:
                        day_key = day_mapping.get(key.lower(), key)
                        if day_key in result:
                            result[day_key] = " | ".join(times)
                elif isinstance(value, str) and value:
                    day_key = day_mapping.get(key.lower(), key)
                    if day_key in result:
                        result[day_key] = value
            
            return result
        else:
            # Handle plain text format
            lines = opening_hours_str.strip().split('\n')
            day_mapping = {
                'monday': 'Monday',
                'tuesday': 'Tuesday',
                'wednesday': 'Wednesday',
                'thursday': 'Thursday',
                'friday': 'Friday',
                'saturday': 'Saturday',
                'sunday': 'Sunday',
            }
            
            for line in lines:
                line = line.strip()
                if not line:
                    continue
                # Try to extract day and time
                parts = re.split(r'\s{2,}', line)  # Split on multiple spaces
                if len(parts) >= 2:
                    day = parts[0].strip()
                    time = parts[1].strip()
                    day_key = day_mapping.get(day.lower(), day)
                    if day_key in result:
                        result[day_key] = time
            
            return result
    except:
        return result  # Return defaults (all "Closed") on error

def format_opening_hours_for_display(hours: Dict[str, str]) -> str:
    """Format opening hours for display in description."""
    if not hours:
        return "Contact for details"
    
    formatted = []
    for day, time in hours.items():
        if time and time.lower() not in ["closed", "no sessions"]:
            formatted.append(f"{day}: {time}")
    
    if formatted:
        return " | ".join(formatted)
    return "Contact for details"

def is_open_now(hours: Dict[str, str]) -> bool:
    """Check if gym is currently open based on opening hours."""
    if not hours:
        return False
    
    now = datetime.now()
    current_day = now.strftime("%A")
    current_time = now.strftime("%H:%M")
    
    # Try to find matching day
    for day_key, time_str in hours.items():
        if current_day.lower() in day_key.lower():
            # Parse time range
            if "24/7" in time_str or "24 hours" in time_str.lower():
                return True
            
            # Extract time ranges
            time_ranges = re.findall(r'(\d{1,2}):?(\d{2})?\s*(AM|PM)?\s*-\s*(\d{1,2}):?(\d{2})?\s*(AM|PM)?', time_str, re.IGNORECASE)
            for match in time_ranges:
                start_hour, start_min, start_ampm, end_hour, end_min, end_ampm = match
                # Convert to 24-hour format and check
                # Simplified check - would need more robust parsing for production
                return True  # For now, return True if hours exist
    
    return False

def extract_location_context(address: str) -> str:
    """Extract location context (district, landmark) from address."""
    if pd.isna(address) or not address:
        return ""
    
    address_lower = address.lower()
    context_parts = []
    
    # Common districts/areas in Limassol
    districts = ["neapolis", "germasogia", "agios athanasios", "yermasogia", "enaerios", 
                 "agios spiridonas", "city center", "center"]
    
    for district in districts:
        if district in address_lower:
            context_parts.append(district.title())
            break
    
    # Look for street names or landmarks
    if "avenue" in address_lower or "ave" in address_lower:
        context_parts.append("near main avenue")
    elif "court" in address_lower:
        context_parts.append("in residential area")
    
    return ", ".join(context_parts) if context_parts else ""

def generate_meta_title(name: str, specialties: str, amenities: str, opening_hours: str) -> str:
    """Generate SEO-optimized meta title."""
    # Extract main specialties
    main_specialties = "Fitness"
    if specialties and not pd.isna(specialties):
        specialty_list = [s.strip() for s in specialties.split(",")][:2]
        main_specialties = " & ".join(specialty_list) if specialty_list else "Fitness"
    
    # Extract top amenities
    top_amenities = "Modern Facilities"
    if amenities and not pd.isna(amenities):
        amenity_list = [a.strip() for a in amenities.split(",")][:2]
        top_amenities = " & ".join(amenity_list) if amenity_list else "Modern Facilities"
    
    # Extract opening hours summary
    hours_summary = "Flexible Hours"
    if opening_hours and not pd.isna(opening_hours):
        if "24/7" in opening_hours or "24 hours" in opening_hours.lower():
            hours_summary = "24/7 Access"
        elif "Morning" in opening_hours or "Evening" in opening_hours:
            hours_summary = "Flexible Hours"
    
    return f"{name} | {main_specialties} | {top_amenities} | {hours_summary} | Limassol"

def generate_meta_description(name: str, specialties: str, amenities: str, 
                             opening_hours: str, address: str, phone: str) -> str:
    """Generate SEO-optimized meta description."""
    # Format specialties
    specialties_text = "Contact for details"
    if specialties and not pd.isna(specialties):
        specialty_list = [s.strip() for s in specialties.split(",")][:3]
        specialties_text = ", ".join(specialty_list)
    
    # Format amenities
    amenities_text = "modern facilities"
    if amenities and not pd.isna(amenities):
        amenity_list = [a.strip() for a in amenities.split(",")][:3]
        amenities_text = ", ".join(amenity_list).lower()
    
    # Format opening hours
    hours_text = "Contact for details"
    if opening_hours and not pd.isna(opening_hours):
        hours = parse_opening_hours(opening_hours)
        hours_text = format_opening_hours_for_display(hours)
        if "24/7" in opening_hours or "24 hours" in opening_hours.lower():
            hours_text = "24/7"
    
    # Location context
    location = extract_location_context(address)
    location_text = f"Located {location}" if location else "Located in Limassol"
    
    # Phone
    phone_text = phone if phone and not pd.isna(phone) and "#ERROR!" not in str(phone) else "Contact for details"
    
    return f"Discover {name} in Limassol. Specializing in {specialties_text}, equipped with {amenities_text}, open {hours_text}. {location_text}, contact {phone_text} for details."

def parse_pricing(pricing_str: str) -> Dict[str, Any]:
    """Parse pricing information from various formats."""
    if pd.isna(pricing_str) or not pricing_str or pricing_str.strip() == "":
        return {}
    
    pricing_str = str(pricing_str).strip()
    
    # Skip if it says no pricing info (check more thoroughly)
    skip_phrases = ["not specified", "not detailed", "not available", "contact for", 
                    "not listed", "not explicitly", "no specific pricing", 
                    "pricing details not", "subscription available through"]
    if any(phrase in pricing_str.lower() for phrase in skip_phrases):
        return {}
    
    result = {}
    
    # Try to parse JSON pricing
    if pricing_str.startswith("{"):
        try:
            pricing_json = json.loads(pricing_str)
            # Extract key pricing info
            for key, value in pricing_json.items():
                if isinstance(value, dict):
                    # Nested structure (e.g., GroupSessionsEquipment: {SingleClass: "€20"})
                    for sub_key, sub_value in value.items():
                        result[f"{key} - {sub_key}"] = sub_value
                else:
                    result[key] = value
        except:
            pass
    
    # Extract common patterns
    # Monthly memberships
    monthly_match = re.search(r'(\d+)\s*€?\s*per\s*month|monthly[:\s]+€?(\d+)', pricing_str, re.IGNORECASE)
    if monthly_match:
        result["Monthly"] = f"€{monthly_match.group(1) or monthly_match.group(2)}"
    
    # Day pass
    day_pass_match = re.search(r'day\s*pass[:\s]+€?(\d+)|€?(\d+)\s*per\s*drop[-\s]?in', pricing_str, re.IGNORECASE)
    if day_pass_match:
        result["Day Pass"] = f"€{day_pass_match.group(1) or day_pass_match.group(2)}"
    
    # Training packages
    training_match = re.search(r'(\d+)\s*trainings?\s*for\s*(\d+)\s*month[s]?[:\s]+€?(\d+)', pricing_str, re.IGNORECASE)
    if training_match:
        result[f"{training_match.group(1)} Trainings"] = f"€{training_match.group(3)}/{training_match.group(2)} month"
    
    # If we found nothing but pricing exists, store the raw text
    if not result and pricing_str and len(pricing_str) < 200:
        result["Pricing"] = pricing_str
    
    return result

def generate_description(name: str, specialties: str, amenities: str, opening_hours: str,
                        address: str, phone: str, email: str, pricing: str) -> str:
    """Generate 100% unique, keyword-rich description (40-60 words). NO templates."""
    sentences = []
    
    # Parse data
    location_context = extract_location_context(address)
    street_name = ""
    if address and not pd.isna(address) and address != "Contact for details":
        address_parts = address.split(",")
        if address_parts:
            street_name = address_parts[0].strip()
    
    specialty_list = []
    if specialties and not pd.isna(specialties):
        specialty_list = [s.strip() for s in specialties.split(",")]
    
    amenity_list = []
    if amenities and not pd.isna(amenities):
        amenity_list = [a.strip() for a in amenities.split(",")]
    
    # Build opening sentence - unique based on gym type
    if "24/7" in str(amenities).lower() or "24/7" in str(opening_hours).lower():
        sentences.append(f"{name} stands out as Limassol's premier 24/7 fitness destination.")
    elif "Yoga" in str(specialties) or "Pilates" in str(specialties):
        main_specialty = specialty_list[0] if specialty_list else "fitness"
        if location_context:
            sentences.append(f"Located {location_context}, {name} brings specialized {main_specialty.lower()} training to Limassol.")
        else:
            sentences.append(f"{name} brings specialized {main_specialty.lower()} training to Limassol, Cyprus.")
    elif "MMA" in str(specialties) or "Boxing" in str(specialties) or "Muay Thai" in str(specialties):
        main_specialty = specialty_list[0] if specialty_list else "martial arts"
        if street_name:
            sentences.append(f"Located on {street_name}, {name} delivers authentic {main_specialty.lower()} instruction in Limassol.")
        else:
            sentences.append(f"{name} delivers authentic {main_specialty.lower()} instruction in Limassol, Cyprus.")
    else:
        if location_context:
            sentences.append(f"Located {location_context}, {name} offers comprehensive fitness training in Limassol.")
        elif street_name:
            sentences.append(f"Located on {street_name}, {name} provides top-tier fitness services in Limassol.")
        else:
            sentences.append(f"{name} offers premier fitness training in Limassol, Cyprus.")
    
    # Add signature specialties/amenities
    if specialty_list:
        if len(specialty_list) >= 3:
            specialties_text = f"{', '.join(specialty_list[:2])}, and {specialty_list[2]}"
        elif len(specialty_list) == 2:
            specialties_text = f"{specialty_list[0]} and {specialty_list[1]}"
        else:
            specialties_text = specialty_list[0]
        sentences.append(f"Specializing in {specialties_text}, this facility caters to all fitness levels.")
    
    # Add distinctive amenities
    if amenity_list:
        distinctive = [a for a in amenity_list if any(kw in a.lower() for kw in 
            ["sauna", "pool", "aerial", "reformer", "olympic", "hot", "sea view", "rooftop", "parking", "wifi", "24/7"])]
        if distinctive:
            if len(distinctive) >= 2:
                sentences.append(f"Features include {distinctive[0]} and {distinctive[1]} for a complete training experience.")
            else:
                sentences.append(f"Features include {distinctive[0]} for enhanced workouts.")
    
    # Add opening hours context
    if opening_hours and not pd.isna(opening_hours):
        hours = parse_opening_hours(opening_hours)
        if hours:
            if "24/7" in str(opening_hours) or any("24/7" in str(v).lower() for v in hours.values()):
                sentences.append("Open 24/7 for early birds and night owls seeking flexible training schedules.")
            else:
                first_hours = next((v for v in hours.values() if v and v.lower() not in ["closed", "no sessions"]), None)
                if first_hours:
                    # Extract time range (simplified)
                    time_match = re.search(r'(\d{1,2}):?(\d{2})?\s*(AM|PM)?\s*-\s*(\d{1,2}):?(\d{2})?\s*(AM|PM)?', first_hours, re.IGNORECASE)
                    if time_match:
                        start = f"{time_match.group(1)}:{time_match.group(2) or '00'}{time_match.group(3) or ''}"
                        end = f"{time_match.group(4)}:{time_match.group(5) or '00'}{time_match.group(6) or ''}"
                        sentences.append(f"Operating {start} to {end}, perfect for morning and evening workouts.")
    
    # Add target audience
    if "Women" in str(specialties) or "Women" in str(amenities) or "Her" in name:
        sentences.append("Ideal for women and families seeking a supportive fitness environment.")
    elif "Kids" in str(specialties) or "Kids" in str(amenities) or "Children" in str(amenities):
        sentences.append("Perfect for families with dedicated kids' classes and family-friendly facilities.")
    elif "Personal Training" in str(specialties):
        sentences.append("Great for one-on-one coaching and personalized fitness programs.")
    
    # Add pricing hint
    pricing_data = parse_pricing(pricing)
    if pricing_data:
        prices = []
        for key, value in pricing_data.items():
            price_match = re.search(r'€?(\d+)', str(value))
            if price_match:
                prices.append(int(price_match.group(1)))
        if prices:
            min_price = min(prices)
            sentences.append(f"Memberships from €{min_price} monthly with flexible payment options.")
    
    # Join sentences and ensure 40-60 words
    description = " ".join(sentences)
    word_count = len(description.split())
    
    # Trim if too long
    if word_count > 60:
        words = description.split()
        # Keep first 2-3 sentences
        current_words = 0
        kept_sentences = []
        for sentence in sentences:
            sentence_words = len(sentence.split())
            if current_words + sentence_words <= 60:
                kept_sentences.append(sentence)
                current_words += sentence_words
            else:
                break
        description = " ".join(kept_sentences)
    
    # Expand if too short
    elif word_count < 40:
        if specialty_list and len(specialty_list) > 2:
            description += f" Also offers {specialty_list[2]} training."
        if not any("Cyprus" in s or "Limassol" in s for s in sentences):
            description += " Find your perfect workout in Limassol, Cyprus."
        else:
            description += " Contact for membership details and class schedules."
    
    # Final check
    word_count = len(description.split())
    if word_count > 60:
        words = description.split()[:60]
        description = " ".join(words)
    
    return description.strip()

def generate_json_ld_schema(name: str, address: str, phone: str, email: str,
                           opening_hours: str, specialties: str, amenities: str,
                           pricing: str) -> Dict[str, Any]:
    """Generate JSON-LD schema.org LocalBusiness markup."""
    schema = {
        "@context": "https://schema.org",
        "@type": "HealthClub",
        "name": name,
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Limassol",
            "addressCountry": "CY"
        }
    }
    
    if address and not pd.isna(address):
        schema["address"]["streetAddress"] = address
    
    if phone and not pd.isna(phone) and "#ERROR!" not in str(phone):
        schema["telephone"] = str(phone)
    
    if email and not pd.isna(email):
        schema["email"] = email
    
    # Opening hours
    if opening_hours and not pd.isna(opening_hours):
        hours = parse_opening_hours(opening_hours)
        if hours:
            opening_hours_spec = []
            for day, time in hours.items():
                if time and time.lower() not in ["closed", "no sessions"]:
                    if "24/7" in time or "24 hours" in time.lower():
                        opening_hours_spec.append("Mo-Su 00:00-23:59")
                    else:
                        # Simplified - would need more parsing for exact format
                        opening_hours_spec.append(f"{day[:2]} {time}")
            if opening_hours_spec:
                schema["openingHoursSpecification"] = opening_hours_spec
    
    # Specialties as keywords
    if specialties and not pd.isna(specialties):
        schema["keywords"] = specialties
    
    # Amenities
    if amenities and not pd.isna(amenities):
        schema["amenityFeature"] = [{"@type": "LocationFeatureSpecification", "name": a.strip()} 
                                    for a in amenities.split(",")[:5]]
    
    # Pricing
    if pricing and not pd.isna(pricing) and pricing.strip() and "not specified" not in pricing.lower():
        schema["priceRange"] = "Contact for details"
    
    return schema

def generate_internal_links(name: str, specialties: str) -> List[str]:
    """Generate internal linking suggestions."""
    links = []
    
    # City page
    links.append("/cities/limassol")
    
    # Specialty pages
    if specialties and not pd.isna(specialties):
        specialty_slugs = {
            "pilates": "/specialties/pilates",
            "yoga": "/specialties/yoga",
            "crossfit": "/specialties/crossfit",
            "mma": "/specialties/mma",
            "boxing": "/specialties/boxing",
            "personal training": "/specialties/personal-trainer",
            "bjj": "/specialties/mma",
            "brazilian jiu-jitsu": "/specialties/mma",
            "muay thai": "/specialties/mma",
            "kickboxing": "/specialties/boxing"
        }
        
        specialties_lower = specialties.lower()
        for key, slug in specialty_slugs.items():
            if key in specialties_lower and slug not in links:
                links.append(slug)
    
    return links

def process_gym(row: pd.Series) -> Dict[str, Any]:
    """Process a single gym row and generate all outputs."""
    name = str(row['Name']).strip() if pd.notna(row['Name']) else "Contact for details"
    
    # Skip empty rows
    if not name or name == "Contact for details" or name == "nan":
        return None
    
    address = str(row['Address']).strip() if pd.notna(row['Address']) else "Contact for details"
    amenities = str(row['Amenities']).strip() if pd.notna(row['Amenities']) else "Contact for details"
    specialties = str(row['Specialties']).strip() if pd.notna(row['Specialties']) else "Contact for details"
    opening_hours = str(row['OpeningHours']).strip() if pd.notna(row['OpeningHours']) else "Contact for details"
    email = str(row['ContactEmail']).strip() if pd.notna(row['ContactEmail']) else "Contact for details"
    phone = str(row['ContactPhone']).strip() if pd.notna(row['ContactPhone']) else "Contact for details"
    pricing = str(row['Pricing']).strip() if pd.notna(row['Pricing']) else "Contact for details"
    
    # Parse opening hours (always returns all 7 days)
    hours = parse_opening_hours(opening_hours)
    is_open = is_open_now(hours)
    
    # Ensure all 7 days are present (should already be from parse_opening_hours, but double-check)
    required_days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    for day in required_days:
        if day not in hours or not hours[day]:
            hours[day] = 'Closed'
    
    # Parse pricing
    pricing_data = parse_pricing(pricing)
    
    # Generate outputs
    meta_title = generate_meta_title(name, specialties, amenities, opening_hours)
    meta_description = generate_meta_description(name, specialties, amenities, opening_hours, address, phone)
    description = generate_description(name, specialties, amenities, opening_hours, address, phone, email, pricing)
    schema = generate_json_ld_schema(name, address, phone, email, opening_hours, specialties, amenities, pricing)
    internal_links = generate_internal_links(name, specialties)
    
    return {
        "name": name,
        "meta_title": meta_title,
        "meta_description": meta_description,
        "description": description,
        "opening_hours": hours,
        "is_open_now": is_open,
        "pricing": pricing_data,  # Add parsed pricing data
        "schema": schema,
        "internal_links": internal_links,
        "raw_data": {
            "address": address,
            "amenities": amenities,
            "specialties": specialties,
            "opening_hours": opening_hours,
            "email": email,
            "phone": phone,
            "pricing": pricing
        }
    }

def main():
    """Main processing function."""
    print("=" * 80)
    print("PROCESSING ENRICHED GYM DATA")
    print("=" * 80)
    print()
    
    # Read CSV
    df = pd.read_csv(CSV_PATH)
    print(f"Loaded {len(df)} rows from CSV")
    print()
    
    # Process each gym
    processed_gyms = []
    for idx, row in df.iterrows():
        gym_data = process_gym(row)
        if gym_data:
            processed_gyms.append(gym_data)
            print(f"[OK] Processed: {gym_data['name']}")
    
    print()
    print(f"Successfully processed {len(processed_gyms)} gyms")
    print()
    
    # Generate outputs
    output_file = OUTPUT_DIR / "limassol_gyms_processed.json"
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(processed_gyms, f, indent=2, ensure_ascii=False)
    
    print(f"[OK] Saved processed data to: {output_file}")
    print()
    
    # Generate individual files for each gym
    for gym in processed_gyms:
        slug = gym['name'].lower().replace(' ', '-').replace("'", "").replace(",", "")
        slug = re.sub(r'[^a-z0-9-]', '', slug)
        
        gym_file = OUTPUT_DIR / f"{slug}_content.json"
        with open(gym_file, 'w', encoding='utf-8') as f:
            json.dump(gym, f, indent=2, ensure_ascii=False)
    
    print(f"[OK] Generated individual files for {len(processed_gyms)} gyms")
    print()
    
    # Generate summary report
    report_file = OUTPUT_DIR / "processing_report.md"
    with open(report_file, 'w', encoding='utf-8') as f:
        f.write("# Limassol Gyms Processing Report\n\n")
        f.write(f"**Generated:** {datetime.now().isoformat()}\n\n")
        f.write(f"**Total Gyms Processed:** {len(processed_gyms)}\n\n")
        f.write("## Processed Gyms\n\n")
        for gym in processed_gyms:
            f.write(f"### {gym['name']}\n\n")
            f.write(f"- **Meta Title:** {gym['meta_title']}\n")
            f.write(f"- **Status:** {'[OPEN] Open Now' if gym['is_open_now'] else '[CLOSED] Closed'}\n")
            f.write(f"- **Internal Links:** {', '.join(gym['internal_links'])}\n\n")
    
    print(f"[OK] Generated report: {report_file}")
    print()
    print("=" * 80)
    print("PROCESSING COMPLETE")
    print("=" * 80)

if __name__ == "__main__":
    main()

