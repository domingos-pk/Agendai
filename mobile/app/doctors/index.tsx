import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Search, Mic, SlidersHorizontal, Star } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../src/constants/colors';
import { LocaleDirContext } from '@react-navigation/native';

const doctorsData = [
  {
    id: '1',
    name: 'Dr. Shaun Murphy',
    specialty: 'Cirurgião Geral',
    location: 'Luanda, Angola',
    rating: 4.4,
    reviews: 230,
    image: require('../../src/assets/medical/Dr. Shaun Murphy.jpg'), // Placeholder
  },
  {
    id: '2',
    name: 'Dr. Aaron Glassman',
    specialty: 'Neurocirurgião',
    location: 'Luanda, Angola',
    rating: 4.4,
    reviews: 230,
    image: require('../../src/assets/medical/Dr. Aaron Glassman.jpg'), // Placeholder
  },
  {
    id: '3',
    name: 'Dr. Marcus Andrews',
    specialty: 'Cirurgia Plástica e Reconstrutiva',
    location: 'Luanda, Angola',
    rating: 4.4,
    reviews: 230,
    image: require('../../src/assets/medical/Dr. Marcus Andrews.jpg'), // Placeholder
  },
  {
    id: '4',
    name: 'Dra. Audrey Lim',
    specialty: 'Cirurgia de Traumatismo',
    location: 'Luanda, Angola',
    rating: 4.4,
    reviews: 230,
    image: require('../../src/assets/medical/Dra. Audrey Lim.jpg'), // Placeholder
  },
  {
    id: '5',
    name: 'Dra. Claire Browne',
    specialty: 'Cirurgiã Geral',
    location: 'Luanda, Angola',
    rating: 4.4,
    reviews: 230,
    image: require('../../src/assets/medical/Dra. Claire Browne.jpg'), // Placeholder
  },
  {
    id: '6',
    name: 'Dr. Alex Park',
    specialty: 'Cirurgia Geral / Oncologia',
    location: 'Luanda, Angola',
    rating: 4.4,
    reviews: 230,
    image: require('../../src/assets/medical/Dr. Alex Park.jpg'), // Placeholder
  },
  {
    id: '7',
    name: 'Dra. Morgan Reznick',
    specialty: 'Medicina Interna',
    location: 'Luanda, Angola',
    rating: 4.4,
    reviews: 230,
    image: require('../../src/assets/medical/Dra. Morgan Reznick.jpg'), // Placeholder  
  },
  {
    id: '8',
    name: 'Dra. Jordan Allen',
    specialty: 'Cirurgiã Geral com interesse em Ortopedia e Engenharia Médica',
    location: 'Luanda, Angola',
    rating: 4.4,
    reviews: 230,
    image: require('../../src/assets/medical/Dra. Jordan Allen.jpg'), // Placeholder
  },
];

export default function DoctorsScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ChevronLeft size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Doctors</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.searchSection}>
        <View style={styles.searchContainer}>
          <Search size={20} color={Colors.textSecondary} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Specialists,Clinics..."
            placeholderTextColor={Colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <Mic size={20} color={Colors.textSecondary} style={styles.micIcon} />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <SlidersHorizontal size={20} color={Colors.textPrimary} />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        {doctorsData.map((doctor) => (
          <TouchableOpacity
            key={doctor.id}
            style={styles.doctorCard}
            onPress={() => router.push(`/doctors/${doctor.id}` as any)}
          >
            <View style={styles.doctorCardHeader}>
              <View style={styles.doctorImageContainer}>
                <Image source={doctor.image} style={styles.doctorImage} resizeMode="cover" />
              </View>
              <View style={styles.doctorInfo}>
                <Text style={styles.doctorName}>{doctor.name}</Text>
                <Text style={styles.doctorSpecialtyLocation}>
                  {doctor.specialty} | {doctor.location}
                </Text>
                <View style={styles.ratingContainer}>
                  <Star size={14} color="#FBBF24" fill="#FBBF24" />
                  <Text style={styles.ratingText}>
                    <Text style={styles.ratingScore}>{doctor.rating}</Text> ({doctor.reviews} reviews)
                  </Text>
                </View>
              </View>
            </View>

            <TouchableOpacity
              style={styles.bookButton}
              onPress={() => router.push(`/doctors/${doctor.id}` as any)}
            >
              <Text style={styles.bookButtonText}>Agenda Agora</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA', // Light gray background matching the image
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    height: 50,
    borderRadius: 25,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: Colors.textPrimary,
  },
  micIcon: {
    marginLeft: 10,
  },
  filterButton: {
    width: 50,
    height: 50,
    backgroundColor: Colors.white,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 16,
  },
  doctorCard: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  doctorCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  doctorImageContainer: {
    width: 70,
    height: 70,
    borderRadius: 16,
    backgroundColor: Colors.surface,
    overflow: 'hidden',
    marginRight: 16,
  },
  doctorImage: {
    width: '100%',
    height: '100%',
  },
  doctorInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  doctorSpecialtyLocation: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  ratingScore: {
    color: Colors.textPrimary, // darker color for the score itself based on image
    fontWeight: 'bold',
  },
  bookButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookButtonText: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: '600',
  },
});
