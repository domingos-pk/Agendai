import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { AtSign, User, Mail, Lock, LucideIcon, ChevronLeft } from "lucide-react-native";
import { Colors } from "../../src/constants/colors";

const SignUp = () => {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", name: "", email: "", password: "" });

  const update = (field: keyof typeof form, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = () => {
    router.push("/(auth)/enter-code");
  };

  const fields: {
    key: keyof typeof form;
    label: string;
    icon: LucideIcon;
    placeholder: string;
    secure: boolean;
    keyboardType?: "default" | "email-address";
  }[] = [
    { key: "name", label: "Nome completo", icon: User, placeholder: "João Silva", secure: false },
    { key: "email", label: "E-mail", icon: Mail, placeholder: "ex. joao@exemplo.com", secure: false, keyboardType: "email-address" },
    { key: "password", label: "Senha", icon: Lock, placeholder: "••••••••", secure: true },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft size={24} color={Colors.textPrimary} />
        </TouchableOpacity>

        <Text style={styles.title}>Nova Conta</Text>
        <Text style={styles.subtitle}>Crie a sua conta em poucos passos</Text>

        <View style={styles.form}>
          {fields.map(({ key, label, icon: Icon, placeholder, secure, keyboardType }) => (
            <View key={key} style={styles.inputGroup}>
              <Text style={styles.label}>{label}</Text>
              <View style={styles.inputWrapper}>
                <Icon size={18} color={Colors.textSecondary} style={styles.inputIcon} />
                <TextInput
                  placeholder={placeholder}
                  placeholderTextColor={Colors.textSecondary}
                  value={form[key]}
                  onChangeText={(val) => update(key, val)}
                  style={styles.input}
                  secureTextEntry={secure}
                  autoCapitalize={key === "email" ? "none" : "words"}
                  keyboardType={keyboardType ?? "default"}
                />
              </View>
            </View>
          ))}

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Criar Conta</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.termsText}>
          Ao continuar, você concorda com nossos{" "}
          <Text style={styles.linkText}>Termos de Uso</Text> e{" "}
          <Text style={styles.linkText}>Política de Privacidade</Text>.
        </Text>

        <TouchableOpacity style={styles.signInRow} onPress={() => router.push("/(auth)/signin")}>
          <Text style={styles.footerText}>
            Já tem uma conta?{" "}
            <Text style={styles.linkTextBold}>Entrar</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 40,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: Colors.surface,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 15,
    color: Colors.textSecondary,
  },
  form: {
    marginTop: 28,
    gap: 16,
  },
  inputGroup: {
    gap: 6,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: Colors.textPrimary,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.surface,
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 52,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: Colors.textPrimary,
  },
  submitButton: {
    backgroundColor: Colors.primary,
    height: 52,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  submitButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
  termsText: {
    textAlign: "center",
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 20,
    lineHeight: 18,
  },
  linkText: {
    color: Colors.primary,
    fontWeight: "500",
  },
  linkTextBold: {
    color: Colors.primary,
    fontWeight: "700",
  },
  signInRow: {
    alignItems: "center",
    marginTop: 16,
  },
  footerText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
});

export default SignUp;
