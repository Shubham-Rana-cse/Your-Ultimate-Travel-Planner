import React from 'react';
import { Route, ArrowRight, Check } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { motion } from 'framer-motion';

const RouteDetails: React.FC = () => {
  const { optimizedRoute, locations } = useAppContext();
  
  if (!optimizedRoute) return null;
  
  const { distance, order } = optimizedRoute;
  
  // Format distance to be more readable
  const formatDistance = (meters: number) => {
    if (meters < 1000) {
      return `${meters.toFixed(0)} m`;
    }
    return `${(meters / 1000).toFixed(2)} km`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-6 bg-indigo-50 p-4 rounded-lg border border-indigo-100"
    >
      <div className="flex items-center gap-2 mb-3">
        <Route className="text-indigo-600 w-5 h-5" />
        <h3 className="font-semibold text-indigo-900">Optimized Route</h3>
      </div>
      
      <div className="bg-white p-3 rounded-md mb-3">
        <p className="text-sm text-gray-600 mb-1">Total Distance</p>
        <p className="text-xl font-bold text-indigo-700">{formatDistance(distance)}</p>
      </div>
      
      <div className="bg-white p-3 rounded-md">
        <p className="text-sm text-gray-600 mb-2">Route Order</p>
        <div className="space-y-2">
          {order.map((locationIndex, index) => (
            <div key={index} className="flex items-center text-sm">
              <span className="flex items-center justify-center bg-indigo-100 w-6 h-6 rounded-full text-indigo-700 font-medium mr-2">
                {index + 1}
              </span>
              <span className="text-gray-800 truncate">{locations[locationIndex].name}</span>
              {index < order.length - 1 && (
                <ArrowRight className="w-4 h-4 text-gray-400 mx-2" />
              )}
              {index === order.length - 1 && (
                <Check className="w-4 h-4 text-green-500 ml-2" />
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default RouteDetails;