import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Plus, Bell, Search } from "lucide-react-native";

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Olá, 👋</Text>
            <Text style={styles.welcomeTitle}>Bem-vindo ao Agendai</Text>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.iconButton}>
              <Search size={20} color="#71717A" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Bell size={20} color="#71717A" />
              <View style={styles.notificationDot} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          {[
            { value: "1", label: "Hoje" },
            { value: "4", label: "Este mês" },
            { value: "12", label: "Total" },
          ].map((stat) => (
            <View key={stat.label} style={styles.statCard}>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Appointments */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Próximas consultas</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>Ver todas</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.list}>
            <View style={styles.placeholderCard}>
              <Text style={styles.placeholderText}>Nenhuma consulta para exibir agora.</Text>
            </View>
            <View style={styles.placeholderCard}>
              <Text style={styles.placeholderText}>Seus agendamentos aparecerão aqui.</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.fab}>
        <Plus size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  scrollContent: { paddingBottom: 100 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 16,
  },
  greeting: { fontSize: 14, color: "#71717A" },
  welcomeTitle: { fontSize: 20, fontWeight: "bold", color: "#000000" },
  headerActions: { flexDirection: "row", gap: 8 },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E4E4E7",
    alignItems: "center",
    justifyContent: "center",
  },
  notificationDot: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    backgroundColor: "#000000",
    borderRadius: 4,
  },
  statsContainer: { flexDirection: "row", paddingHorizontal: 20, gap: 12, marginBottom: 20 },
  statCard: {
    flex: 1,
    borderRadius: 16,
    padding: 12,
    alignItems: "center",
    backgroundColor: "#F4F4F5",
  },
  statValue: { fontSize: 18, fontWeight: "bold" },
  statLabel: { fontSize: 10, fontWeight: "500", color: "#71717A" },
  section: { paddingHorizontal: 20 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: { fontSize: 16, fontWeight: "bold" },
  seeAll: { fontSize: 12, color: "#000000", fontWeight: "600" },
  list: { gap: 12 },
  placeholderCard: {
    padding: 20,
    backgroundColor: "#F4F4F5",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E4E4E7",
    borderStyle: "dashed",
    alignItems: "center",
  },
  placeholderText: {
    color: "#71717A",
    fontSize: 14,
  },
  fab: {
    position: "absolute",
    bottom: Platform.OS === 'ios' ? 40 : 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default Home;