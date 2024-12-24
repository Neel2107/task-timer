import AnimatedButton from "@/components/Buttons/AnimatedButton";
import TaskItem from "@/components/Task/TaskItem";
import { useUserPermission } from "@/hooks/usePermisson";
import { useTasks } from "@/hooks/useTasks";
import { jsonLog } from "@/utils/helper";
import * as Notifications from "expo-notifications";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import {
  FlatList,
  RefreshControl,
  Text,
  ToastAndroid,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";



Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const TaskRoomScreen = () => {
  const {
    tasks,
    currentRoomId,
    isCreatingRoom,
    isFetchingTasks,
    isFetchingNextTask,
    createTaskRoom,
    fetchTasks,
    fetchNextTask,
  } = useTasks();

  const hasPermission = useUserPermission();

  const handleCreateRoom = async () => {

    if (!hasPermission) {
      ToastAndroid.show("Notifications are disabled!", ToastAndroid.SHORT);
      return;
    }
    try {
      const roomId = await createTaskRoom();
      if (roomId) await fetchTasks(roomId);
    } catch (error) {
      console.error("Error creating task room:", error);
      ToastAndroid.show("Failed to create task room", ToastAndroid.SHORT);

    }
  };

  const handleGetNextTask = async () => {
    if (currentRoomId) {
      try {
        await fetchNextTask(currentRoomId);
      } catch (error) {
        console.error("Error fetching next task:", error);
        ToastAndroid.show("Failed to fetch next task", ToastAndroid.SHORT);
      }
    }
  };

  const handleRefresh = async () => {
    if (currentRoomId) {
      await fetchTasks(currentRoomId);
    }
  };


  useEffect(() => {
    if (currentRoomId) fetchTasks(currentRoomId);
  }, [currentRoomId]);

  const handleLogout = async () => {
    await SecureStore.deleteItemAsync("access_token");
    await SecureStore.deleteItemAsync("refresh_token");
    ToastAndroid.show("Logged out successfully!", ToastAndroid.SHORT);
    router.replace("/login");
  };



  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar animated style="inverted" />
      <View className="p-4 flex-1">
        <Text className="text-4xl  text-text-body font-dmSansExtraBold">Task Room</Text>
        <View className="my-4">
          <Text className="font-dmSansLight">
            {currentRoomId ? `Current Room ID: ${currentRoomId}` : "No Room Created Yet"}
          </Text>
        </View>

        <View className="flex-col gap-5">

          <View>
            <AnimatedButton
              onPress={handleCreateRoom}
              isLoading={isCreatingRoom}
              text="Create Task Room"
              disabled={isCreatingRoom}
              color="bg-brand-primary"
            />
          </View>

          <View>
            <AnimatedButton
              onPress={handleGetNextTask}
              isLoading={isFetchingNextTask}
              text="Get Next Task"
              disabled={isFetchingNextTask}
              color="bg-brand-secondary"
            />
          </View>

       
        </View>


        {/* Task List */}
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          refreshControl={<RefreshControl refreshing={isFetchingTasks} onRefresh={handleRefresh} />}
          ListEmptyComponent={
            <Text className="text-center text-gray-500 mt-6">{currentRoomId ? "No tasks available." : "Create a task room first."}</Text>
          }
          renderItem={({ item }) => (
            <TaskItem task={item} />
          )}
        />

        <AnimatedButton
          onPress={handleLogout}
          text="Logout"
          color="bg-red-600"
        />
      </View>
    </SafeAreaView>
  );
};

export default TaskRoomScreen;
