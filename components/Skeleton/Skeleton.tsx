import { LinearGradient } from "expo-linear-gradient";
import React, { useCallback, useEffect, useState } from "react";
import { LayoutChangeEvent, View, ViewStyle } from "react-native";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from "react-native-reanimated";

const BASE_COLORS = {
    dark: { primary: "rgb(17, 17, 17)", secondary: "rgb(51, 51, 51)" },
    light: { primary: "rgb(255, 255, 255)", secondary: "rgb(245, 245, 245)" },
} as const;

const makeColors = (mode: keyof typeof BASE_COLORS): [string, string, string, string, string, string] => [
    BASE_COLORS[mode].primary,
    BASE_COLORS[mode].secondary,
    BASE_COLORS[mode].secondary,
    BASE_COLORS[mode].primary,
    BASE_COLORS[mode].secondary,
    BASE_COLORS[mode].primary,
] as const;

const DARK_COLORS = makeColors("dark");
const LIGHT_COLORS = makeColors("light");

const Skeleton = ({
    style,
    dark = false,
}: {
    style?: ViewStyle;
    dark?: boolean;
} = {}) => {
    const shimmerPosition = useSharedValue(-1); // Start off-screen
    const [containerWidth, setContainerWidth] = useState(150);

    const colors = dark ? DARK_COLORS : LIGHT_COLORS;
    const gradientWidth = containerWidth * 6;

    const onLayout = useCallback((event: LayoutChangeEvent) => {
        const { width } = event.nativeEvent.layout;
        setContainerWidth(width || 150);
    }, []);


    useEffect(() => {
        shimmerPosition.value = withRepeat(
            withTiming(1, { duration: 3000, easing: Easing.linear }),
            -1,
            false
        );
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            {
                translateX: shimmerPosition.value * containerWidth,
            },
        ],
    }));

    return (
        <View
            style={[
                {
                    height: 32,
                    // borderRadius: 8,
                    overflow: "hidden",
                    backgroundColor: dark ? BASE_COLORS.dark.secondary : BASE_COLORS.light.secondary,
                },
                style,
            ]}
            onLayout={onLayout}
        >
            <Animated.View
                style={[
                    animatedStyle,
                    { width: gradientWidth, height: "100%", position: "absolute" },
                ]}
            >
                <LinearGradient
                    colors={colors}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{ width: "100%", height: "100%" }}
                />
            </Animated.View>
        </View>
    );
};

export default Skeleton;
