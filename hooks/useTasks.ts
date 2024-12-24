import { CREATE_TASK_ROOM, GET_NEXT_TASK, GET_TASKS } from "@/utils/apis";
import api from "@/utils/axios";
import { Task } from "@/utils/types";
import * as Notifications from "expo-notifications";
import { useState } from "react";
import { ToastAndroid } from "react-native";

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentRoomId, setCurrentRoomId] = useState<string | null>(null);
  const [isCreatingRoom, setIsCreatingRoom] = useState(false);
  const [isFetchingTasks, setIsFetchingTasks] = useState(false);
  const [isFetchingNextTask, setIsFetchingNextTask] = useState(false);

  const createTaskRoom = async (): Promise<string> => {
    try {
      setIsCreatingRoom(true);
      const response = await api.get(CREATE_TASK_ROOM);
      const roomId = response.data.id;
      setCurrentRoomId(roomId);
      setTasks([]); 
      return roomId;
    } catch (error) {
      console.error("Failed to create task room:", error);
      throw new Error("Failed to create task room");
    } finally {
      setIsCreatingRoom(false);
    }
  };

  const fetchTasks = async (roomId: string): Promise<any[]> => {
    try {
      setIsFetchingTasks(true);
      const response = await api.get<Task[]>(GET_TASKS(roomId))
      setTasks(response.data);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
      throw new Error("Failed to fetch tasks");
    } finally {
      setIsFetchingTasks(false);
    }
  };

  const fetchNextTask = async (roomId: string): Promise<any> => {
    try {
      setIsFetchingNextTask(true);
      const response = await api.get<Task>(GET_NEXT_TASK(roomId));
      const nextTask = response.data;

      if (nextTask) {

        await scheduleTaskNotification(nextTask);
        await fetchTasks(roomId); 
      }

      return nextTask;
    } catch (error) {
      console.error("Failed to fetch next task:", error);
      throw new Error("Failed to fetch next task");
    } finally {
      setIsFetchingNextTask(false);
    }
  };

  const scheduleTaskNotification = async (task: any) => {
    const { title, starts_in } = task;

    if (!starts_in?.seconds) {
      console.error("Invalid task starts_in duration:", task);
      ToastAndroid.show("Oops! something went wrong", ToastAndroid.SHORT);
      return;
    }

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
      throw new Error("Failed to schedule notification");
    }
  };

  const clearTasks = () => {
    setTasks([]);
    setCurrentRoomId(null);
  };

  return {
    tasks,
    currentRoomId,
    isCreatingRoom,
    isFetchingTasks,
    isFetchingNextTask,
    createTaskRoom,
    fetchTasks,
    fetchNextTask,
    clearTasks,
  };
};
