import axios from 'axios';

interface SearchResult {
  name: string;
  lat: number;
  lng: number;
}

// Search for locations using OpenStreetMap Nominatim API
export async function searchLocations(query: string): Promise<SearchResult[]> {
  try {
    const response = await axios.get('https://nominatim.openstreetmap.org/search', {
      params: {
        q: query,
        format: 'json',
        limit: 5,
        countrycodes: 'in', // India country code
        viewbox: '76.8,28.4,77.6,28.8', // Delhi approximate bounding box
        bounded: 1,
      },
      headers: {
        'User-Agent': 'Travel Route Optimizer App',
      },
    });

    return response.data.map((item: any) => ({
      name: item.display_name.split(',').slice(0, 3).join(','), // Simplify display name
      lat: parseFloat(item.lat),
      lng: parseFloat(item.lon),
    }));
  } catch (error) {
    console.error('Error searching locations:', error);
    return [];
  }
}

// Calculate the road distance between two points using OSRM
export async function calculateRoadDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): Promise<number> {
  try {
    const response = await axios.get(
      `https://router.project-osrm.org/route/v1/driving/${lon1},${lat1};${lon2},${lat2}?overview=false`
    );

    if (response.data.routes && response.data.routes.length > 0) {
      return response.data.routes[0].distance; // Distance in meters
    }
    
    throw new Error('No route found');
  } catch (error) {
    console.error('Error calculating road distance:', error);
    // Fallback to straight-line distance if road routing fails
    return calculateStraightDistance(lat1, lon1, lat2, lon2);
  }
}

// Fallback straight-line distance calculation
function calculateStraightDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371e3; // Earth's radius in meters
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

// Get the road path between two points using OSRM
export async function getPathBetweenPoints(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): Promise<[number, number][]> {
  try {
    const response = await axios.get(
      `https://router.project-osrm.org/route/v1/driving/${lon1},${lat1};${lon2},${lat2}?overview=full&geometries=geojson`
    );

    if (response.data.routes && response.data.routes.length > 0) {
      // Convert GeoJSON coordinates to [lat, lng] pairs
      return response.data.routes[0].geometry.coordinates.map(
        (coord: [number, number]) => [coord[1], coord[0]]
      );
    }

    throw new Error('No route found');
  } catch (error) {
    console.error('Error getting road path:', error);
    // Fallback to straight line if road routing fails
    return [[lat1, lon1], [lat2, lon2]];
  }
}