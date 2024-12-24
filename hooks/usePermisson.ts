import * as Notifications from "expo-notifications";
import { useEffect, useState } from "react";

export const useUserPermission = () => {
  const [hasPermission, setHasPermission] = useState(false);

  const checkPermission = async () => {
    const { status } = await Notifications.getPermissionsAsync();
    if (status === "granted") {
      setHasPermission(true);
    } else {
      const { status: requestStatus } = await Notifications.requestPermissionsAsync();
      setHasPermission(requestStatus === "granted");
    }
  };
  useEffect(() => {
    checkPermission();
  }, []);

  return hasPermission;
};
