/**
 * Gym Transformation Helpers
 * Utility functions for transforming gym data from database to application format
 */

import { Gym } from '@/lib/types';

/**
 * Parse opening hours from database format to application format
 * Handles multiple formats: Monday-Sunday, Monday-Friday, Week Days, individual days
 */
export function parseOpeningHours(dbOpeningHours: any): Gym['openingHours'] {
  // Default: all days closed
  let openingHours: Gym['openingHours'] = {
    monday: 'Closed',
    tuesday: 'Closed',
    wednesday: 'Closed',
    thursday: 'Closed',
    friday: 'Closed',
    saturday: 'Closed',
    sunday: 'Closed',
  };

  if (!dbOpeningHours) return openingHours;

  try {
    const hours = typeof dbOpeningHours === 'string'
      ? JSON.parse(dbOpeningHours)
      : dbOpeningHours;

    // Debug logging (remove in production)
    if (process.env.NODE_ENV === 'development') {
      console.log('[parseOpeningHours] Parsing hours:', hours);
    }

    // Handle "Monday-Sunday" format (applies to all days)
    if (hours['Monday-Sunday']) {
      const allWeekHours = hours['Monday-Sunday'];
      openingHours = {
        monday: allWeekHours,
        tuesday: allWeekHours,
        wednesday: allWeekHours,
        thursday: allWeekHours,
        friday: allWeekHours,
        saturday: allWeekHours,
        sunday: allWeekHours,
      };
    }
    // Handle "Monday-Friday" format
    else if (hours['Monday-Friday']) {
      const weekDaysHours = hours['Monday-Friday'];
      openingHours.monday = weekDaysHours;
      openingHours.tuesday = weekDaysHours;
      openingHours.wednesday = weekDaysHours;
      openingHours.thursday = weekDaysHours;
      openingHours.friday = weekDaysHours;
      // Saturday and Sunday remain "Closed" unless specified
      const satValue = hours.saturday || hours.Saturday;
      const sunValue = hours.sunday || hours.Sunday;
      openingHours.saturday = satValue && satValue.toLowerCase() !== 'no sessions' ? satValue : 'Closed';
      openingHours.sunday = sunValue && sunValue.toLowerCase() !== 'no sessions' ? sunValue : 'Closed';
    }
    // Handle "Week Days" format
    else if (hours['Week Days']) {
      const weekDaysHours = hours['Week Days'];
      openingHours.monday = weekDaysHours;
      openingHours.tuesday = weekDaysHours;
      openingHours.wednesday = weekDaysHours;
      openingHours.thursday = weekDaysHours;
      openingHours.friday = weekDaysHours;
      // Saturday and Sunday remain "Closed" unless specified
      const satValue = hours.saturday || hours.Saturday;
      const sunValue = hours.sunday || hours.Sunday;
      openingHours.saturday = satValue && satValue.toLowerCase() !== 'no sessions' ? satValue : 'Closed';
      openingHours.sunday = sunValue && sunValue.toLowerCase() !== 'no sessions' ? sunValue : 'Closed';
    }
    // Handle individual days
    else {
      openingHours.monday = hours.monday || hours.Monday || 'Closed';
      openingHours.tuesday = hours.tuesday || hours.Tuesday || 'Closed';
      openingHours.wednesday = hours.wednesday || hours.Wednesday || 'Closed';
      openingHours.thursday = hours.thursday || hours.Thursday || 'Closed';
      openingHours.friday = hours.friday || hours.Friday || 'Closed';
      openingHours.saturday = hours.saturday || hours.Saturday || 'Closed';
      openingHours.sunday = hours.sunday || hours.Sunday || 'Closed';
    }

    // Normalize "No sessions" to "Closed" for all days
    openingHours = {
      monday: normalizeClosed(openingHours.monday),
      tuesday: normalizeClosed(openingHours.tuesday),
      wednesday: normalizeClosed(openingHours.wednesday),
      thursday: normalizeClosed(openingHours.thursday),
      friday: normalizeClosed(openingHours.friday),
      saturday: normalizeClosed(openingHours.saturday),
      sunday: normalizeClosed(openingHours.sunday),
    };
  } catch (e) {
    // Invalid JSON - keep defaults (all "Closed")
  }

  return openingHours;
}

/**
 * Normalize closed values to standard "Closed" string
 */
function normalizeClosed(value: string | undefined): string {
  if (!value) return 'Closed';
  const lower = value.toLowerCase();
  if (lower === 'no sessions' || lower === 'closed') return 'Closed';
  return value;
}

/**
 * Ensure URL has a protocol (http:// or https://)
 */
export function ensureProtocol(url: string | undefined | null): string | undefined {
  if (!url) return undefined;
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `https://${url}`;
}

/**
 * Parse coordinate value from database (handles strings, numbers, null, undefined)
 */
function parseCoordinate(coord: any): number | null {
  if (coord === null || coord === undefined || coord === '') return null;
  const parsed = typeof coord === 'string' ? parseFloat(coord) : coord;
  return isNaN(parsed) ? null : parsed;
}

/**
 * Parse coordinates from database format to [latitude, longitude] tuple
 * Returns null if coordinates are invalid
 */
export function parseCoordinates(latitude: any, longitude: any): [number, number] | null {
  const lat = parseCoordinate(latitude);
  const lng = parseCoordinate(longitude);

  // Only return coordinates if both are valid
  return (lat !== null && lng !== null) ? [lat, lng] : null;
}

/**
 * Parse JSON field from database (handles both string and object types)
 */
export function parseJSONField<T>(field: any): T | undefined {
  if (!field) return undefined;
  try {
    return typeof field === 'string' ? JSON.parse(field) : field;
  } catch (e) {
    return undefined;
  }
}
