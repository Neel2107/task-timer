import AnimatedButton from "@/components/Buttons/AnimatedButton";
import CustomTextInput from "@/components/Input/CustomTextInput";
import { useAuth } from "@/hooks/useAuth";
import { validateInputs } from "@/utils/helper";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Text,
  ToastAndroid,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


const LoginScreen = () => {

  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!validateInputs(username, password)) return;
    setIsLoading(true);
    try {
      await login(username, password);
      ToastAndroid.show("Login successful!", ToastAndroid.SHORT);
      router.replace("/(auth)/tasks")
    } catch (error: any) {
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="bg-white flex-1 items-center justify-center px-5 relative">
      <StatusBar style="dark" />

      <View className="flex-1 gap-4 w-full justify-center space-y-6">
        <Text
          className="text-4xl  text-center text-brand-alternative font-dmSansExtraBold font-extrabold">Welcome To Task Timer</Text>

        <Text className="text-center text-text-medium-contrast">
          Enter your login credentials to continue
        </Text>

        <View className="flex flex-col gap-4 ">
          <View className="flex-col gap-4 ">
            <View>
              <CustomTextInput
                value={username}
                onChangeText={setUsername}
                placeholder="Username"
              />
            </View>

            <View>
              <CustomTextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
                isPassword={true}
              />
            </View>
          </View>
          <View>


            <AnimatedButton
              onPress={handleLogin}
              isLoading={isLoading}
              text="Login"
              disabled={isLoading}
            />
          </View>
        </View>
      </View>


    </SafeAreaView>
  );
};

export default LoginScreen;
