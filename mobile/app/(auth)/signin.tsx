import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Mail, Lock } from "lucide-react-native";
// Note: BackButton precisaria ser migrado separadamente, aqui usaremos um placeholder ou router.back()

const SignIn = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    router.push("/home");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {/* Comportamento simplificado de BackButton */}
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backButtonText}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Entrar</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>E-mail</Text>
          <View style={styles.inputWrapper}>
            <Mail size={18} color="#71717a" style={styles.inputIcon} />
            <TextInput
              placeholder="ex. joao@exemplo.com"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Senha</Text>
          <View style={styles.inputWrapper}>
            <Lock size={18} color="#71717a" style={styles.inputIcon} />
            <TextInput
              placeholder="********"
              value={password}
              onChangeText={setPassword}
              style={styles.input}
              secureTextEntry
            />
          </View>
          <TouchableOpacity 
            onPress={() => router.push("/forgot-password")}
            style={styles.forgotPassword}
          >
            <Text style={styles.linkText}>Esqueceu a senha?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Login</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Não tem conta?{" "}
          <Text 
            style={styles.linkTextBold} 
            onPress={() => router.push("/signup")}
          >
            Cadastre-se
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
  },
  header: {
    marginTop: 24,
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
    marginBottom: 8,
  },
  form: {
    marginTop: 32,
    gap: 20,
    flex: 1,
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
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: 8,
  },
  submitButton: {
    backgroundColor: '#000000',
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    paddingBottom: 40,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#71717a',
  },
  linkText: {
    color: '#000000',
    fontWeight: '500',
  },
  linkTextBold: {
    color: '#000000',
    fontWeight: '600',
  },
});

export default SignIn;
