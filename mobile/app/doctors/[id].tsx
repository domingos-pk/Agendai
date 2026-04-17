import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronLeft, Heart, MapPin, Star, Calendar, Clock } from 'lucide-react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Colors } from '../../src/constants/colors';

const { width } = Dimensions.get('window');

// Mock data (would fetch based on ID in a real app)
const doctorData = {
  id: '1',
  name: 'Dr. Shaun Murphy',
  specialty: 'Cirugião Geral', 
  location: 'Luanda, Angola',
  experience: '+7 Years',
  patients: '+800',
  rating: '4.4',
  reviewCount: '+600',
  about: 'Dr. Shaun Murphy is the top most Immunologists specialist in Christ Hospital at London. She achived several awards for her wonderful contribution in medical field. She is available for private consultation.',
  workingDays: 'Segunda - Sexta',
  workingHours: '08.00 AM - 20.00 PM',
  image: require('../../src/assets/medical/Dr. Shaun Murphy.jpg'), // Placeholder
};


export default function DoctorProfileScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  
  const [activeTab, setActiveTab] = useState('Sobre');

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Header Image & Top Bar */}
        <View style={styles.imageContainer}>
          <Image source={doctorData.image} style={styles.heroImage} resizeMode="cover" />
          
          {/* Overlay Header */}
          <View style={[styles.headerOverlay, { top: Math.max(insets.top, 20) }]}>
            <TouchableOpacity style={styles.iconButton} onPress={() => router.back()}>
              <ChevronLeft size={24} color={Colors.textPrimary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Heart size={24} color={Colors.textPrimary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Content Panel */}
        <View style={styles.contentPanel}>
          <Text style={styles.doctorName}>{doctorData.name}</Text>
          <Text style={styles.doctorSpecialty}>{doctorData.specialty}</Text>
          
          <View style={styles.locationContainer}>
            <MapPin size={16} color={Colors.primary} />
            <Text style={styles.locationText}>{doctorData.location}</Text>
          </View>

          {/* Stats */}
          <View style={styles.statsContainer}>
            <View style={[styles.statBox, { backgroundColor: '#F9FAFB' }]}>
              <Text style={styles.statLabel}>Experiência</Text>
              <Text style={styles.statValueBlue}>{doctorData.experience}</Text>
            </View>
            <View style={[styles.statBox, { backgroundColor: Colors.primaryLight }]}>
              <Text style={styles.statLabel}>Pacientes</Text>
              <Text style={styles.statValueBlue}>{doctorData.patients}</Text>
            </View>
            <View style={[styles.statBox, { backgroundColor: '#F9FAFB' }]}>
              <View style={styles.ratingRow}>
                <Star size={14} color="#FBBF24" fill="#FBBF24" />
                <Text style={styles.statLabelBlack}>{doctorData.rating}</Text>
              </View>
              <Text style={styles.statValueBlue}>{doctorData.reviewCount}</Text>
            </View>
          </View>

          {/* Tabs */}
          <View style={styles.tabsContainer}>
            {['Sobre', 'Localização', 'Reviews'].map((tab) => (
              <TouchableOpacity
                key={tab}
                style={[styles.tabButton, activeTab === tab && styles.activeTabButton]}
                onPress={() => setActiveTab(tab)}
              >
                <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Tab Content: About */}
          {activeTab === 'Sobre' && (
            <View style={styles.tabContent}>
              <Text style={styles.sectionTitle}>Sobre me</Text>
              <Text style={styles.aboutText}>{doctorData.about}</Text>

              <Text style={styles.sectionTitle}>Horario de Trabalho</Text>
              <View style={styles.workingTimeRow}>
                <View style={styles.workingTimeItem}>
                  <Calendar size={16} color={Colors.textSecondary} />
                  <Text style={styles.workingTimeText}>{doctorData.workingDays}</Text>
                </View>
                <Text style={styles.workingTimeDivider}>|</Text>
                <View style={styles.workingTimeItem}>
                  <Clock size={16} color={Colors.textSecondary} />
                  <Text style={styles.workingTimeText}>{doctorData.workingHours}</Text>
                </View>
              </View>

              <Text style={styles.sectionTitle}>Clinica</Text>
              {/* Additional clinic info could go here */}
            </View>
          )}

          {/* Spacing for bottom button */}
          <View style={{ height: 100 }} />
        </View>
      </ScrollView>

      {/* Bottom Fixed Button */}
      <View style={[styles.bottomBar, { paddingBottom: Math.max(insets.bottom, 20) }]}>
        <TouchableOpacity style={styles.appointmentButton}>
          <Text style={styles.appointmentButtonText}>Fazer Agendamento</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  imageContainer: {
    width: '100%',
    height: 350,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  headerOverlay: {
    position: 'absolute',
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 10,
  },
  iconButton: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentPanel: {
    flex: 1,
    backgroundColor: Colors.white,
    marginTop: -30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  doctorName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  doctorSpecialty: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 12,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  locationText: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginLeft: 6,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    gap: 10,
  },
  statBox: {
    flex: 1,
    borderRadius: 16,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: Colors.textPrimary,
    marginBottom: 6,
    fontWeight: '500',
  },
  statLabelBlack: {
    fontSize: 12,
    color: Colors.textPrimary,
    fontWeight: '700',
    marginLeft: 4,
  },
  statValueBlue: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: '600',
    marginTop: 6,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    marginBottom: 24,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTabButton: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary,
  },
  tabText: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  activeTabText: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
  tabContent: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 12,
    marginTop: 8,
  },
  aboutText: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 22,
    marginBottom: 20,
  },
  workingTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 20,
  },
  workingTimeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  workingTimeText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  workingTimeDivider: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginHorizontal: 8,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  appointmentButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appointmentButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
