import React from 'react';
import { Menu, X, MapPin, Route } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './Sidebar';

const MobileControls: React.FC = () => {
  const { 
    locations, 
    isSidebarOpen, 
    toggleSidebar, 
    optimizedRoute 
  } = useAppContext();

  return (
    <>
      {/* Fixed bottom controls */}
      <div className="fixed bottom-5 left-0 right-0 flex justify-center z-10">
        <div className="bg-white shadow-lg rounded-full px-4 py-2 flex items-center space-x-4 border border-gray-200">
          <button
            onClick={toggleSidebar}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-600 text-white shadow-md"
          >
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          
          <div className="flex items-center">
            <div className="flex items-center justify-center bg-indigo-100 rounded-full w-8 h-8 text-indigo-700">
              <MapPin className="w-4 h-4" />
            </div>
            <span className="ml-2 text-gray-700 font-medium">
              {locations.length} {locations.length === 1 ? 'location' : 'locations'}
            </span>
          </div>
          
          {optimizedRoute && (
            <div className="flex items-center">
              <div className="flex items-center justify-center bg-green-100 rounded-full w-8 h-8 text-green-700">
                <Route className="w-4 h-4" />
              </div>
              <span className="ml-2 text-gray-700 font-medium">
                {(optimizedRoute.distance / 1000).toFixed(2)} km
              </span>
            </div>
          )}
        </div>
      </div>
      
      {/* Mobile sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-20"
              onClick={toggleSidebar}
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 20 }}
              className="fixed bottom-0 left-0 right-0 h-[85vh] z-30 rounded-t-xl overflow-hidden shadow-xl"
            >
              <Sidebar />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileControls;