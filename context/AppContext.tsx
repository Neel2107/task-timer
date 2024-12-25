import { Task, TaskRoom } from "@/utils/types";
import React, { ReactNode, useContext, useState } from "react";


interface AppContextType {


  taskRooms: TaskRoom[];  
  setTaskRooms: React.Dispatch<React.SetStateAction<TaskRoom[]>>;
}

const AppContext = React.createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {

 
  const [taskRooms, setTaskRooms] = useState<TaskRoom[]>([]);

  const value = {

    taskRooms,
    setTaskRooms
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within a AppProvider");
  }
  return context;
}
