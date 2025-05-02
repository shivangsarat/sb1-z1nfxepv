import React, { createContext, useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { MOCK_SAVED_LOCATIONS } from '@/constants/MockData';

type LocationType = {
  latitude: number;
  longitude: number;
  name?: string;
  address?: string;
  type?: 'home' | 'work' | 'favorite';
};

type LocationContextValue = {
  currentLocation: LocationType | null;
  savedLocations: LocationType[];
  searchLocation: LocationType | null;
  setSearchLocation: (location: LocationType | null) => void;
  addSavedLocation: (location: LocationType) => void;
  removeSavedLocation: (location: LocationType) => void;
  requestLocationPermission: () => Promise<boolean>;
};

const LocationContext = createContext<LocationContextValue | null>(null);

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLocation, setCurrentLocation] = useState<LocationType | null>(null);
  const [savedLocations, setSavedLocations] = useState<LocationType[]>(MOCK_SAVED_LOCATIONS);
  const [searchLocation, setSearchLocation] = useState<LocationType | null>(null);
  const [hasLocationPermission, setHasLocationPermission] = useState<boolean>(false);

  const requestLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    const isGranted = status === 'granted';
    setHasLocationPermission(isGranted);
    return isGranted;
  };

  useEffect(() => {
    (async () => {
      const hasPermission = await requestLocationPermission();
      
      if (hasPermission) {
        const location = await Location.getCurrentPositionAsync({});
        setCurrentLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      } else {
        // Use New York City as fallback for demo
        setCurrentLocation({
          latitude: 40.7128,
          longitude: -74.0060,
        });
      }
    })();
  }, []);

  const addSavedLocation = (location: LocationType) => {
    setSavedLocations([...savedLocations, location]);
  };

  const removeSavedLocation = (location: LocationType) => {
    setSavedLocations(savedLocations.filter(loc => 
      loc.latitude !== location.latitude || loc.longitude !== location.longitude
    ));
  };

  return (
    <LocationContext.Provider
      value={{
        currentLocation,
        savedLocations,
        searchLocation,
        setSearchLocation,
        addSavedLocation,
        removeSavedLocation,
        requestLocationPermission,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export default LocationContext;