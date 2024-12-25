import AnimatedButton from "@/components/Buttons/AnimatedButton";
import ItemComponent from "@/components/Item/ItemComponent";
import Skeleton from "@/components/Skeleton/Skeleton";
import { useNotificationPermission } from "@/hooks/usePermisson";
import { useTasks } from "@/hooks/useTasks";
import EmptyList from "@assets/images/empty-list.svg";
import { FontAwesome6 } from "@expo/vector-icons";
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
            await fetchNextTask(room);
        }
    };

    const isInitialLoading = isFetchingTasks && tasks.length === 0;

    return (
        <>
            <SafeAreaView className="flex-1 bg-default_bg pt-4 ">
                <View className="flex-row items-center gap-4 px-4">
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => router.back()}
                    >
                        <FontAwesome6 name="chevron-left" size={24} color="black" />
                    </TouchableOpacity>
                    <Text className="text-2xl font-dmSansExtraBold ">Room: {room}</Text>
                </View>
                {isInitialLoading ?
                    <View className="flex-1 pt-14 flex-col gap-5 px-4">
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
                        contentContainerClassName="mt-5 gap-3 pb-10"
                        refreshControl={
                            <RefreshControl
                                refreshing={isFetchingTasks}
                                onRefresh={() => fetchTasks(room)}
                                colors={["#7461c3"]}
                            />
                        }
                        ListEmptyComponent={<View className="flex-col items-center justify-center gap-4">
                            <EmptyList width={250} height={250} />
                            <Text className="text-center mt-6 font-dmSansRegular text-zinc-500">No Tasks Found</Text>

                        </View>
                        }
                        renderItem={({ item }) => (
                            <ItemComponent
                                item={{
                                    id: item.id,
                                    title: item.title,
                                    starts_at: item.starts_at,
                                }}
                            />
                        )}
                    />}

                <View className="p-4" >
                    <AnimatedButton
                        onPress={handleGetNextTask}
                        isLoading={isFetchingNextTask}
                        text={tasks.length === 0 ? "Get First Task" : "Get Next Task"}
                        color="bg-brand-primary"
                        disabledColor="bg-brand-disabled_primary"
                        className="rounded-2xl py-4"
                    />
                </View>

            </SafeAreaView>
        </>
    );
};

export default RoomScreen;
