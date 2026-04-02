import React, { useState, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const CODE_LENGTH = 6;

const EnterCode = () => {
  const router = useRouter();
  const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(""));
  const inputs = useRef<(TextInput | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const next = [...code];
    next[index] = value.slice(-1);
    setCode(next);
    
    if (value && index < CODE_LENGTH - 1) {
      inputs.current[index + 1]?.focus();
    } else if (!value && index > 0) {
      // Bug fix: Se o valor foi deletado, move o foco para o anterior imediatamente
      // Isso evita a necessidade de clicar 2x no backspace
      inputs.current[index - 1]?.focus();
    }
  };

  const handleKeyPress = (index: number, key: string) => {
    if (key === "Backspace" && !code[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = () => {
    router.push("/home");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backButtonText}>{"<"}</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Insira o Código</Text>
        <Text style={styles.subtitle}>
          Enviamos um código para <Text style={styles.boldText}>joao@exemplo.com</Text>, digite-o para continuar.
        </Text>

        <View style={styles.otpContainer}>
          {code.map((digit, i) => (
            <TextInput
              key={i}
              ref={(el) => {
                inputs.current[i] = el;
              }}
              style={styles.otpInput}
              keyboardType="number-pad"
              maxLength={1}
              value={digit}
              onChangeText={(val) => handleChange(i, val)}
              onKeyPress={({ nativeEvent }) => handleKeyPress(i, nativeEvent.key)}
            />
          ))}
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Confirmar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
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
  subtitle: {
    fontSize: 14,
    color: '#71717a',
    lineHeight: 20,
  },
  boldText: {
    color: '#000000',
    fontWeight: '500',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginTop: 32,
    marginBottom: 32,
  },
  otpInput: {
    width: 42,
    height: 56,
    borderRadius: 12,
    backgroundColor: '#f4f4f5',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
  },
  submitButton: {
    backgroundColor: '#000000',
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default EnterCode;
