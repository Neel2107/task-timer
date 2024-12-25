import ItemComponent from "@/components/Item/ItemComponent";
import { useAuth } from "@/hooks/useAuth";
import { useNotificationPermission } from "@/hooks/usePermisson";
import { useTasks } from "@/hooks/useTasks";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { ActivityIndicator, FlatList, ImageBackground, Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const TaskRooms = () => {
  const { taskRooms, isCreatingRoom, createTaskRoom } = useTasks();
  const { hasPermission } = useNotificationPermission();
  const { logout } = useAuth();

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

      <SafeAreaView className="flex-1 bg-[#e6e6e6] pt-4 relative">
        <ImageBackground
          source={require("@assets/images/tasks-bg.png")}
          className="h-60 absolute -top-36 left-0 right-0 "
        />
        <Text
          onPress={logout}
          className="text-4xl font-bold px-4 text-start">Task Rooms</Text>

        <FlatList
          data={taskRooms}
          keyExtractor={(item) => item.id}
          contentContainerClassName=" mt-5 gap-3 pb-20"
          renderItem={({ item, index }) => (
            <ItemComponent
              item={{
                id: item.id,
                title: `Room No: ${index + 1}`,
                created_at: item.created_at,
              }}
              index={index}
              onPress={() => handleNavigateToRoom(item.id)}
            />
          )}
          ListEmptyComponent={<Text className="text-center mt-6 font-semibold font-dmSansMedium">No Task Rooms Found</Text>}
        />

        <View className=" absolute bottom-12 right-12">
          <TouchableOpacity
            onPress={handleCreateRoom}
            style={{ elevation: 5 }}
            activeOpacity={0.8}
            className={` px-4 py-4 rounded-full ${isCreatingRoom ? "bg-brand-disabled_primary" : "bg-brand-primary"} `}>
            {isCreatingRoom ? <ActivityIndicator size={24} color="#FFFFFF" /> :
              <AntDesign name="plus" size={24} color="white" />}
          </TouchableOpacity>

        </View>


      </SafeAreaView>
    </>
  );
};

export default TaskRooms;
