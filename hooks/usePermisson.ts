import * as Notifications from "expo-notifications";
import { useEffect, useState } from "react";

export const useNotificationPermission = () => {
  const [hasPermission, setHasPermission] = useState<boolean>(false);

  const checkPermission = async () => {
    try {
      const { status } = await Notifications.getPermissionsAsync();
      if (status === "granted") {
        setHasPermission(true);
      } else {
        const { status: requestStatus } = await Notifications.requestPermissionsAsync();
        setHasPermission(requestStatus === "granted");
      }
    } catch (error) {
      console.error("Failed to check or request notification permissions:", error);
      setHasPermission(false);
    }
  };

  useEffect(() => {
    checkPermission();
  }, []);

  return { hasPermission, checkPermission };
};
