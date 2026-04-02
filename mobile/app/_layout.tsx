import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

// Mantém a splash screen visível enquanto o app carrega
SplashScreen.preventAutoHideAsync();

// Configuração da animação de saída da splash screen
SplashScreen.setOptions({
  duration: 500,
  fade: true,
});

export default function RootLayout() {
  useEffect(() => {
    // Esconde a splash screen após o layout estar montado
    SplashScreen.hideAsync();
  }, []);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Telas fora das Tabs (Onboarding, Welcome) */}
      <Stack.Screen name="index" />
      <Stack.Screen name="onboarding" />
      <Stack.Screen name="welcome" />

      {/* Grupo de Autenticação */}
      <Stack.Screen name="(auth)" />

      {/* O grupo das Tabs é tratado como uma única rota no Stack raiz */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      <Stack.Screen name="+not-found" />
    </Stack>
  );
}

