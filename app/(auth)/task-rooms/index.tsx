import AnimatedButton from "@/components/Buttons/AnimatedButton";
import { logout } from "@/hooks/useAuth";
import { useNotificationPermission } from "@/hooks/usePermisson";
import { useTasks } from "@/hooks/useTasks";
import { router } from "expo-router";
import React from "react";
import { FlatList, Pressable, Text, ToastAndroid, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const TaskRooms = () => {
  const { taskRooms, isCreatingRoom, createTaskRoom } = useTasks();
  const { hasPermission } = useNotificationPermission();


  const handleCreateRoom = async () => {
    if (!hasPermission) {
      ToastAndroid.show("Notification permission denied", ToastAndroid.SHORT);
    }
    try {
      await createTaskRoom();
      ToastAndroid.show("Task Room Created!", ToastAndroid.SHORT);
    } catch (error) {
      ToastAndroid.show("Failed to create task room", ToastAndroid.SHORT);
    }
  };

  const handleNavigateToRoom = (roomId: string) => {
    router.navigate(`/task-rooms/${roomId}`);
  };



  return (
    <>

      <SafeAreaView className="flex-1 bg-white py-4">
        <Text
          onPress={logout}
          className="text-4xl font-bold px-4">Task Rooms</Text>

        <FlatList
          data={taskRooms}
          keyExtractor={(item) => item.id}
          contentContainerClassName="px-4"
          renderItem={({ item }) => (
            <Pressable
              android_ripple={{ color: "rgba(0, 0, 0, 0.2)" }}

              className="p-4 border-b border-gray-300"
              onPress={() => handleNavigateToRoom(item.id)}
            >
              <Text className="text-lg font-semibold">{item.name}</Text>
              <Text className="text-sm text-gray-500">Created At: {new Date(item.created_at).toLocaleString()}</Text>
            </Pressable>
          )}
          ListEmptyComponent={<Text className="text-center mt-6">No Task Rooms Found</Text>}
        />


        <View className="px-4">

          <AnimatedButton
            onPress={handleCreateRoom}
            isLoading={isCreatingRoom}
            text="Create New Task Room"
            color="bg-brand-primary"

          />
        </View>
      </SafeAreaView>
    </>
  );
};

export default TaskRooms;
