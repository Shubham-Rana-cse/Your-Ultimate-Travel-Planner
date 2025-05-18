import React from 'react';
import { MapPin, Trash } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';

const LocationList: React.FC = () => {
  const { 
    locations, 
    removeLocation, 
    selectedLocationIndex, 
    selectLocation,
    optimizedRoute
  } = useAppContext();

  if (locations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-gray-500 bg-gray-50 rounded-lg">
        <MapPin className="w-10 h-10 text-gray-300 mb-2" />
        <p className="text-center">
          Search and select locations or click on the map to add them to your route
        </p>
      </div>
    );
  }

  // Get the ordered locations if we have an optimized route
  const orderedLocations = optimizedRoute 
    ? optimizedRoute.order.map(index => locations[index]) 
    : locations;

  return (
    <div className="flex-1 overflow-y-auto min-h-[200px] mb-4 pr-2 -mr-2">
      <AnimatePresence>
        {orderedLocations.map((location, index) => {
          const originalIndex = optimizedRoute 
            ? locations.findIndex(loc => loc.id === location.id)
            : index;
            
          return (
            <motion.div
              key={location.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.2 }}
              className={`mb-2 p-3 rounded-lg border flex items-start gap-2 cursor-pointer group ${
                originalIndex === selectedLocationIndex
                  ? 'border-indigo-500 bg-indigo-50'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
              onClick={() => selectLocation(originalIndex)}
            >
              <div className="flex items-center justify-center bg-indigo-100 rounded-full w-8 h-8 text-indigo-700 font-medium flex-shrink-0">
                {optimizedRoute ? index + 1 : <MapPin className="w-4 h-4" />}
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-800 truncate">{location.name}</p>
                <p className="text-xs text-gray-500">
                  {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
                </p>
              </div>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeLocation(location.id);
                }}
                className="opacity-0 group-hover:opacity-100 focus:opacity-100 text-gray-400 hover:text-red-500 transition-opacity"
              >
                <Trash className="w-4 h-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default LocationList;