import React, { useEffect, useCallback } from 'react';
import { MapContainer as LeafletMap, TileLayer, Marker, Popup, Polyline, useMap, useMapEvents } from 'react-leaflet';
import { Icon } from 'leaflet';
import { useAppContext } from '../context/AppContext';

// Map click handler component
const MapClickHandler: React.FC = () => {
  const { addLocation } = useAppContext();
  const map = useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
        );
        const data = await response.json();
        addLocation({
          name: data.display_name.split(',').slice(0, 2).join(','),
          lat,
          lng,
        });
      } catch (error) {
        console.error('Error reverse geocoding:', error);
        addLocation({
          name: `Location at ${lat.toFixed(4)}, ${lng.toFixed(4)}`,
          lat,
          lng,
        });
      }
    },
  });
  return null;
};

// Recenter map when locations change
const MapController: React.FC = () => {
  const { locations } = useAppContext();
  const map = useMap();
  
  useEffect(() => {
    if (locations.length > 0) {
      if (locations.length === 1) {
        map.setView([locations[0].lat, locations[0].lng], 13);
      } else {
        const bounds = locations.map(loc => [loc.lat, loc.lng]);
        map.fitBounds(bounds as any);
      }
    } else {
      map.setView([28.6139, 77.2090], 12);
    }
  }, [locations, map]);
  
  return null;
};

const MapContainer: React.FC = () => {
  const { 
    locations, 
    optimizedRoute, 
    selectedLocationIndex, 
    selectLocation 
  } = useAppContext();

  const markerIcon = new Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  const selectedMarkerIcon = new Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  // Split the path into main route and return path
  const getRoutePaths = useCallback(() => {
    if (!optimizedRoute || !optimizedRoute.path.length) return { mainPath: [], returnPath: [] };
    
    const path = optimizedRoute.path;
    const lastSegmentStart = path.length - 2;
    return {
      mainPath: path.slice(0, lastSegmentStart + 1),
      returnPath: path.slice(lastSegmentStart),
    };
  }, [optimizedRoute]);

  const { mainPath, returnPath } = getRoutePaths();

  return (
    <LeafletMap
      center={[28.6139, 77.2090]}
      zoom={12}
      className="h-full w-full z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      <MapController />
      <MapClickHandler />
      
      {locations.map((location, index) => (
        <Marker
          key={location.id}
          position={[location.lat, location.lng]}
          icon={index === selectedLocationIndex ? selectedMarkerIcon : markerIcon}
          eventHandlers={{
            click: () => selectLocation(index),
          }}
        >
          <Popup>
            <div>
              <h3 className="font-medium">{location.name}</h3>
              <p className="text-xs text-gray-500">
                {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
      
      {mainPath.length > 0 && (
        <Polyline positions={mainPath} pathOptions={{ color: '#1E40AF', weight: 4, opacity: 0.7 }} />
      )}
      
      {returnPath.length > 0 && (
        <Polyline positions={returnPath} pathOptions={{ color: '#047857', weight: 4, opacity: 0.7 }} />
      )}
    </LeafletMap>
  );
};

export default MapContainer;