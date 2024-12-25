import AnimatedButton from "@/components/Buttons/AnimatedButton";
import CustomTextInput from "@/components/Input/CustomTextInput";
import { useAuth } from "@/hooks/useAuth";
import { validateInputs } from "@/utils/helper";
import TaskLogo from "@assets/images/plan.svg";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Text,
  ToastAndroid,
  View
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
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
      router.replace("/(auth)/task-rooms")

    } catch (error: any) {
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="bg-white flex-1 flex-col">
      <KeyboardAwareScrollView
        bottomOffset={350}
        keyboardShouldPersistTaps="always"
      >
        <View className="flex items-center justify-center py-10  ">
          <TaskLogo height={250} width={250} />
        </View>
        <View className=" flex-1 ite  flex-col justify-center    gap-4 w-full px-4">
          <Text className="text-5xl   font-dmSansExtraBold ">Welcome To Task Timer</Text>

          <Text className="text-text-medium-contrast font-dmSansMedium">
            Enter your login credentials to continue
          </Text>

          <View className="flex flex-col gap-4">
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
                disabledColor="bg-brand-primary/40"
                disabled={isLoading}
                textClassName="font-dmSansExtraBold"
                className="rounded-2xl py-4 "
              />
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>



    </SafeAreaView >
  );
};

export default LoginScreen;
