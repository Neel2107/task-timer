import { Alert, ToastAndroid } from "react-native";  import * as Notifications from "expo-notifications";
import { Task } from "./types";


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


 export  const scheduleTaskNotification = async (task: Task) => {
    const { title, starts_in } = task;
    if (!starts_in?.seconds) return;
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Task Reminder",
          body: `Your task "${title}" is starting soon!`,
          data: { task },
          sound: "default",
          categoryIdentifier: "task-actions",
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
          seconds: starts_in.seconds,
        },
      });
    } catch (error) {
      console.error("Failed to schedule notification:", error);
    }
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

  