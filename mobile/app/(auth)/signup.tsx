import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { AtSign, User, Mail, Lock, LucideIcon } from "lucide-react-native";

const SignUp = () => {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", name: "", email: "", password: "" });

  const update = (field: keyof typeof form, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = () => {
    router.push("/home");
  };

  const fields: {
    key: keyof typeof form;
    label: string;
    icon: LucideIcon;
    placeholder: string;
    secure: boolean;
  }[] = [
    { key: "username", label: "Usuário", icon: AtSign, placeholder: "joaodoe", secure: false },
    { key: "name", label: "Nome", icon: User, placeholder: "João Silva", secure: false },
    { key: "email", label: "E-mail", icon: Mail, placeholder: "ex. joao@exemplo.com", secure: false },
    { key: "password", label: "Senha", icon: Lock, placeholder: "********", secure: true },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backButtonText}>{"<"}</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Criar Conta</Text>
        <Text style={styles.subtitle}>Comece sua jornada de saúde conosco</Text>

        <View style={styles.form}>
          {fields.map(({ key, label, icon: Icon, placeholder, secure }) => (
            <View key={key} style={styles.inputGroup}>
              <Text style={styles.label}>{label}</Text>
              <View style={styles.inputWrapper}>
                <Icon size={18} color="#71717a" style={styles.inputIcon} />
                <TextInput
                  placeholder={placeholder}
                  value={form[key]}
                  onChangeText={(val) => update(key, val)}
                  style={styles.input}
                  secureTextEntry={secure}
                  autoCapitalize={key === 'email' ? 'none' : 'sentences'}
                />
              </View>
            </View>
          ))}

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Cadastrar</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.termsText}>
          Ao clicar em "Cadastrar", você concorda com nossos{" "}
          <Text style={styles.boldText}>Termos de Uso</Text> e{" "}
          <Text style={styles.boldText}>Política de Privacidade</Text>.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 40,
  },
  backButton: {
    marginBottom: 24,
  },
  backButtonText: {
    fontSize: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000000',
  },
  subtitle: {
    fontSize: 16,
    color: '#71717a',
    marginTop: 4,
  },
  form: {
    marginTop: 24,
    gap: 16,
  },
  inputGroup: {
    gap: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f4f4f5',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 56,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
  },
  submitButton: {
    backgroundColor: '#000000',
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  termsText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#71717a',
    marginTop: 20,
    lineHeight: 18,
  },
  boldText: {
    color: '#000000',
    fontWeight: '600',
  },
});

export default SignUp;
