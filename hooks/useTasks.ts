import { useAppContext } from "@/context/AppContext";
import { CREATE_TASK_ROOM, GET_NEXT_TASK, GET_TASKS } from "@/utils/apis";
import api from "@/utils/axios";
import { scheduleTaskNotification } from "@/utils/helper";
import { Task, TaskRoom } from "@/utils/types";
import { useState } from "react";

export const useTasks = () => {
  const { taskRooms, setTaskRooms} = useAppContext()
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentRoomId, setCurrentRoomId] = useState<string | null>(null);
  const [isCreatingRoom, setIsCreatingRoom] = useState(false);
  const [isFetchingTasks, setIsFetchingTasks] = useState(false);
  const [isFetchingNextTask, setIsFetchingNextTask] = useState(false);

  const createTaskRoom = async (): Promise<TaskRoom> => {
    try {
      setIsCreatingRoom(true);
      const response = await api.get(CREATE_TASK_ROOM);
      const room: TaskRoom = { id: response.data.id, name: `Room ${response.data.id}`, created_at: new Date().toISOString() };
      setTaskRooms((prevRooms) => [...prevRooms, room]); 
      setCurrentRoomId(room.id);
      setTasks([]);
      return room;
    } catch (error) {
      console.error("Failed to create task room:", error);
      throw new Error("Failed to create task room");
    } finally {
      setIsCreatingRoom(false);
    }
  };

  const fetchTasks = async (roomId: string): Promise<Task[]> => {
    try {
      setIsFetchingTasks(true);
      const response = await api.get<Task[]>(GET_TASKS(roomId));
      setTasks(response.data);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
      throw new Error("Failed to fetch tasks");
    } finally {
      setIsFetchingTasks(false);
    }
  };

  const fetchNextTask = async (roomId: string): Promise<Task> => {

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

  
  return {
    tasks,
    taskRooms, 
    currentRoomId,
    isCreatingRoom,
    isFetchingTasks,
    isFetchingNextTask,
    createTaskRoom,
    fetchTasks,
    fetchNextTask,
  };
};
