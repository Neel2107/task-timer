import { Alert, ToastAndroid } from "react-native";  import * as Notifications from "expo-notifications";


export const jsonLog = (data: any) => {
    console.log(JSON.stringify(data, null, 2));
}


export const validateInputs = (username: string, password: string): boolean => {
    const usernameRegex = /^[a-zA-Z0-9_.-]+$/;
    const minPasswordLength = 6;
  
    if (!username.trim() || !password.trim()) {
      ToastAndroid.show("Both fields are required!", ToastAndroid.SHORT);
      return false;
    }
  
    if (!usernameRegex.test(username)) {
      Alert.alert("Validation Error", "Username can only contain letters, numbers, dots, underscores, or hyphens.");
      return false;
    }
  
    if (password.length < minPasswordLength) {
      Alert.alert("Validation Error", `Password must be at least ${minPasswordLength} characters long.`);
      return false;
    }
  
    return true;
  };




  export const setupNotificationCategories = async () => {
    try {
      await Notifications.setNotificationCategoryAsync("task-actions", [
        {
          identifier: "done",
          buttonTitle: "Done",
          options: { opensAppToForeground: true }, 
        },
        {
          identifier: "skip",
          buttonTitle: "Skip",
          options: { opensAppToForeground: true }, 
        },
      ]);
      // console.log("Notification category 'task-actions' set up successfully.");
    } catch (error) {
      console.error("Failed to set up notification categories", error);
    }
  };
  
  