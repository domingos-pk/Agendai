import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Colors } from "../src/constants/colors";

const welcomeHero = require("../assets/images/welcome-hero.png");

const Welcome = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.heroSection}>
        <Image source={welcomeHero} style={styles.heroImage} resizeMode="contain" />
      </View>

      <View style={styles.contentSection}>
        <View style={styles.textGroup}>
          <Text style={styles.title}>
            Agende suas consultas com facilidade
          </Text>
          <Text style={styles.subtitle}>
            Cuide da sua saúde com praticidade, em poucos toques.
          </Text>
        </View>

        <View style={styles.buttonGroup}>
          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={() => router.push("/signup")}
          >
            <Text style={styles.primaryButtonText}>Vamos começar</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.secondaryButton}
            onPress={() => router.push("/signin")}
          >
            <Text style={styles.secondaryButtonText}>Já tenho uma conta</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.footerText}>
          Ao continuar, você concorda com nossos{" "}
          <Text style={styles.linkText}>Termos de Uso</Text>{" "}
          e{" "}
          <Text style={styles.linkText}>Política de Privacidade</Text>.
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  heroSection: { flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 32 },
  heroImage: { width: 280, height: 280 },
  contentSection: { paddingHorizontal: 32, paddingBottom: 40 },
  textGroup: { alignItems: "center", marginBottom: 32 },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: Colors.textPrimary,
    textAlign: "center",
    lineHeight: 34,
    marginBottom: 10,
  },
  subtitle: { fontSize: 15, color: Colors.textSecondary, textAlign: "center", lineHeight: 22 },
  buttonGroup: { gap: 12, marginBottom: 28 },
  primaryButton: {
    backgroundColor: Colors.primary,
    height: 52,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonText: { color: Colors.white, fontSize: 16, fontWeight: "600" },
  secondaryButton: {
    height: 52,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: Colors.primary,
  },
  secondaryButtonText: { color: Colors.primary, fontSize: 16, fontWeight: "600" },
  footerText: { textAlign: "center", fontSize: 12, color: Colors.textSecondary },
  linkText: { textDecorationLine: "underline", fontWeight: "500", color: Colors.primary },
});

export default Welcome;
