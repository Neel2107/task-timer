import * as Notifications from 'expo-notifications';
import { ToastAndroid } from "react-native";
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

export const scheduleTaskNotification = async (task: Task) => {
    const { title, starts_in } = task;
  
    if (!starts_in) {
      console.error("Invalid 'starts_in' object:", starts_in);
      return;
    }
  
    // Calculate total seconds
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
      // Cancel any existing notification with the same ID
      await Notifications.cancelScheduledNotificationAsync(task.id);
  
      // Schedule the notification
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Task Reminder",
          body: `Your task "${title}" is starting soon!`,
          data: { task },
          sound: "default",
          categoryIdentifier: "task-actions",
        },
        trigger: {
          seconds: totalSeconds, // Schedule after calculated time
          type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
          repeats: false, // Ensure it does not repeat
        },
      });
  
      console.log(`Notification scheduled for task "${title}" after ${totalSeconds} seconds.`);
    } catch (error) {
      console.error("Failed to schedule notification:", error);
    }
  };