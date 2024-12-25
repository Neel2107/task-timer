import { AppProvider } from "@/context/AppContext";
import useAuthStatus from "@/hooks/useAuthStatus";
import { useNotificationResponseHandler } from "@/hooks/useNotificationResponseHandler";
import { setupNotificationCategories, setupNotificationChannel } from "@/utils/helper";
import { useFonts } from "expo-font";
import * as Notifications from "expo-notifications";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";


import "../global.css";

export { ErrorBoundary } from "expo-router";

SplashScreen.preventAutoHideAsync();

SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const InitialLayout = () => {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    DMSansLight: require("../assets/fonts/DMSans-Light.ttf"),
    DMSansRegular: require("../assets/fonts/DMSans-Regular.ttf"),
    DMSansMedium: require("../assets/fonts/DMSans-Medium.ttf"),
    DMSansBold: require("../assets/fonts/DMSans-Bold.ttf"),
    DMSansExtraBold: require("../assets/fonts/DMSans-ExtraBold.ttf"),

  });
  const { isAuthenticated } = useAuthStatus()

  const router = useRouter();

  useNotificationResponseHandler();

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded && isAuthenticated !== null) {
      SplashScreen.hideAsync();
      if (isAuthenticated) {
        router.replace("/(auth)/task-rooms");
      } else {
        router.replace("/login");
      }
    }
  }, [loaded, isAuthenticated]);

  useEffect(() => {
    const initializeNotifications = async () => {
      await setupNotificationCategories();
      await setupNotificationChannel();
    };
  
    initializeNotifications();
  }, []);
  


  if (!loaded || isAuthenticated === null) {
    return (<View className="flex-1 flex items-center justify-center bg-brand-primary">
      <ActivityIndicator
        color={"#ffffff"}
      />
    </View>)
  }

  return (
    <>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
      </Stack>
    </>
  );
};

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <KeyboardProvider>
        <AppProvider>
          <InitialLayout />
        </AppProvider>
      </KeyboardProvider>
    </GestureHandlerRootView>
  );
}
