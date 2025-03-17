import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { store } from '@/Store/store'
import { Provider } from 'react-redux'
import Toast from 'react-native-toast-message';
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();
export default function RootLayout() {

  return <SafeAreaProvider>
    <Provider store={store}>
      <StatusBar hidden />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
      </Stack>
      <Toast />
    </Provider>
  </SafeAreaProvider>
}
