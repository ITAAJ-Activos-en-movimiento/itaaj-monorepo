"use client"
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface MapContextType {
  isMapOpen: boolean;
  openMap: () => void;
  closeMap: () => void;
  toggleMap: () => void;
}

const MapContext = createContext<MapContextType | undefined>(undefined);

export const MapProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isMapOpen, setIsMapOpen] = useState(true);

  const openMap = () => setIsMapOpen(true);
  const closeMap = () => setIsMapOpen(false);
  const toggleMap = () => setIsMapOpen(prev => !prev);

  return (
    <MapContext.Provider value={{ isMapOpen, openMap, closeMap, toggleMap }}>
      {children}
    </MapContext.Provider>
  );
};

export const useMap = () => {
  const context = useContext(MapContext);
  if (context === undefined) {
    throw new Error('useMap must be used within a MapProvider');
  }
  return context;
};