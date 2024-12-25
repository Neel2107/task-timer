import { TaskRoom } from "@/utils/types";
import * as SecureStore from "expo-secure-store";
import React, { ReactNode, useContext, useEffect, useState } from "react";

interface AppContextType {
  taskRooms: TaskRoom[];
  setTaskRooms: React.Dispatch<React.SetStateAction<TaskRoom[]>>;
  loadTaskRooms: () => Promise<void>; // Function to load rooms on startup
}

const AppContext = React.createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [taskRooms, setTaskRooms] = useState<TaskRoom[]>([]);


  const SECURE_STORE_KEY = "taskRooms";

  useEffect(() => {
    const saveTaskRooms = async () => {
      try {
        await SecureStore.setItemAsync(SECURE_STORE_KEY, JSON.stringify(taskRooms));
      } catch (error) {
        console.error("Failed to save task rooms to SecureStore:", error);
      }
    };

    if (taskRooms.length > 0) {
      saveTaskRooms();
    }
  }, [taskRooms]);

  const loadTaskRooms = async () => {
    try {
      const storedRooms = await SecureStore.getItemAsync(SECURE_STORE_KEY);
      if (storedRooms) {
        setTaskRooms(JSON.parse(storedRooms));
      }
    } catch (error) {
      console.error("Failed to load task rooms from SecureStore:", error);
    }
  };

  useEffect(() => {
    loadTaskRooms();
  }, []);

  const value = {
    taskRooms,
    setTaskRooms,
    loadTaskRooms,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}
