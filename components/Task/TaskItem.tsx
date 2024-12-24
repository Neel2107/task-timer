
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
            className="border-b border-detail-medium-contrast py-4"
        >
            <Text className="text-lg font-medium">{task.title}</Text>
            <Text className="text-sm text-text-medium-contrast">
                Starts At: {format(new Date(task.starts_at), "PPpp")}
            </Text>

        </View>
    )
}

export default TaskItem