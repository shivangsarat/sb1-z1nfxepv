import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { X, Clock } from 'lucide-react-native';
import { COLORS } from '@/constants/Colors';
import { RideType } from '@/types/ride';

type RideTypesSelectorProps = {
  onSelectRideType: (type: RideType) => void;
  selectedRideType: RideType;
  destination: any;
  onCancel: () => void;
};

const RideTypesSelector: React.FC<RideTypesSelectorProps> = ({ 
  onSelectRideType, 
  selectedRideType,
  destination,
  onCancel
}) => {
  // Calculate mock prices
  const standardPrice = 25.99;
  const premiumPrice = standardPrice * 1.5;
  const luxuryPrice = standardPrice * 2.2;

  // Calculate mock ETA
  const standardETA = '5';
  const premiumETA = '7';
  const luxuryETA = '10';

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onCancel} style={styles.closeButton}>
          <X size={24} color={COLORS.TEXT_PRIMARY} />
        </TouchableOpacity>
        <Text style={styles.title}>Select Ride</Text>
        <View style={styles.placeholder} />
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.destinationInfo}>
          <Text style={styles.destinationTitle}>
            {destination?.name || 'Selected Destination'}
          </Text>
          <Text style={styles.destinationAddress}>
            {destination?.address || 'Address details'}
          </Text>
        </View>
        
        <View style={styles.rideOptions}>
          <TouchableOpacity 
            style={[
              styles.rideOption, 
              selectedRideType === 'standard' && styles.selectedRideOption
            ]}
            onPress={() => onSelectRideType('standard')}
          >
            <View style={styles.rideDetails}>
              <View style={styles.rideIconContainer}>
                <Image 
                  source={{ uri: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=600' }} 
                  style={styles.carIcon} 
                />
              </View>
              <View style={styles.rideInfo}>
                <Text style={styles.rideType}>Standard</Text>
                <View style={styles.etaContainer}>
                  <Clock size={12} color={COLORS.TEXT_SECONDARY} />
                  <Text style={styles.etaText}>{standardETA} min</Text>
                </View>
              </View>
            </View>
            <Text style={styles.priceText}>${standardPrice.toFixed(2)}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.rideOption, 
              selectedRideType === 'premium' && styles.selectedRideOption
            ]}
            onPress={() => onSelectRideType('premium')}
          >
            <View style={styles.rideDetails}>
              <View style={styles.rideIconContainer}>
                <Image 
                  source={{ uri: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=600' }} 
                  style={styles.carIcon} 
                />
              </View>
              <View style={styles.rideInfo}>
                <Text style={styles.rideType}>Premium</Text>
                <View style={styles.etaContainer}>
                  <Clock size={12} color={COLORS.TEXT_SECONDARY} />
                  <Text style={styles.etaText}>{premiumETA} min</Text>
                </View>
              </View>
            </View>
            <Text style={styles.priceText}>${premiumPrice.toFixed(2)}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.rideOption, 
              selectedRideType === 'luxury' && styles.selectedRideOption
            ]}
            onPress={() => onSelectRideType('luxury')}
          >
            <View style={styles.rideDetails}>
              <View style={styles.rideIconContainer}>
                <Image 
                  source={{ uri: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=600' }} 
                  style={styles.carIcon} 
                />
              </View>
              <View style={styles.rideInfo}>
                <Text style={styles.rideType}>Luxury</Text>
                <View style={styles.etaContainer}>
                  <Clock size={12} color={COLORS.TEXT_SECONDARY} />
                  <Text style={styles.etaText}>{luxuryETA} min</Text>
                </View>
              </View>
            </View>
            <Text style={styles.priceText}>${luxuryPrice.toFixed(2)}</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.paymentSection}>
          <View style={styles.paymentHeader}>
            <Text style={styles.paymentTitle}>Payment</Text>
            <TouchableOpacity>
              <Text style={styles.changeText}>Change</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.paymentMethod}>
            <Image 
              source={{ uri: 'https://images.pexels.com/photos/8982620/pexels-photo-8982620.jpeg?auto=compress&cs=tinysrgb&w=600' }} 
              style={styles.paymentIcon} 
            />
            <Text style={styles.paymentText}>Visa •••• 4242</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.CARD_BACKGROUND,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: 24,
    maxHeight: '70%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BORDER,
  },
  closeButton: {
    padding: 4,
  },
  title: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: COLORS.TEXT_PRIMARY,
  },
  placeholder: {
    width: 24,
  },
  destinationInfo: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BORDER,
  },
  destinationTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: COLORS.TEXT_PRIMARY,
    marginBottom: 4,
  },
  destinationAddress: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: COLORS.TEXT_SECONDARY,
  },
  rideOptions: {
    padding: 16,
    gap: 16,
  },
  rideOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: COLORS.BACKGROUND,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.BORDER,
  },
  selectedRideOption: {
    borderColor: COLORS.PRIMARY,
    backgroundColor: COLORS.PRIMARY_LIGHT,
  },
  rideDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rideIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 8,
    marginRight: 12,
    overflow: 'hidden',
  },
  carIcon: {
    width: '100%',
    height: '100%',
  },
  rideInfo: {},
  rideType: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: COLORS.TEXT_PRIMARY,
    marginBottom: 4,
  },
  etaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  etaText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: COLORS.TEXT_SECONDARY,
    marginLeft: 4,
  },
  priceText: {
    fontFamily: 'Inter-Bold',
    fontSize: a well-designed search page

    fontSize: 16,
    color: COLORS.TEXT_PRIMARY,
  },
  paymentSection: {
    padding: 16,
    backgroundColor: COLORS.BACKGROUND,
    margin: 16,
    borderRadius: 12,
  },
  paymentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  paymentTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: COLORS.TEXT_PRIMARY,
  },
  changeText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: COLORS.PRIMARY,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentIcon: {
    width: 24,
    height: 24,
    borderRadius: 4,
    marginRight: 8,
  },
  paymentText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: COLORS.TEXT_PRIMARY,
  },
});

export default RideTypesSelector;