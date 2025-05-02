import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { COLORS } from '@/constants/Colors';
import { RideType } from '@/types/ride';
import { MapPin, Navigation } from 'lucide-react-native';

type RideConfirmationProps = {
  pickupLocation: any;
  destination: any;
  rideType: RideType;
  onConfirm: () => void;
  onCancel: () => void;
};

const RideConfirmation: React.FC<RideConfirmationProps> = ({ 
  pickupLocation, 
  destination, 
  rideType,
  onConfirm,
  onCancel
}) => {
  // Calculate mock price based on ride type
  let price = 25.99; // Base price for standard
  
  if (rideType === 'premium') {
    price = price * 1.5;
  } else if (rideType === 'luxury') {
    price = price * 2.2;
  }
  
  // Get car image based on ride type
  let carImage = '';
  let rideTypeLabel = '';
  
  if (rideType === 'standard') {
    carImage = 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=600';
    rideTypeLabel = 'Standard';
  } else if (rideType === 'premium') {
    carImage = 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=600';
    rideTypeLabel = 'Premium';
  } else if (rideType === 'luxury') {
    carImage = 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=600';
    rideTypeLabel = 'Luxury';
  }

  return (
    <View style={styles.container}>
      <View style={styles.confirmationCard}>
        <View style={styles.routeInfo}>
          <View style={styles.routeIcons}>
            <View style={styles.startPoint} />
            <View style={styles.routeLine} />
            <View style={styles.endPoint} />
          </View>
          
          <View style={styles.routeDetails}>
            <View style={styles.locationContainer}>
              <Text style={styles.locationLabel}>PICKUP</Text>
              <Text style={styles.locationText}>
                {pickupLocation?.name || 'Current Location'}
              </Text>
            </View>
            
            <View style={styles.locationContainer}>
              <Text style={styles.locationLabel}>DESTINATION</Text>
              <Text style={styles.locationText}>
                {destination?.name || 'Selected Destination'}
              </Text>
            </View>
          </View>
        </View>
        
        <View style={styles.rideDetails}>
          <View style={styles.rideTypeContainer}>
            <Image 
              source={{ uri: carImage }} 
              style={styles.carImage} 
            />
            <View>
              <Text style={styles.rideTypeLabel}>{rideTypeLabel}</Text>
              <Text style={styles.arrivalTime}>Arrives in 5-10 min</Text>
            </View>
          </View>
          
          <View style={styles.priceContainer}>
            <Text style={styles.priceLabel}>Total</Text>
            <Text style={styles.priceValue}>${price.toFixed(2)}</Text>
          </View>
        </View>
        
        <View style={styles.buttons}>
          <TouchableOpacity 
            style={styles.confirmButton}
            onPress={onConfirm}
          >
            <Text style={styles.confirmButtonText}>Confirm Ride</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.cancelButton}
            onPress={onCancel}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  confirmationCard: {
    backgroundColor: COLORS.CARD_BACKGROUND,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  routeInfo: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BORDER,
  },
  routeIcons: {
    width: 24,
    marginRight: 12,
    alignItems: 'center',
  },
  startPoint: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.PRIMARY,
  },
  routeLine: {
    width: 2,
    height: 30,
    backgroundColor: COLORS.BORDER,
    marginVertical: 4,
  },
  endPoint: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.WARNING,
  },
  routeDetails: {
    flex: 1,
    gap: 16,
  },
  locationContainer: {},
  locationLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: COLORS.TEXT_SECONDARY,
  },
  locationText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: COLORS.TEXT_PRIMARY,
  },
  rideDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BORDER,
  },
  rideTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  carImage: {
    width: 48,
    height: 48,
    borderRadius: 8,
    marginRight: 12,
  },
  rideTypeLabel: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: COLORS.TEXT_PRIMARY,
  },
  arrivalTime: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: COLORS.TEXT_SECONDARY,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  priceLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: COLORS.TEXT_SECONDARY,
  },
  priceValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: COLORS.TEXT_PRIMARY,
  },
  buttons: {
    padding: 16,
    gap: 12,
  },
  confirmButton: {
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 12,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: 'white',
  },
  cancelButton: {
    borderRadius: 12,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.BORDER,
  },
  cancelButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: COLORS.TEXT_PRIMARY,
  },
});

export default RideConfirmation;