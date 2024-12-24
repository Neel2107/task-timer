import * as Notifications from "expo-notifications";
import { useEffect } from "react";

export const useNotificationResponseHandler = () => {
  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        const { actionIdentifier, notification } = response;
        const notificationId = notification.request.identifier;

        if (actionIdentifier === "done") {
          Notifications.dismissNotificationAsync(notificationId);
          console.log("Task marked as done");
        } else if (actionIdentifier === "skip") {
          Notifications.dismissNotificationAsync(notificationId);
          console.log("Task skipped");
        }
      }
    );

    return () => {
      subscription.remove();
    };
  }, []);
};
