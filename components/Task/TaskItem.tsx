
import { format } from 'date-fns';
import React from 'react';
import { Text, View } from 'react-native';

interface TaskItemProps {
    task: {
        id: string;
        title: string;
        starts_at: string;
    }
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
    return (
        <View
            className="border-b border-zinc-300 py-4"
        >
            <Text className="text-lg font-medium font-dmSansBold">{task.title}</Text>
            <Text className="text-sm text-gray-500 font-dmSansRegular">
                Starts At: {format(new Date(task.starts_at), "PPpp")}
            </Text>
        </View>
    )
}

export default TaskItem