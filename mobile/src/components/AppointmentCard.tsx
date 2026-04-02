import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Clock, MapPin } from 'lucide-react-native';

interface AppointmentCardProps {
  doctor: string;
  specialty: string;
  date: string;
  time: string;
  location: string;
  avatarColor: string;
  initials: string;
  status?: "confirmada" | "pendente" | "hoje";
}

const statusStyles: Record<string, ViewStyle> = {
  confirmada: {
    backgroundColor: '#d1fae5', // emerald-100
  },
  pendente: {
    backgroundColor: '#fef3c7', // amber-100
  },
  hoje: {
    backgroundColor: '#f4f4f5', // acent
  },
};

const statusTextStyles: Record<string, TextStyle> = {
  confirmada: {
    color: '#047857', // emerald-700
  },
  pendente: {
    color: '#b45309', // amber-700
  },
  hoje: {
    color: '#18181b', // accent-foreground
  },
};

const AppointmentCard = ({
  doctor,
  specialty,
  date,
  time,
  location,
  avatarColor,
  initials,
  status = "confirmada",
}: AppointmentCardProps) => {
  const statusText = status.charAt(0).toUpperCase() + status.slice(1);

  return (
    <View style={styles.card}>
      <View style={styles.container}>
        {/* Avatar */}
        <View
          style={[
            styles.avatar,
            { backgroundColor: avatarColor },
          ]}
        >
          <Text style={styles.avatarText}>{initials}</Text>
        </View>

        {/* Conteúdo */}
        <View style={styles.content}>
          {/* Header com nome e status */}
          <View style={styles.header}>
            <Text style={styles.doctorName} numberOfLines={1}>
              {doctor}
            </Text>
            <View
              style={[
                styles.statusBadge,
                statusStyles[status],
              ]}
            >
              <Text
                style={[
                  styles.statusText,
                  statusTextStyles[status],
                ]}
              >
                {statusText}
              </Text>
            </View>
          </View>

          {/* Especialidade */}
          <Text style={styles.specialty} numberOfLines={1}>
            {specialty}
          </Text>

          {/* Data e Hora */}
          <View style={styles.infoRow}>
            <Clock size={14} color="#71717a" />
            <Text style={styles.infoText}>
              {date} · {time}
            </Text>
          </View>

          {/* Localização */}
          <View style={styles.infoRow}>
            <MapPin size={14} color="#71717a" />
            <Text style={[styles.infoText, styles.locationText]} numberOfLines={1}>
              {location}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 2,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  doctorName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#18181b',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  specialty: {
    fontSize: 12,
    color: '#71717a',
    marginTop: 2,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 6,
  },
  infoText: {
    fontSize: 12,
    color: '#71717a',
  },
  locationText: {
    flex: 1,
  },
});

export default AppointmentCard;