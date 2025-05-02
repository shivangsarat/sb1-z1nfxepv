import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { useLocation } from '@/hooks/useLocation';
import { useRide } from '@/hooks/useRide';
import { MapPin, Navigation, Search, X, ChevronDown } from 'lucide-react-native';
import { COLORS } from '@/constants/Colors';
import SearchBar from '@/components/home/SearchBar';
import RideTypesSelector from '@/components/home/RideTypesSelector';
import RideConfirmation from '@/components/home/RideConfirmation';
import { RideType } from '@/types/ride';

export default function HomeScreen() {
  const { currentLocation, savedLocations, searchLocation, setSearchLocation } = useLocation();
  const { requestRide, cancelRide, currentRide } = useRide();
  
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [selectedRideType, setSelectedRideType] = useState<RideType>('standard');
  const [isSearchModalVisible, setIsSearchModalVisible] = useState(false);
  const [bookingStage, setBookingStage] = useState<'initial' | 'selectDestination' | 'selectRide' | 'confirmRide'>('initial');
  
  useEffect(() => {
    if (selectedLocation && bookingStage === 'selectDestination') {
      setBookingStage('selectRide');
    }
  }, [selectedLocation, bookingStage]);

  const handleSearchPress = () => {
    setIsSearchModalVisible(true);
  };

  const handleLocationSelect = (location: any) => {
    setSelectedLocation(location);
    setIsSearchModalVisible(false);
  };

  const handleRideTypeSelect = (type: RideType) => {
    setSelectedRideType(type);
    setBookingStage('confirmRide');
  };

  const handleConfirmRide = () => {
    if (selectedLocation && selectedRideType) {
      requestRide({
        pickupLocation: currentLocation,
        destination: selectedLocation,
        rideType: selectedRideType,
      });
    }
  };

  const handleCancelRide = () => {
    cancelRide();
    setBookingStage('initial');
    setSelectedLocation(null);
  };

  const resetBooking = () => {
    setBookingStage('initial');
    setSelectedLocation(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mapContainer}>
        {currentLocation ? (
          <MapView
            style={styles.map}
            provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
            initialRegion={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            showsUserLocation
            showsMyLocationButton
          >
            {currentLocation && (
              <Marker
                coordinate={{
                  latitude: currentLocation.latitude,
                  longitude: currentLocation.longitude,
                }}
                title="Your Location"
              />
            )}
            
            {selectedLocation && (
              <Marker
                coordinate={{
                  latitude: selectedLocation.latitude,
                  longitude: selectedLocation.longitude,
                }}
                title={selectedLocation.name || 'Destination'}
                pinColor="#ff9500"
              />
            )}
            
            {/* Fake nearby drivers */}
            <Marker
              coordinate={{
                latitude: currentLocation.latitude + 0.002,
                longitude: currentLocation.longitude + 0.001,
              }}
              title="Driver 1"
              pinColor="#0A84FF"
            />
            <Marker
              coordinate={{
                latitude: currentLocation.latitude - 0.001,
                longitude: currentLocation.longitude + 0.002,
              }}
              title="Driver 2"
              pinColor="#0A84FF"
            />
            <Marker
              coordinate={{
                latitude: currentLocation.latitude + 0.001,
                longitude: currentLocation.longitude - 0.002,
              }}
              title="Driver 3"
              pinColor="#0A84FF"
            />
          </MapView>
        ) : (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading map...</Text>
          </View>
        )}
      </View>
      
      {bookingStage === 'initial' && (
        <View style={styles.searchBarContainer}>
          <SearchBar onPress={handleSearchPress} />
          
          <View style={styles.quickAccessContainer}>
            <Text style={styles.quickAccessTitle}>Quick Access</Text>
            
            <View style={styles.savedLocationsContainer}>
              {savedLocations.map((location, index) => (
                <TouchableOpacity 
                  key={index} 
                  style={styles.savedLocationItem}
                  onPress={() => handleLocationSelect(location)}
                >
                  <View style={styles.savedLocationIcon}>
                    {location.type === 'home' ? (
                      <MapPin size={16} color={COLORS.PRIMARY} />
                    ) : (
                      <Navigation size={16} color={COLORS.PRIMARY} />
                    )}
                  </View>
                  <View>
                    <Text style={styles.savedLocationName}>{location.name}</Text>
                    <Text style={styles.savedLocationAddress}>{location.address}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      )}
      
      {bookingStage === 'selectRide' && (
        <RideTypesSelector 
          onSelectRideType={handleRideTypeSelect}
          selectedRideType={selectedRideType}
          destination={selectedLocation}
          onCancel={resetBooking}
        />
      )}
      
      {bookingStage === 'confirmRide' && (
        <RideConfirmation
          pickupLocation={currentLocation}
          destination={selectedLocation}
          rideType={selectedRideType}
          onConfirm={handleConfirmRide}
          onCancel={handleCancelRide}
        />
      )}
      
      {/* Search Modal */}
      <Modal
        visible={isSearchModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsSearchModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Where to?</Text>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => setIsSearchModalVisible(false)}
              >
                <X size={24} color={COLORS.TEXT_PRIMARY} />
              </TouchableOpacity>
            </View>
            
            <View style={styles.searchInputContainer}>
              <Search size={20} color={COLORS.SECONDARY} style={styles.searchIcon} />
              <Text style={styles.searchInputPlaceholder}>Search for a destination</Text>
            </View>
            
            {/* Mock search results */}
            {[
              { 
                name: 'Central Park', 
                address: 'Manhattan, New York City', 
                latitude: 40.785091, 
                longitude: -73.968285 
              },
              { 
                name: 'Times Square', 
                address: 'Manhattan, New York City', 
                latitude: 40.758896, 
                longitude: -73.985130 
              },
              { 
                name: 'Brooklyn Bridge', 
                address: 'Brooklyn, New York City', 
                latitude: 40.706086, 
                longitude: -73.996864 
              }
            ].map((location, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.searchResultItem}
                onPress={() => handleLocationSelect(location)}
              >
                <MapPin size={20} color={COLORS.SECONDARY} style={styles.resultIcon} />
                <View>
                  <Text style={styles.resultName}>{location.name}</Text>
                  <Text style={styles.resultAddress}>{location.address}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: COLORS.TEXT_SECONDARY,
  },
  searchBarContainer: {
    position: 'absolute',
    top: 16,
    left: 16,
    right: 16,
    backgroundColor: 'transparent',
  },
  quickAccessContainer: {
    backgroundColor: COLORS.CARD_BACKGROUND,
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  quickAccessTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: COLORS.TEXT_PRIMARY,
    marginBottom: 12,
  },
  savedLocationsContainer: {
    gap: 12,
  },
  savedLocationItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  savedLocationIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.PRIMARY_LIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  savedLocationName: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: COLORS.TEXT_PRIMARY,
  },
  savedLocationAddress: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: COLORS.TEXT_SECONDARY,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.CARD_BACKGROUND,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingTop: 16,
    minHeight: '70%',
  },
  modalHandle: {
    width: 40,
    height: 4,
    backgroundColor: COLORS.BORDER,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    color: COLORS.TEXT_PRIMARY,
  },
  closeButton: {
    padding: 4,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.BORDER,
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 56,
    backgroundColor: COLORS.BACKGROUND,
    marginBottom: 24,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInputPlaceholder: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: COLORS.TEXT_SECONDARY,
  },
  searchResultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BORDER,
  },
  resultIcon: {
    marginRight: 12,
  },
  resultName: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: COLORS.TEXT_PRIMARY,
  },
  resultAddress: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: COLORS.TEXT_SECONDARY,
  },
});