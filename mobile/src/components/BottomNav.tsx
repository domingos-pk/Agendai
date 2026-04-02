import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Home, Calendar, Clock, User } from "lucide-react-native";
import { useRouter, usePathname } from "expo-router";

const navItems = [
  { icon: Home, label: "Início", path: "/home" },
  { icon: Calendar, label: "Agendar", path: "/agendar" },
  { icon: Clock, label: "Histórico", path: "/historico" },
  { icon: User, label: "Perfil", path: "/perfil" },
];

const BottomNav = () => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <View style={styles.container}>
      {navItems.map((item) => {
        const active = pathname === item.path;
        const Icon = item.icon;
        
        return (
          <TouchableOpacity
            key={item.path}
            onPress={() => router.push(item.path as any)}
            style={styles.navItem}
            activeOpacity={0.7}
          >
            <Icon 
              size={24} 
              color={active ? "#000000" : "#71717a"} 
              strokeWidth={active ? 2.5 : 2}
            />
            <Text style={[
              styles.label,
              active && styles.labelActive
            ]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#e4e4e7',
    paddingTop: 12,
    paddingBottom: 24,
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    alignItems: 'center',
  },
  label: {
    fontSize: 10,
    fontWeight: '600',
    color: '#71717a',
    marginTop: 4,
  },
  labelActive: {
    color: '#000000',
  },
});

export default BottomNav;
