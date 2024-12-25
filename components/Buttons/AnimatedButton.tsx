import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, Vibration } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";

interface AnimatedButtonProps {
  onPress: () => void;
  isLoading?: boolean;
  text?: string;
  disabled?: boolean;
  color?: string;
  className?: string;
  icon?: React.ReactNode;
  disabledColor?: string;
  textClassName?: string;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  onPress,
  isLoading = false,
  text,
  disabled = false,
  color = "bg-brand-primary",
  className = "",
  disabledColor = "bg-gray-400",
  icon,
  textClassName,
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
        Vibration.vibrate(15);
        scale.value = withTiming(0.965, { duration: 200 });
      }}
      onPressOut={() => {
        scale.value = withSpring(1, {
          damping: 10,
          stiffness: 150,
        });
      }}
    >
      <Animated.View
        style={animatedStyle}
        className={`w-full  py-3 items-center justify-center ${disabled || isLoading ? disabledColor : color
          } ${className} `}
      >
        {isLoading ? (
          <ActivityIndicator size={24} color="#FFFFFF" />
        ) : (
          <>
            {icon ? icon : <Text className={`text-white font-medium text-lg ${textClassName}`}>{text}</Text>}
          </>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};

export default AnimatedButton;
