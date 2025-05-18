import React, { useState, useEffect, useRef } from 'react';
import { Search, Loader2, MapPin } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { searchLocations } from '../services/mapService';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchResult {
  name: string;
  lat: number;
  lng: number;
}

const SearchBar: React.FC = () => {
  const { searchQuery, setSearchQuery, addLocation } = useAppContext();
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  
  // Close results when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Search for locations when query changes
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchQuery.trim().length > 2) {
        setIsLoading(true);
        try {
          const searchResults = await searchLocations(searchQuery + ' Delhi');
          setResults(searchResults);
          setShowResults(true);
        } catch (error) {
          console.error('Error searching locations:', error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setResults([]);
        setShowResults(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const handleSelectLocation = (result: SearchResult) => {
    addLocation({
      name: result.name,
      lat: result.lat,
      lng: result.lng,
    });
    setSearchQuery('');
    setShowResults(false);
  };

  return (
    <div className="relative" ref={searchRef}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search for a location in Delhi..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => searchQuery.trim().length > 2 && setShowResults(true)}
          className="w-full py-2 pl-10 pr-12 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
        />
        {isLoading && (
          <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 animate-spin" />
        )}
      </div>

      <AnimatePresence>
        {showResults && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg max-h-60 overflow-y-auto border border-gray-200"
          >
            <ul>
              {results.map((result, index) => (
                <li 
                  key={index}
                  onClick={() => handleSelectLocation(result)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-0"
                >
                  <div className="flex items-start">
                    <MapPin className="w-4 h-4 text-indigo-500 mt-1 mr-2 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-800">{result.name}</p>
                      <p className="text-xs text-gray-500">
                        {result.lat.toFixed(4)}, {result.lng.toFixed(4)}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;