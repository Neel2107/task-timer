import * as Notifications from "expo-notifications";
import { useEffect } from "react";

export const useNotificationResponseHandler = () => {
  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(async (response) => {
      try {
        const actionId = response.actionIdentifier;
        const { taskId } = response.notification.request.content.data;
        
        if (actionId === 'done' || actionId === 'skip') {
          // Cancel scheduled notification
          const scheduledNotifications = await Notifications.getAllScheduledNotificationsAsync();
          for (const notification of scheduledNotifications) {
            if (notification.content.data?.taskId === taskId) {
              await Notifications.cancelScheduledNotificationAsync(notification.identifier);
            }
          }
          
          // Dismiss the current notification
          await Notifications.dismissNotificationAsync(response.notification.request.identifier);
          
          console.log(`Task ${actionId === 'done' ? 'marked as done' : 'skipped'}`);
        }
      } catch (error) {
        console.error('Error handling notification response:', error);
      }
    });

    return () => subscription.remove();
  }, []);
};