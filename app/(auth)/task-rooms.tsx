import AnimatedButton from "@/components/Buttons/AnimatedButton";
import { logout } from "@/hooks/useAuth";
import { useNotificationPermission } from "@/hooks/usePermisson";
import { useTasks } from "@/hooks/useTasks";
import { Entypo } from "@expo/vector-icons";
import { format } from "date-fns";
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
    router.navigate(`/(auth)/${roomId}`);
  };



  return (
    <>

      <SafeAreaView className="flex-1 bg-white py-4 relative">
        <Text
          onPress={logout}
          className="text-4xl font-bold px-4">Task Rooms</Text>

        <FlatList
          data={taskRooms}
          keyExtractor={(item) => item.id}
          contentContainerClassName="px-4"
          renderItem={({ item }) => (
            <Pressable
              className="py-4 border-b border-gray-300"
              onPress={() => handleNavigateToRoom(item.id)}
            >
              <Text className="text-lg font-medium font-dmSansBold">{item.id}</Text>
              <Text className="text-sm text-gray-500 font-dmSansRegular">Created At: {format(new Date(item.created_at), "PPpp")}</Text>
            </Pressable>
          )}
          ListEmptyComponent={<Text className="text-center mt-6 font-semibold font-dmSansMedium">No Task Rooms Found</Text>}
        />

        <View className=" absolute bottom-12 right-14">
          <AnimatedButton
            onPress={handleCreateRoom}
            isLoading={isCreatingRoom}
            color="bg-brand-primary"
            disabledColor="bg-brand-primary/40"
            className=" px-4 py-4 rounded-full "
            icon={<Entypo name="plus" size={24} color="white" />}

          />
        </View>


      </SafeAreaView>
    </>
  );
};

export default TaskRooms;
