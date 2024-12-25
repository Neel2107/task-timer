import { LOGIN } from "@/utils/apis";
import axios from "axios";
import * as Notifications from "expo-notifications";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";

export const useAuth = () => {
  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post(LOGIN, { username, password });
      const { access_token, refresh_token } = response.data;

      await SecureStore.setItemAsync("access_token", access_token);
      await SecureStore.setItemAsync("refresh_token", refresh_token);

      return response.data;
    } catch (error: any) {
      const message = error?.message || "Login failed";
      throw new Error(message);
    }
  };

    const logout = async () => {
    await Notifications.dismissAllNotificationsAsync();

    await SecureStore.deleteItemAsync("access_token");
    await SecureStore.deleteItemAsync("refresh_token");
    await SecureStore.deleteItemAsync("taskRooms");
  
    router.replace("/login");
  };
  return { login, logout };
};


