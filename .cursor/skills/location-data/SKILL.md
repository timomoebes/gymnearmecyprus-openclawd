---
name: location-data
description: Collect location data, get coordinates for local places, and work with geospatial information. Use when the user needs location coordinates, wants to find places by name, needs to collect location data, or works with maps and geocoding.
---

# Location Data

This skill guides collecting location data and obtaining coordinates for local places using various APIs and tools.

## When to Use This Skill

Use this skill when:

- The user needs **coordinates** (latitude/longitude) for a place or address.
- The user wants to **find local places** by name or category.
- The user needs to **collect location data** (GPS, IP-based, address-based).
- The user works with **maps, geocoding, or reverse geocoding**.
- The user asks about **location services** or **places APIs**.

## Common Use Cases

### 1. Getting Coordinates for Places

**User**: "Get coordinates for Berlin, Germany"

**Approach**:
- Use geocoding API (Google Maps, OpenStreetMap Nominatim, etc.).
- Return latitude and longitude.
- Include accuracy information if available.

### 2. Finding Local Places

**User**: "Find coffee shops near coordinates 52.5200, 13.4050"

**Approach**:
- Use Places API (Google Places, Foursquare, etc.).
- Search by category and location.
- Return list with names, addresses, and coordinates.

### 3. Address to Coordinates (Geocoding)

**User**: "Convert this address to coordinates: 1600 Amphitheatre Parkway, Mountain View, CA"

**Approach**:
- Use geocoding service.
- Return coordinates and verify address match.

### 4. Coordinates to Address (Reverse Geocoding)

**User**: "What address is at coordinates 37.4220, -122.0841?"

**Approach**:
- Use reverse geocoding API.
- Return formatted address.

## Available Tools and APIs

### 1. Web Search for Location Data

Use `WebSearch` to find:
- Current API documentation for location services.
- Best practices for specific use cases.
- Comparison of different location APIs.

**Example**:
- Search: `"Google Places API get coordinates 2026"`
- Explanation: `"Find current Google Places API methods for retrieving place coordinates."`

### 2. Web Fetch for API Documentation

Use `WebFetch` to read:
- Official API documentation (Google Maps, OpenStreetMap, etc.).
- API key setup guides.
- Rate limits and pricing information.

### 3. Direct API Usage

When implementing location features, consider these APIs:

#### Google Maps Platform

**Geocoding API**:
- Convert addresses to coordinates.
- Convert coordinates to addresses.
- Requires API key.

**Places API**:
- Find places by name, category, or nearby search.
- Get place details including coordinates.
- Requires API key.

**Example usage**:
```javascript
// Geocoding example
const response = await fetch(
  `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${API_KEY}`
);
const data = await response.json();
const { lat, lng } = data.results[0].geometry.location;
```

#### OpenStreetMap Nominatim (Free, No API Key)

**Geocoding**:
- Free alternative to Google Maps.
- Rate limits apply (1 request/second).
- Good for non-commercial use.

**Example usage**:
```javascript
const response = await fetch(
  `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`
);
const data = await response.json();
const { lat, lon } = data[0];
```

#### IP-Based Location

**Services**:
- `ipapi.co`
- `ip-api.com`
- `ipgeolocation.io`

**Use cases**:
- Approximate user location from IP.
- Less accurate than GPS but works without user permission.

## Implementation Patterns

### Pattern 1: Geocoding an Address

**Steps**:
1. Validate the address input.
2. Choose appropriate API (Google Maps for accuracy, Nominatim for free).
3. Make API request with address.
4. Extract coordinates from response.
5. Handle errors (invalid address, API limits, etc.).

**Example**:
```javascript
async function getCoordinates(address) {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1`
    );
    const data = await response.json();
    
    if (data.length === 0) {
      throw new Error('Address not found');
    }
    
    return {
      latitude: parseFloat(data[0].lat),
      longitude: parseFloat(data[0].lon),
      displayName: data[0].display_name
    };
  } catch (error) {
    console.error('Geocoding error:', error);
    throw error;
  }
}
```

### Pattern 2: Finding Nearby Places

**Steps**:
1. Get user location (coordinates or address).
2. Choose Places API (Google Places, Foursquare, etc.).
3. Search by category and radius.
4. Return list with details.

**Example**:
```javascript
async function findNearbyPlaces(lat, lng, category, radius = 1000) {
  // Using Google Places API Nearby Search
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=${category}&key=${API_KEY}`
  );
  const data = await response.json();
  
  return data.results.map(place => ({
    name: place.name,
    address: place.vicinity,
    coordinates: {
      lat: place.geometry.location.lat,
      lng: place.geometry.location.lng
    },
    rating: place.rating
  }));
}
```

### Pattern 3: Collecting Location Data

**Browser Geolocation API**:
```javascript
function getUserLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation not supported'));
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy
        });
      },
      (error) => {
        reject(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  });
}
```

## Best Practices

### 1. API Key Management

- **Never commit API keys** to version control.
- Use environment variables or secure configuration.
- Rotate keys if exposed.
- Monitor API usage and costs.

### 2. Error Handling

Always handle:
- **Invalid addresses** or places not found.
- **API rate limits** (implement retry logic with backoff).
- **Network errors** (timeout, connection issues).
- **Permission denied** (for browser geolocation).

### 3. Caching

- Cache geocoding results (addresses don't change frequently).
- Respect API rate limits.
- Use local storage for recent searches.

### 4. Privacy Considerations

- Request user permission before accessing location.
- Explain why location data is needed.
- Allow users to manually enter location.
- Comply with GDPR and privacy regulations.

### 5. Coordinate Format

Standardize coordinate format:
- **Decimal degrees**: `52.5200, 13.4050` (most common).
- **Degrees, minutes, seconds**: For display purposes.
- Always specify order: **latitude, longitude** (lat, lng).

## Examples

### Example 1: Get Coordinates for a City

**User**: "Get coordinates for Paris, France"

**Agent**:
- Uses `WebSearch` to verify current geocoding API best practices.
- Implements geocoding using Nominatim (free) or Google Maps API.
- Returns: `{ latitude: 48.8566, longitude: 2.3522 }`
- Includes display name: "Paris, France"

### Example 2: Find Coffee Shops Nearby

**User**: "Find coffee shops near 52.5200, 13.4050"

**Agent**:
- Uses Google Places API or similar.
- Searches for "cafe" or "coffee" within radius.
- Returns list with:
  - Name
  - Address
  - Coordinates
  - Rating (if available)
  - Distance from provided coordinates

### Example 3: Collect User Location

**User**: "How do I get the user's current location in a web app?"

**Agent**:
- Explains browser Geolocation API.
- Provides code example with error handling.
- Mentions privacy considerations and permission requests.
- Suggests fallback to manual address input.

## Summary

Use this skill to:
- **Get coordinates** for addresses or places.
- **Find local places** by name or category.
- **Collect location data** from users or IP addresses.
- **Work with geocoding and reverse geocoding**.

Choose the appropriate API based on:
- **Accuracy requirements** (Google Maps for high accuracy).
- **Cost constraints** (OpenStreetMap Nominatim for free).
- **Rate limits** and usage patterns.
- **Privacy and compliance** requirements.

Always handle errors gracefully, respect API limits, and prioritize user privacy when collecting location data.
