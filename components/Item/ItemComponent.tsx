import { format } from "date-fns";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

interface ItemProps {
  item: {
    id: string;
    title?: string;
    starts_at?: string;
    created_at?: string;
  };
  index?: number;
  onPress?: () => void;
}

const ItemComponent: React.FC<ItemProps> = ({ item, index, onPress }) => {
  const isRoom = !!item?.created_at;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      className="flex-col gap-2 p-3 mx-2 bg-white/60 rounded-2xl"
      onPress={onPress}
    >
      {isRoom ? (
        <>
          <Text className="text-lg font-medium font-dmSansBold">
            Room No: {index !== undefined ? index + 1 : ""} ({item.id})
          </Text>
          <Text className="text-sm text-gray-500 font-dmSansRegular">
            Created At: {item.created_at ? format(new Date(item.created_at), "PPpp") : "N/A"}
          </Text>
        </>
      ) : (
        <>
          <Text className="text-lg font-medium font-dmSansBold">{item.title}</Text>
          <Text className="text-sm text-gray-500 font-dmSansRegular">
            Starts At: {item.starts_at ? format(new Date(item.starts_at), "PPpp") : "N/A"}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};

export default ItemComponent;
