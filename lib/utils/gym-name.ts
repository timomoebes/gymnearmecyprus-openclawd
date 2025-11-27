/**
 * Checks if a gym name already contains the city name to avoid duplication.
 * 
 * @param gymName - The name of the gym
 * @param cityName - The name of the city (optional)
 * @returns true if city name should be appended, false if it's already in the gym name
 * 
 * @example
 * ```typescript
 * shouldAppendCityName('Asf&Performance Limassol Cyprus', 'Limassol') // false
 * shouldAppendCityName('Aurora Pilates Studio', 'Nicosia') // true
 * ```
 */
export function shouldAppendCityName(gymName: string, cityName: string | undefined): boolean {
  if (!cityName) return false;
  // Check if gym name already contains the city name (case-insensitive)
  const gymNameLower = gymName.toLowerCase().trim();
  const cityNameLower = cityName.toLowerCase().trim();
  return !gymNameLower.includes(cityNameLower);
}

/**
 * Formats a gym name with city name, avoiding duplication.
 * 
 * @param gymName - The name of the gym
 * @param cityName - The name of the city (optional)
 * @returns The formatted gym name with city if needed
 * 
 * @example
 * ```typescript
 * formatGymNameWithCity('Asf&Performance Limassol Cyprus', 'Limassol') // 'Asf&Performance Limassol Cyprus'
 * formatGymNameWithCity('Aurora Pilates Studio', 'Nicosia') // 'Aurora Pilates Studio Nicosia'
 * ```
 */
export function formatGymNameWithCity(gymName: string, cityName: string | undefined): string {
  return shouldAppendCityName(gymName, cityName) 
    ? `${gymName} ${cityName || ''}`.trim()
    : gymName;
}

