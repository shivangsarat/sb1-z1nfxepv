import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronRight, Shield, CircleHelp as HelpCircle, Info, Mail, Star, Smartphone, Globe } from 'lucide-react-native';
import { COLORS } from '@/constants/Colors';

export default function SettingsScreen() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [locationPermission, setLocationPermission] = useState(true);
  
  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleNotifications = () => setNotifications(!notifications);
  const toggleLocationPermission = () => setLocationPermission(!locationPermission);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>General</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingContent}>
              <Text style={styles.settingLabel}>Dark Mode</Text>
              <Switch
                trackColor={{ false: COLORS.BORDER, true: COLORS.PRIMARY_LIGHT }}
                thumbColor={darkMode ? COLORS.PRIMARY : COLORS.SECONDARY}
                onValueChange={toggleDarkMode}
                value={darkMode}
              />
            </View>
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingContent}>
              <Text style={styles.settingLabel}>Push Notifications</Text>
              <Switch
                trackColor={{ false: COLORS.BORDER, true: COLORS.PRIMARY_LIGHT }}
                thumbColor={notifications ? COLORS.PRIMARY : COLORS.SECONDARY}
                onValueChange={toggleNotifications}
                value={notifications}
              />
            </View>
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingContent}>
              <Text style={styles.settingLabel}>Location Access</Text>
              <Switch
                trackColor={{ false: COLORS.BORDER, true: COLORS.PRIMARY_LIGHT }}
                thumbColor={locationPermission ? COLORS.PRIMARY : COLORS.SECONDARY}
                onValueChange={toggleLocationPermission}
                value={locationPermission}
              />
            </View>
          </View>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <Globe size={20} color={COLORS.PRIMARY} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingLabel}>Language</Text>
              <View style={styles.settingValueContainer}>
                <Text style={styles.settingValue}>English</Text>
                <ChevronRight size={20} color={COLORS.TEXT_SECONDARY} />
              </View>
            </View>
          </TouchableOpacity>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App</Text>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <Shield size={20} color={COLORS.PRIMARY} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingLabel}>Privacy</Text>
              <ChevronRight size={20} color={COLORS.TEXT_SECONDARY} />
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <HelpCircle size={20} color={COLORS.PRIMARY} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingLabel}>Help Center</Text>
              <ChevronRight size={20} color={COLORS.TEXT_SECONDARY} />
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <Mail size={20} color={COLORS.PRIMARY} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingLabel}>Contact Us</Text>
              <ChevronRight size={20} color={COLORS.TEXT_SECONDARY} />
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <Star size={20} color={COLORS.PRIMARY} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingLabel}>Rate the App</Text>
              <ChevronRight size={20} color={COLORS.TEXT_SECONDARY} />
            </View>
          </TouchableOpacity>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <Info size={20} color={COLORS.PRIMARY} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingLabel}>Terms of Service</Text>
              <ChevronRight size={20} color={COLORS.TEXT_SECONDARY} />
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <Shield size={20} color={COLORS.PRIMARY} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingLabel}>Privacy Policy</Text>
              <ChevronRight size={20} color={COLORS.TEXT_SECONDARY} />
            </View>
          </TouchableOpacity>
          
          <View style={styles.versionContainer}>
            <Smartphone size={20} color={COLORS.TEXT_SECONDARY} />
            <Text style={styles.versionText}>Version 1.0.0</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  header: {
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
  section: {
    backgroundColor: COLORS.CARD_BACKGROUND,
    borderRadius: 16,
    margin: 16,
    marginBottom: 8,
    padding: 16,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: COLORS.TEXT_PRIMARY,
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BORDER,
  },
  settingIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.PRIMARY_LIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: COLORS.TEXT_PRIMARY,
  },
  settingValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingValue: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: COLORS.TEXT_SECONDARY,
    marginRight: 8,
  },
  versionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  versionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: COLORS.TEXT_SECONDARY,
    marginLeft: 8,
  },
});