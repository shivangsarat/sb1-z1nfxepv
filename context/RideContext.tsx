import React, { createContext, useState } from 'react';
import { RideType, RideStatus } from '@/types/ride';

type Ride = {
  id: string;
  pickupLocation: {
    latitude: number;
    longitude: number;
    name?: string;
    address?: string;
  };
  destination: {
    latitude: number;
    longitude: number;
    name?: string;
    address?: string;
  };
  rideType: RideType;
  status: RideStatus;
  price: number;
  driverId?: string;
  driverName?: string;
  driverRating?: number;
  driverPhoto?: string;
  requestedAt: Date;
  estimatedArrival?: Date;
  arrivalTime?: Date;
  completedAt?: Date;
};

type RideRequest = {
  pickupLocation: {
    latitude: number;
    longitude: number;
    name?: string;
    address?: string;
  };
  destination: {
    latitude: number;
    longitude: number;
    name?: string;
    address?: string;
  };
  rideType: RideType;
};

type RideContextValue = {
  currentRide: Ride | null;
  rideHistory: Ride[];
  requestRide: (request: RideRequest) => Promise<void>;
  cancelRide: () => Promise<void>;
  completeRide: () => Promise<void>;
};

const RideContext = createContext<RideContextValue | null>(null);

export const RideProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRide, setCurrentRide] = useState<Ride | null>(null);
  const [rideHistory, setRideHistory] = useState<Ride[]>([]);

  const requestRide = async (request: RideRequest) => {
    // Calculate a random price based on distance and ride type
    const distance = calculateDistance(
      request.pickupLocation.latitude, 
      request.pickupLocation.longitude,
      request.destination.latitude,
      request.destination.longitude
    );
    
    let price = distance * 1.5; // Base price per km
    
    // Adjust price based on ride type
    if (request.rideType === 'premium') {
      price *= 1.5;
    } else if (request.rideType === 'luxury') {
      price *= 2.2;
    }
    
    // Round to 2 decimal places
    price = Math.round(price * 100) / 100;
    
    // Mock response with a fake driver
    const ride: Ride = {
      id: Math.random().toString(36).substring(2, 9),
      pickupLocation: request.pickupLocation,
      destination: request.destination,
      rideType: request.rideType,
      status: 'searching',
      price,
      requestedAt: new Date(),
    };
    
    setCurrentRide(ride);
    
    // Simulate finding a driver
    setTimeout(() => {
      setCurrentRide(prevRide => {
        if (!prevRide) return null;
        
        return {
          ...prevRide,
          status: 'driver_assigned',
          driverId: '123',
          driverName: 'John Smith',
          driverRating: 4.8,
          driverPhoto: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          estimatedArrival: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes from now
        };
      });
      
      // Simulate driver arrival
      setTimeout(() => {
        setCurrentRide(prevRide => {
          if (!prevRide) return null;
          
          return {
            ...prevRide,
            status: 'driver_arrived',
            arrivalTime: new Date(),
          };
        });
        
        // Simulate ride start
        setTimeout(() => {
          setCurrentRide(prevRide => {
            if (!prevRide) return null;
            
            return {
              ...prevRide,
              status: 'in_progress',
            };
          });
          
          // Simulate ride completion
          setTimeout(() => {
            setCurrentRide(prevRide => {
              if (!prevRide) return null;
              
              const completedRide = {
                ...prevRide,
                status: 'completed',
                completedAt: new Date(),
              };
              
              // Add to ride history
              setRideHistory(prev => [completedRide, ...prev]);
              
              // Return null to clear current ride
              return null;
            });
          }, 10000); // 10 seconds for demo
        }, 5000); // 5 seconds for demo
      }, 8000); // 8 seconds for demo
    }, 3000); // 3 seconds for demo
  };

  const cancelRide = async () => {
    if (currentRide) {
      const canceledRide: Ride = {
        ...currentRide,
        status: 'cancelled',
      };
      
      setRideHistory(prev => [canceledRide, ...prev]);
      setCurrentRide(null);
    }
  };

  const completeRide = async () => {
    if (currentRide) {
      const completedRide: Ride = {
        ...currentRide,
        status: 'completed',
        completedAt: new Date(),
      };
      
      setRideHistory(prev => [completedRide, ...prev]);
      setCurrentRide(null);
    }
  };

  // Helper function to calculate distance between two points
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c; // Distance in km
    return distance;
  };

  const deg2rad = (deg: number) => {
    return deg * (Math.PI/180);
  };

  return (
    <RideContext.Provider
      value={{
        currentRide,
        rideHistory,
        requestRide,
        cancelRide,
        completeRide,
      }}
    >
      {children}
    </RideContext.Provider>
  );
};

export default RideContext;