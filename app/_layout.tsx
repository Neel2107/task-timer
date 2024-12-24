import useAuthStatus from "@/hooks/useAuthStatus";
import { useNotificationResponseHandler } from "@/hooks/useNotificationResponseHandler";
import { setupNotificationCategories } from "@/utils/helper";
import { useFonts } from "expo-font";
import { SplashScreen, Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "../global.css";

export { ErrorBoundary } from "expo-router";

SplashScreen.preventAutoHideAsync();

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
        router.replace("/(auth)/tasks");
      } else {
        router.replace("/login");
      }
    }
  }, [loaded, isAuthenticated]);

  useEffect(() => {
    setupNotificationCategories()
  }, [])


  if (!loaded || isAuthenticated === null) {
    return <ActivityIndicator
      color={"#000"}
    />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="index" />
      <Stack.Screen name="login" />
    </Stack>
  );
};

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <InitialLayout />
    </GestureHandlerRootView>
  );
}
