import { Location, Route } from '../context/AppContext';
import { calculateRoadDistance, getPathBetweenPoints } from '../services/mapService';

// Calculate distance matrix between all locations using road distances
async function calculateDistanceMatrix(locations: Location[]): Promise<number[][]> {
  const n = locations.length;
  const distanceMatrix: number[][] = [];

  for (let i = 0; i < n; i++) {
    distanceMatrix[i] = [];
    for (let j = 0; j < n; j++) {
      if (i === j) {
        distanceMatrix[i][j] = 0;
      } else {
        distanceMatrix[i][j] = await calculateRoadDistance(
          locations[i].lat,
          locations[i].lng,
          locations[j].lat,
          locations[j].lng
        );
      }
    }
  }

  return distanceMatrix;
}

// Nearest neighbor algorithm - a simple heuristic for TSP
function nearestNeighborTSP(distanceMatrix: number[][]): { order: number[], distance: number } {
  const n = distanceMatrix.length;
  const visited = new Array(n).fill(false);
  const path: number[] = [];
  let totalDistance = 0;

  // Start from the first location
  let current = 0;
  path.push(current);
  visited[current] = true;

  // Find the nearest unvisited location n-1 times
  for (let i = 1; i < n; i++) {
    let nearest = -1;
    let minDistance = Infinity;

    for (let j = 0; j < n; j++) {
      if (!visited[j] && distanceMatrix[current][j] < minDistance) {
        nearest = j;
        minDistance = distanceMatrix[current][j];
      }
    }

    if (nearest !== -1) {
      path.push(nearest);
      visited[nearest] = true;
      totalDistance += minDistance;
      current = nearest;
    }
  }

  // Add the distance back to the starting point for a complete tour
  if (n > 1) {
    totalDistance += distanceMatrix[current][0];
  }

  return { order: path, distance: totalDistance };
}

// Calculate the full path coordinates for the route using road network
async function calculateRoutePath(
  locations: Location[],
  order: number[]
): Promise<[number, number][]> {
  const path: [number, number][] = [];

  for (let i = 0; i < order.length; i++) {
    const current = order[i];
    const next = i < order.length - 1 ? order[i + 1] : order[0];
    
    const segmentPath = await getPathBetweenPoints(
      locations[current].lat,
      locations[current].lng,
      locations[next].lat,
      locations[next].lng
    );
    
    // Add all points except the last one (to avoid duplicates)
    if (i < order.length - 1) {
      path.push(...segmentPath.slice(0, -1));
    } else {
      // For the last segment, add all points including the last one
      path.push(...segmentPath);
    }
  }

  return path;
}

// Main function to calculate the optimal route
export async function calculateOptimalRoute(locations: Location[]): Promise<Route> {
  // Calculate the distance matrix using road distances
  const distanceMatrix = await calculateDistanceMatrix(locations);
  
  // Use the nearest neighbor algorithm to find a solution
  const { order, distance } = nearestNeighborTSP(distanceMatrix);
  
  // Calculate the full path coordinates using road network
  const path = await calculateRoutePath(locations, order);
  
  return { order, distance, path };
}