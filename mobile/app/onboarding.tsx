import React, { useState, useCallback } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import OnboardingItem from "../src/components/onboarding/OnboardingItem";
import Pagination from "../src/components/onboarding/Pagination";
import { ONBOARDING_SLIDES } from "../src/constants/onboarding";
import { Colors } from "../src/constants/colors";

const Onboarding = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();
  const isLast = currentIndex === ONBOARDING_SLIDES.length - 1;

  const completeOnboarding = useCallback(async () => {
    try {
      await SecureStore.setItemAsync("agendai_onboarding_done", "true");
      router.replace("/welcome");
    } catch (e) {
      console.error("Erro ao salvar status do onboarding:", e);
    }
  }, [router]);

  const handleNext = async () => {
    if (isLast) {
      await completeOnboarding();
    } else {
      setCurrentIndex((prev) => Math.min(prev + 1, ONBOARDING_SLIDES.length - 1));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {!isLast && (
          <TouchableOpacity onPress={completeOnboarding}>
            <Text style={styles.skipText}>Pular</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.slideContainer}>
        <OnboardingItem
          image={ONBOARDING_SLIDES[currentIndex].image}
          title={ONBOARDING_SLIDES[currentIndex].title}
          description={ONBOARDING_SLIDES[currentIndex].description}
        />
      </View>

      <View style={styles.footer}>
        <Pagination total={ONBOARDING_SLIDES.length} current={currentIndex} />
        
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>
            {isLast ? "Começar" : "Próximo"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 24,
    height: 80,
  },
  skipText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  slideContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    paddingHorizontal: 32,
    paddingBottom: 40,
    gap: 24,
  },
  button: {
    backgroundColor: Colors.primary,
    height: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Onboarding;
