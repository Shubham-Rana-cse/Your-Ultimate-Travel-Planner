import React, { createContext, useState, useContext, ReactNode } from 'react';
import { calculateOptimalRoute } from '../utils/tspSolver';

export interface Location {
  id: string;
  name: string;
  lat: number;
  lng: number;
}

export interface Route {
  order: number[];
  distance: number;
  path: [number, number][];
}

interface AppContextType {
  locations: Location[];
  selectedLocationIndex: number | null;
  optimizedRoute: Route | null;
  isCalculating: boolean;
  searchQuery: string;
  isSidebarOpen: boolean;
  setSearchQuery: (query: string) => void;
  addLocation: (location: Omit<Location, 'id'>) => void;
  removeLocation: (id: string) => void;
  clearLocations: () => void;
  calculateRoute: () => void;
  selectLocation: (index: number | null) => void;
  toggleSidebar: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [optimizedRoute, setOptimizedRoute] = useState<Route | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [selectedLocationIndex, setSelectedLocationIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const addLocation = (location: Omit<Location, 'id'>) => {
    const newLocation = {
      ...location,
      id: Date.now().toString(),
    };
    setLocations(prev => [...prev, newLocation]);
    setOptimizedRoute(null); // Reset route when locations change
  };

  const removeLocation = (id: string) => {
    setLocations(prev => prev.filter(loc => loc.id !== id));
    setOptimizedRoute(null); // Reset route when locations change
  };

  const clearLocations = () => {
    setLocations([]);
    setOptimizedRoute(null);
  };

  const calculateRoute = async () => {
    if (locations.length < 2) return;
    
    setIsCalculating(true);
    try {
      // This is where we call our TSP solver algorithm
      const route = await calculateOptimalRoute(locations);
      setOptimizedRoute(route);
    } catch (error) {
      console.error('Error calculating route:', error);
    } finally {
      setIsCalculating(false);
    }
  };

  const selectLocation = (index: number | null) => {
    setSelectedLocationIndex(index);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  return (
    <AppContext.Provider
      value={{
        locations,
        selectedLocationIndex,
        optimizedRoute,
        isCalculating,
        searchQuery,
        isSidebarOpen,
        setSearchQuery,
        addLocation,
        removeLocation,
        clearLocations,
        calculateRoute,
        selectLocation,
        toggleSidebar,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};