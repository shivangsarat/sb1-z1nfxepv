import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CalendarClock, MapPin, ChevronRight, Star } from 'lucide-react-native';
import { COLORS } from '@/constants/Colors';
import { MOCK_RIDES } from '@/constants/MockData';

export default function RidesScreen() {
  const renderRideItem = ({ item }: any) => (
    <TouchableOpacity style={styles.rideCard}>
      <View style={styles.rideHeader}>
        <View style={styles.rideInfo}>
          <Text style={styles.rideDate}>{item.date}</Text>
          <Text style={styles.rideTime}>{item.time}</Text>
        </View>
        <View style={styles.rideStatus}>
          <Text style={[
            styles.rideStatusText, 
            { color: item.status === 'completed' ? COLORS.SUCCESS : COLORS.WARNING }
          ]}>
            {item.status === 'completed' ? 'Completed' : 'Canceled'}
          </Text>
        </View>
      </View>
      
      <View style={styles.routeContainer}>
        <View style={styles.routeIcons}>
          <View style={styles.startPoint} />
          <View style={styles.routeLine} />
          <View style={styles.endPoint} />
        </View>
        
        <View style={styles.routeDetails}>
          <View style={styles.locationContainer}>
            <Text style={styles.locationLabel}>FROM</Text>
            <Text style={styles.locationText}>{item.pickup}</Text>
          </View>
          
          <View style={styles.locationContainer}>
            <Text style={styles.locationLabel}>TO</Text>
            <Text style={styles.locationText}>{item.destination}</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.rideFooter}>
        <View style={styles.ridePrice}>
          <Text style={styles.priceLabel}>Total</Text>
          <Text style={styles.priceValue}>${item.price.toFixed(2)}</Text>
        </View>
        
        {item.status === 'completed' && (
          <View style={styles.driverInfo}>
            <Image 
              source={{ uri: item.driverPhoto }} 
              style={styles.driverPhoto} 
            />
            <View>
              <Text style={styles.driverName}>{item.driverName}</Text>
              <View style={styles.ratingContainer}>
                <Star size={12} color={COLORS.WARNING} fill={COLORS.WARNING} />
                <Text style={styles.ratingText}>{item.driverRating}</Text>
              </View>
            </View>
          </View>
        )}
        
        <TouchableOpacity style={styles.detailsButton}>
          <Text style={styles.detailsButtonText}>Details</Text>
          <ChevronRight size={16} color={COLORS.PRIMARY} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Rides</Text>
        <TouchableOpacity style={styles.filterButton}>
          <CalendarClock size={20} color={COLORS.PRIMARY} />
          <Text style={styles.filterText}>Filter</Text>
        </TouchableOpacity>
      </View>
      
      {MOCK_RIDES.length > 0 ? (
        <FlatList
          data={MOCK_RIDES}
          renderItem={renderRideItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <MapPin size={64} color={COLORS.SECONDARY} />
          <Text style={styles.emptyTitle}>No rides yet</Text>
          <Text style={styles.emptyText}>
            Book your first ride and it will appear here
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
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
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: COLORS.TEXT_PRIMARY,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.PRIMARY_LIGHT,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  filterText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: COLORS.PRIMARY,
    marginLeft: 4,
  },
  listContent: {
    padding: 16,
    gap: 16,
  },
  rideCard: {
    backgroundColor: COLORS.CARD_BACKGROUND,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  rideHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  rideInfo: {},
  rideDate: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: COLORS.TEXT_PRIMARY,
  },
  rideTime: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: COLORS.TEXT_SECONDARY,
  },
  rideStatus: {},
  rideStatusText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  routeContainer: {
    flexDirection: 'row',
    marginBottom: 16,
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
    gap: 12,
  },
  locationContainer: {},
  locationLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 10,
    color: COLORS.TEXT_SECONDARY,
  },
  locationText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: COLORS.TEXT_PRIMARY,
  },
  rideFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: COLORS.BORDER,
    paddingTop: 16,
  },
  ridePrice: {},
  priceLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: COLORS.TEXT_SECONDARY,
  },
  priceValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: COLORS.TEXT_PRIMARY,
  },
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  driverPhoto: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  driverName: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: COLORS.TEXT_PRIMARY,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: COLORS.TEXT_SECONDARY,
    marginLeft: 4,
  },
  detailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailsButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: COLORS.PRIMARY,
    marginRight: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    color: COLORS.TEXT_PRIMARY,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
    maxWidth: '80%',
  },
});