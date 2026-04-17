import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Search } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../src/constants/colors';

const MOCK_APPOINTMENTS = [
  {
    id: '1',
    doctorName: 'Dr. Shaun Murphy',
    specialty: 'Cirurgião Geral',
    location: 'Luanda, Angola',
    date: 'Domingo, 25 Junho',
    time: '12:30 PM',
    image: require('../../src/assets/medical/Dr. Shaun Murphy.jpg'),
    status: 'upcoming',
  },
  {
    id: '2',
    doctorName: 'Dra. Audrey Lim',
    specialty: 'Cirurgiã de Trauma',
    location: 'Luanda, Angola',
    date: 'Segunda-feira, 26 Junho',
    time: '14:00 PM',
    image: require('../../src/assets/medical/Dra. Audrey Lim.jpg'),
    status: 'upcoming',
  },
  {
    id: '3',
    doctorName: 'Dr. Aaron Glassman',
    specialty: 'Neurocirurgião',
    location: 'Luanda, Angola',
    date: 'Quarta-feira, 21 Junho',
    time: '09:00 AM',
    image: require('../../src/assets/medical/Dr. Aaron Glassman.jpg'),
    status: 'upcoming',
  },
  {
    id: '4',
    doctorName: 'Dr. Marcus Andrews',
    specialty: 'Neurocirurgião',
    location: 'Luanda, Angola',
    date: 'Quinta-feira, 15 Junho',
    time: '10:00 AM',
    image: require('../../src/assets/medical/Dr. Marcus Andrews.jpg'),
    status: 'completed',
  },
  {
    id: '5',
    doctorName: 'Dr. Shaun Murphy',
    specialty: 'Cirurgião Geral',
    location: 'Luanda, Angola',
    date: 'Terça-feira, 13 Junho',
    time: '11:30 AM',
    image: require('../../src/assets/medical/Dr. Shaun Murphy.jpg'),
    status: 'completed',
  },
  {
    id: '6',
    doctorName: 'Dra. Audrey Lim',
    specialty: 'Cirurgiã de Trauma',
    location: 'Luanda, Angola',
    date: 'Segunda-feira, 5 Junho',
    time: '15:00 PM',
    image: require('../../src/assets/medical/Dra. Audrey Lim.jpg'),
    status: 'canceled',
  }
];

type TabType = 'upcoming' | 'completed' | 'canceled';

export default function Appointments() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>('upcoming');

  const filteredAppointments = MOCK_APPOINTMENTS.filter(app => app.status === activeTab);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton} onPress={() => router.back()}>
          <ChevronLeft size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Minha Agenda</Text>
        <TouchableOpacity style={styles.headerButton}>
          <Search size={22} color="#1F2937" />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TabButton 
          title="Próximas" 
          isActive={activeTab === 'upcoming'} 
          onPress={() => setActiveTab('upcoming')} 
        />
        <TabButton 
          title="Concluídas" 
          isActive={activeTab === 'completed'} 
          onPress={() => setActiveTab('completed')} 
        />
        <TabButton 
          title="Canceladas" 
          isActive={activeTab === 'canceled'} 
          onPress={() => setActiveTab('canceled')} 
        />
      </View>

      {/* List */}
      <ScrollView 
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      >
        {filteredAppointments.map((appointment) => (
          <View key={appointment.id} style={styles.card}>
            <View style={styles.cardInfo}>
              <Image source={appointment.image} style={styles.doctorImage} />
              <View style={styles.doctorDetails}>
                <Text style={styles.doctorName}>{appointment.doctorName}</Text>
                <Text style={styles.doctorSpecialty}>{appointment.specialty} | {appointment.location}</Text>
                <Text style={styles.appointmentDate}>{appointment.date} | {appointment.time}</Text>
              </View>
            </View>

            <View style={styles.cardActions}>
              {activeTab === 'upcoming' && (
                <>
                  <TouchableOpacity style={[styles.actionButton, styles.btnPrimary]}>
                    <Text style={[styles.actionButtonText, styles.textPrimary]}>Remarcar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.actionButton, styles.btnDangerLight]}>
                    <Text style={[styles.actionButtonText, styles.textDanger]}>Cancelar</Text>
                  </TouchableOpacity>
                </>
              )}

              {activeTab === 'completed' && (
                <>
                  <TouchableOpacity style={[styles.actionButton, styles.btnPrimary]}>
                    <Text style={[styles.actionButtonText, styles.textPrimary]}>Avaliar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.actionButton, styles.btnPrimaryLight]}>
                    <Text style={[styles.actionButtonText, { color: Colors.primary }]}>Reagendar</Text>
                  </TouchableOpacity>
                </>
              )}

              {activeTab === 'canceled' && (
                <>
                  <TouchableOpacity style={[styles.actionButton, styles.btnPrimary]}>
                    <Text style={[styles.actionButtonText, styles.textPrimary]}>Reagendar</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        ))}
        {filteredAppointments.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>Nenhuma consulta encontrada.</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const TabButton = ({ title, isActive, onPress }: { title: string, isActive: boolean, onPress: () => void }) => (
  <TouchableOpacity 
    style={[styles.tabButton, isActive && styles.tabButtonActive]} 
    onPress={onPress}
  >
    <Text style={[styles.tabText, isActive && styles.tabTextActive]}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    marginBottom: 16,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabButtonActive: {
    borderBottomColor: Colors.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  tabTextActive: {
    color: Colors.primary,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardInfo: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  doctorImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    marginRight: 16,
  },
  doctorDetails: {
    flex: 1,
    justifyContent: 'center',
    gap: 6,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  doctorSpecialty: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  appointmentDate: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  cardActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  btnPrimary: {
    backgroundColor: Colors.primary,
  },
  textPrimary: {
    color: '#FFFFFF',
  },
  btnDangerLight: {
    backgroundColor: '#FEF2F2',
  },
  textDanger: {
    color: '#EF4444',
  },
  btnPrimaryLight: {
    backgroundColor: '#EFF6FF',
  },
  emptyState: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
  }
});
