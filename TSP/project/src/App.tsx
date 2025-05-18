import React from 'react';
import { AppProvider } from './context/AppContext';
import MapContainer from './components/MapContainer';
import Sidebar from './components/Sidebar';
import MobileControls from './components/MobileControls';

function App() {
  return (
    <AppProvider>
      <div className="h-screen w-screen flex flex-col md:flex-row overflow-hidden bg-gray-50">
        {/* Desktop sidebar */}
        <div className="hidden md:block md:w-96 h-full overflow-auto">
          <Sidebar />
        </div>
        
        {/* Map container */}
        <div className="flex-1 relative">
          <MapContainer />
        </div>
        
        {/* Mobile controls */}
        <div className="md:hidden">
          <MobileControls />
        </div>
      </div>
    </AppProvider>
  );
}

export default App;