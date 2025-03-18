import { store } from '@/Store/store';
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import { Alice_400Regular, useFonts } from "@expo-google-fonts/alice";


SplashScreen.preventAutoHideAsync();
export default function RootLayout() {

  const [fontsLoaded] = useFonts({
    Alice_400Regular
  });

  if (!fontsLoaded) {
    return null;
  }

  return <Provider store={store}>
    <StatusBar hidden={false} />
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
    </Stack>
    <Toast />
  </Provider>
}
