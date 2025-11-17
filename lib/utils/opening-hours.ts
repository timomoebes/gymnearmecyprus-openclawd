/**
 * Utility functions for working with opening hours
 */

export interface OpeningHours {
  monday?: string;
  tuesday?: string;
  wednesday?: string;
  thursday?: string;
  friday?: string;
  saturday?: string;
  sunday?: string;
}

/**
 * Get current time in Cyprus (EET/EEST timezone)
 * Cyprus is UTC+2 (EET) or UTC+3 (EEST during daylight saving)
 * Uses Europe/Nicosia timezone
 */
function getCyprusTime(): { day: number; hours: number; minutes: number; timeInMinutes: number } {
  const now = new Date();
  
  try {
    // Use Intl.DateTimeFormat for better timezone support
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Europe/Nicosia',
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      weekday: 'long',
    });
    
    const parts = formatter.formatToParts(now);
    
    let hours = 0;
    let minutes = 0;
    let dayName = '';
    
    for (const part of parts) {
      if (part.type === 'hour') {
        hours = parseInt(part.value, 10);
      } else if (part.type === 'minute') {
        minutes = parseInt(part.value, 10);
      } else if (part.type === 'weekday') {
        dayName = part.value;
      }
    }
    
    // Map day name to day index (0 = Sunday, 1 = Monday, etc.)
    const dayMap: Record<string, number> = {
      'Sunday': 0,
      'Monday': 1,
      'Tuesday': 2,
      'Wednesday': 3,
      'Thursday': 4,
      'Friday': 5,
      'Saturday': 6,
    };
    
    const day = dayMap[dayName] ?? now.getDay();
    
    return {
      day,
      hours,
      minutes,
      timeInMinutes: hours * 60 + minutes,
    };
  } catch (error) {
    // Fallback: Calculate Cyprus time from UTC
    // Cyprus is UTC+2 (EET) or UTC+3 (EEST)
    // For simplicity, use UTC+2 as fallback (doesn't account for DST)
    const utcHours = now.getUTCHours();
    const utcMinutes = now.getUTCMinutes();
    const utcDay = now.getUTCDay();
    
    // Add 2 hours for EET (UTC+2)
    let cyprusHours = utcHours + 2;
    if (cyprusHours >= 24) {
      cyprusHours -= 24;
    }
    
    return {
      day: utcDay,
      hours: cyprusHours,
      minutes: utcMinutes,
      timeInMinutes: cyprusHours * 60 + utcMinutes,
    };
  }
}

/**
 * Parse time string to minutes since midnight (0-1439)
 * Handles formats like: "8:00", "08:00", "8:00 AM", "14:00", "2:00 PM", "14:00 pm" (invalid but common)
 */
function parseTimeToMinutes(timeStr: string): number | null {
  // Remove extra spaces and normalize
  timeStr = timeStr.trim();
  
  // Match: hour:minute (AM/PM)
  const match = timeStr.match(/(\d{1,2}):?(\d{2})?\s*(am|pm)?/i);
  if (!match) return null;
  
  let hour = parseInt(match[1], 10);
  const minute = parseInt(match[2] || '0', 10);
  const ampm = match[3]?.toLowerCase();
  
  // Validate hour and minute
  if (isNaN(hour) || isNaN(minute) || hour < 0 || hour > 23 || minute < 0 || minute > 59) {
    return null;
  }
  
  // Handle invalid cases like "14:00 pm" or "14:00 am"
  // If hour >= 12, it's already in 24-hour format, so ignore AM/PM
  if (hour >= 12) {
    // Already in 24-hour format (e.g., "14:00 pm" should be treated as 14:00)
    // Ignore the AM/PM suffix
    return hour * 60 + minute;
  }
  
  // For hours < 12, check if AM/PM is specified
  if (ampm) {
    // Convert 12-hour to 24-hour format
    if (ampm === 'pm' && hour !== 12) {
      hour += 12;
    } else if (ampm === 'am' && hour === 12) {
      hour = 0;
    }
  }
  // If no AM/PM and hour < 12, assume it's already in 24-hour format
  // (e.g., "8:00" means 8:00, not 20:00)
  
  return hour * 60 + minute;
}

/**
 * Check if a gym is currently open based on opening hours
 * Uses Cyprus local time (Europe/Nicosia timezone)
 */
export function isGymOpenNow(openingHours: OpeningHours): boolean {
  if (!openingHours) return false;

  // Get current time in Cyprus timezone
  const cyprusTime = getCyprusTime();
  const currentDay = cyprusTime.day; // 0 = Sunday, 1 = Monday, etc.
  const currentTimeMinutes = cyprusTime.timeInMinutes;

  // Map day index to day name
  const dayNames: (keyof OpeningHours)[] = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const currentDayName = dayNames[currentDay];

  const hours = openingHours[currentDayName];
  if (!hours) return false;

  // Check for 24/7
  if (hours.toLowerCase().includes('24/7') || hours.toLowerCase().includes('24 hours')) {
    return true;
  }

  // Check for "Closed", "No sessions", or "Contact for opening hour details"
  if (hours.toLowerCase().includes('closed') || 
      hours.toLowerCase().includes('no sessions') ||
      hours.toLowerCase().includes('contact for opening hour details')) {
    return false;
  }

  // Try to parse time ranges
  // Format examples: "8:00-21:00", "8:00AM-9:00PM", "06:30 - 22:00", "08:00 am - 14:00 pm", "07:00 – 21:00" (em dash)
  // Match time ranges with optional AM/PM, handle both hyphen (-) and em dash (—)
  // Replace em dash with hyphen for consistent parsing
  const normalizedHours = hours.replace(/[–—]/g, '-');
  const timeRangePattern = /(\d{1,2}):?(\d{2})?\s*(am|pm)?\s*-\s*(\d{1,2}):?(\d{2})?\s*(am|pm)?/gi;
  const timeRanges = normalizedHours.match(timeRangePattern);
  
  if (!timeRanges || timeRanges.length === 0) {
    // If we can't parse, assume closed to be safe
    return false;
  }

  for (const range of timeRanges) {
    const match = range.match(/(\d{1,2}):?(\d{2})?\s*(am|pm)?\s*-\s*(\d{1,2}):?(\d{2})?\s*(am|pm)?/i);
    if (!match) continue;

    const startTimeStr = `${match[1]}:${match[2] || '00'} ${match[3] || ''}`.trim();
    const endTimeStr = `${match[4]}:${match[5] || '00'} ${match[6] || ''}`.trim();
    
    const startMinutes = parseTimeToMinutes(startTimeStr);
    const endMinutes = parseTimeToMinutes(endTimeStr);
    
    if (startMinutes === null || endMinutes === null) continue;

    // Handle overnight hours (e.g., 22:00 - 02:00)
    if (endMinutes < startMinutes) {
      // Overnight: check if current time is after start OR before end
      if (currentTimeMinutes >= startMinutes || currentTimeMinutes < endMinutes) {
        return true;
      }
    } else {
      // Normal hours: check if current time is within range
      // Note: end time is exclusive (e.g., 14:00 means closed at 14:00)
      if (currentTimeMinutes >= startMinutes && currentTimeMinutes < endMinutes) {
        return true;
      }
    }
  }

  return false;
}

