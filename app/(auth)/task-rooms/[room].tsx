import AnimatedButton from "@/components/Buttons/AnimatedButton";
import Skeleton from "@/components/Skeleton/Skeleton";
import TaskItem from "@/components/Task/TaskItem";
import { useNotificationPermission } from "@/hooks/usePermisson";
import { useTasks } from "@/hooks/useTasks";
import { Entypo } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import { FlatList, RefreshControl, Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const RoomScreen = () => {
    const { room } = useLocalSearchParams<{
        room: string;
    }>();
    const {
        tasks,
        isFetchingTasks,
        isFetchingNextTask,
        fetchTasks,
        fetchNextTask,
    } = useTasks();
    const { hasPermission } = useNotificationPermission()

    useEffect(() => {
        if (room) fetchTasks(room);
    }, [room]);

    const handleGetNextTask = async () => {
        if (!hasPermission) {
            ToastAndroid.show("Notification permission denied", ToastAndroid.SHORT);
        }

        if (room) {
            await fetchNextTask(room as string);
        }
    };

    const isInitialLoading = isFetchingTasks && tasks.length === 0;

    return (
        <>
            <SafeAreaView className="flex-1 bg-white p-4">
                <View className="flex-row items-center gap-4">
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => router.back()}
                    >
                        <Entypo name="chevron-thin-left" size={24} color="black" />
                    </TouchableOpacity>
                    <Text className="text-2xl font-bold">Room: {room}</Text>
                </View>
                {isInitialLoading ?
                    <View className="flex-1 pt-5 flex-col gap-5">
                        {[...Array(5)].map((_, index) => (
                            <Skeleton
                                key={index}
                                style={{
                                    height: 80,
                                    width: "100%",
                                    borderRadius: 8,
                                }}
                            />
                        ))}
                    </View>
                    : <FlatList
                        data={tasks}
                        className="flex-1"
                        keyExtractor={(item) => item.id}
                        refreshControl={
                            <RefreshControl
                                refreshing={isFetchingTasks && tasks.length > 0}
                                onRefresh={() => fetchTasks(room as string)}
                            />
                        }
                        ListEmptyComponent={
                            <Text className="text-center mt-6">No Tasks Found</Text>
                        }
                        renderItem={({ item }) => <TaskItem task={item} />}
                    />}

                <AnimatedButton
                    onPress={handleGetNextTask}
                    isLoading={isFetchingNextTask}
                    text="Get Next Task"
                    color="bg-brand-secondary"
                />

            </SafeAreaView>
        </>
    );
};

export default RoomScreen;
