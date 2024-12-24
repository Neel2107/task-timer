import useAuthStatus from "@/hooks/useAuthStatus";
import { Redirect } from "expo-router";
import { SafeAreaView } from "react-native";

export default function RootPage() {
  const { isAuthenticated } = useAuthStatus();

  return (
    <SafeAreaView className=" flex-1 items-center justify-center">
      {isAuthenticated === null ? (
        <>
        </>
      ) : isAuthenticated ? (
        <Redirect href={"/(auth)/task-rooms"} />
      ) : (
        <Redirect href={"/login"} />
      )}
    </SafeAreaView>
  );
}
