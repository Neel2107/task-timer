import AnimatedButton from "@/components/Buttons/AnimatedButton";
import CustomTextInput from "@/components/Input/CustomTextInput";
import { useAuth } from "@/hooks/useAuth";
import { GITHUB_PROFILE_URL } from "@/utils/constants";
import { validateInputs } from "@/utils/helper";
import TaskLogo from "@assets/images/plan.svg";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Linking,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { SafeAreaView } from "react-native-safe-area-context";

const LoginScreen = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();

  const handleLogin = async () => {
    if (!validateInputs(username, password)) return;

    setIsLoading(true);
    try {

      await login(username, password);
      ToastAndroid.show("Login successful!", ToastAndroid.SHORT);
      router.replace("/(auth)/task-rooms")

    } catch (error: any) {
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const openGithubProfile = () => {
    Linking.openURL(GITHUB_PROFILE_URL)
  }

  return (
    <SafeAreaView className="bg-white flex-1 flex-col">
      <KeyboardAwareScrollView
        bottomOffset={350}
        keyboardShouldPersistTaps="always"
      >
        <View className="flex items-center justify-center py-10 ">
          <TaskLogo height={250} width={250} />
        </View>
        <View className=" flex-1 flex-col justify-center gap-4 w-full px-4">
          <Text className="text-5xl font-dmSansExtraBold ">Welcome To Task Timer</Text>

          <Text className="text-text-medium-contrast font-dmSansMedium">
            Enter your login credentials to continue
          </Text>

          <View className="flex flex-col gap-6">
            <View className="flex-col gap-4 ">
              <View >
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

            <View className="pb-4">
              <AnimatedButton
                onPress={handleLogin}
                isLoading={isLoading}
                text="Login"
                color="bg-brand-primary"
                disabledColor="bg-brand-disabled_primary"
                disabled={isLoading}
                textClassName="font-dmSansExtraBold"
                className="rounded-2xl py-4 "
              />
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
      <View className="flex-1   flex-row items-center justify-center gap-1">
        <Text className="text-center font-dmSansMedium">
          Developed By
        </Text>
        <TouchableOpacity activeOpacity={0.7} onPress={openGithubProfile}>
          <Text className="font-dmSansBold underline text-brand-primary">Neel Patel</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView >
  );
};

export default LoginScreen;
