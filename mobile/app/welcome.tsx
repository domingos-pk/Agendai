import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

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
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  heroSection: { flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 32 },
  heroImage: { width: 280, height: 280 },
  contentSection: { paddingHorizontal: 32, paddingBottom: 40 },
  textGroup: { alignItems: "center", marginBottom: 32 },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000000",
    textAlign: "center",
    lineHeight: 34,
    marginBottom: 12,
  },
  subtitle: { fontSize: 16, color: "#71717A", textAlign: "center" },
  buttonGroup: { gap: 12, marginBottom: 32 },
  primaryButton: {
    backgroundColor: "#000000",
    height: 56,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "600" },
  secondaryButton: {
    height: 56,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#000000",
  },
  secondaryButtonText: { color: "#000000", fontSize: 16, fontWeight: "600" },
  footerText: { textAlign: "center", fontSize: 12, color: "#71717A" },
  linkText: { textDecorationLine: "underline", fontWeight: "500", color: "#000000" },
});

export default Welcome;
