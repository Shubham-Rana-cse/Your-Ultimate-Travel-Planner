import React from 'react';
import { MapPin, RotateCw, List, Route, Trash2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import SearchBar from './SearchBar';
import LocationList from './LocationList';
import RouteDetails from './RouteDetails';
import { motion } from 'framer-motion';

const Sidebar: React.FC = () => {
  const { 
    locations, 
    optimizedRoute, 
    isCalculating, 
    clearLocations, 
    calculateRoute 
  } = useAppContext();

  return (
    <div className="h-full bg-white shadow-md p-4 flex flex-col">
      <header className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <MapPin className="w-6 h-6 text-indigo-600" />
          <h1 className="text-2xl font-bold text-gray-800">Travel Route Optimizer</h1>
        </div>
        <p className="text-sm text-gray-600">
          Find the optimal route between multiple locations.
        </p>
      </header>

      <SearchBar />

      <div className="flex justify-between items-center mt-6 mb-3">
        <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
          <List className="w-5 h-5" /> Selected Locations
        </h2>
        <span className="text-sm bg-indigo-100 text-indigo-800 py-1 px-2 rounded-full">
          {locations.length} {locations.length === 1 ? 'location' : 'locations'}
        </span>
      </div>

      <LocationList />

      <div className="mt-auto pt-4 space-y-3">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={calculateRoute}
          disabled={locations.length < 2 || isCalculating}
          className={`w-full py-3 px-4 rounded-lg flex items-center justify-center gap-2 font-medium ${
            locations.length < 2 || isCalculating
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm'
          }`}
        >
          {isCalculating ? (
            <>
              <RotateCw className="w-5 h-5 animate-spin" />
              Calculating...
            </>
          ) : (
            <>
              <Route className="w-5 h-5" />
              Find Optimal Route
            </>
          )}
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={clearLocations}
          disabled={locations.length === 0}
          className={`w-full py-2 px-4 rounded-lg flex items-center justify-center gap-2 ${
            locations.length === 0
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-red-600 hover:bg-red-50'
          }`}
        >
          <Trash2 className="w-4 h-4" />
          Clear All Locations
        </motion.button>
      </div>
      
      {optimizedRoute && <RouteDetails />}
    </div>
  );
};

export default Sidebar;