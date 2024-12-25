import * as Notifications from "expo-notifications";
import { Platform, ToastAndroid } from "react-native";
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
      ToastAndroid.show("Username can only contain letters, numbers, dots, underscores, or hyphens.", ToastAndroid.SHORT);
      return false;
    }
  
    if (password.length < minPasswordLength) {
      ToastAndroid.show(`Password must be at least ${minPasswordLength} characters long.`, ToastAndroid.SHORT);
      return false;
    }
  
    return true;
  };


  export const scheduleTaskNotification = async (task: Task) => {
    const { title, starts_in } = task;
  
    if (!starts_in) {
      console.error("Invalid 'starts_in' object:", starts_in);
      return;
    }
  
    // Calculate total seconds from the current time
    const totalSeconds =
      (starts_in.days || 0) * 86400 +
      (starts_in.hours || 0) * 3600 +
      (starts_in.minutes || 0) * 60 +
      (starts_in.seconds || 0);
  
    if (totalSeconds <= 0) {
      console.error("Invalid or past time for notification:", totalSeconds);
      return;
    }
  
    console.log("Total seconds to notification:", totalSeconds);
  
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
          seconds: totalSeconds, 
          type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        },
      });
  
      console.log(`Notification scheduled for task "${title}" after ${totalSeconds} seconds.`);
    } catch (error) {
      console.error("Failed to schedule notification:", error);
    }
  };
  

  export const setupNotificationChannel = async () => {
    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("task-reminders", {
        name: "Task Reminders",
        importance: Notifications.AndroidImportance.HIGH,
        sound: "default",
        description: "Notifications for upcoming tasks",
        vibrationPattern: [0, 250, 250, 250],
        enableVibrate: true,
      });
      console.log("Notification channel 'task-reminders' set up successfully.");
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
      console.log("Notification category 'task-actions' set up successfully.");
    } catch (error) {
      console.error("Failed to set up notification categories:", error);
    }
  };

  