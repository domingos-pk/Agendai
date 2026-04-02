import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { usePathname, useRouter } from "expo-router";

const NotFound = () => {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", pathname);
  }, [pathname]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>404</Text>
      <Text style={styles.subtitle}>Oops! Página não encontrada</Text>
      <TouchableOpacity onPress={() => router.replace("/")}>
        <Text style={styles.link}>Voltar para o Início</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F4F4F5",
    padding: 20,
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
    color: "#000000",
  },
  subtitle: {
    fontSize: 18,
    color: "#71717a",
    marginBottom: 24,
  },
  link: {
    fontSize: 16,
    color: "#000000",
    textDecorationLine: "underline",
    fontWeight: "500",
  },
});

export default NotFound;
