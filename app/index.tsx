import useAuthStatus from "@/hooks/useAuthStatus";
import { BRAND_PRIMARY } from "@/utils/constants";
import { Redirect } from "expo-router";
import { ActivityIndicator, SafeAreaView } from "react-native";

export default function RootPage() {
  const { isAuthenticated } = useAuthStatus();

  return (
    <SafeAreaView className=" flex-1 items-center justify-center bg-brand-primary">
      {isAuthenticated === null ? (
        <>
        <ActivityIndicator size="large" color={BRAND_PRIMARY} />
        </>
      ) : isAuthenticated ? (
        <Redirect href={"/(auth)/task-rooms"} />
      ) : (
        <Redirect href={"/login"} />
      )}
    </SafeAreaView>
  );
}
