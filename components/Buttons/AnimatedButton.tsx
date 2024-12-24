import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, Vibration } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";

interface AnimatedButtonProps {
  onPress: () => void;
  isLoading?: boolean;
  text: string;
  disabled?: boolean;
  color?: string; // Dynamic color for background
  className?: string; // Additional Tailwind classes
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  onPress,
  isLoading = false,
  text,
  disabled = false,
  color = "bg-brand-primary", // Default color
  className = "",
}) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <TouchableOpacity
      disabled={disabled || isLoading}
      activeOpacity={1}
      onPress={onPress}
      onPressIn={() => {
        scale.value = withTiming(0.975, { duration: 200 });
      }}
      onPressOut={() => {
        Vibration.vibrate(15);
        scale.value = withSpring(1, {
          damping: 10,
          stiffness: 150,
        });
      }}
    >
      <Animated.View
        style={animatedStyle}
        className={`w-full rounded-xl py-3 items-center justify-center ${disabled || isLoading ? "bg-gray-400" : color
          } ${className}`}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#FFFFFF" />
        ) : (
          <Text className="text-white font-medium text-base">{text}</Text>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};

export default AnimatedButton;
