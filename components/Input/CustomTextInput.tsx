import Feather from "@expo/vector-icons/Feather";
import React, { useState } from "react";
import { TextInput, TextInputProps, TouchableOpacity, View } from "react-native";

interface CustomTextInputProps extends TextInputProps {
    value: string;
    onChangeText: (text: string) => void;
    placeholder: string;
    isPassword?: boolean;
    className?: string;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
    value,
    onChangeText,
    placeholder,
    isPassword = false,
    className = "",
    ...rest
}) => {
    const [showPassword, setShowPassword] = useState(!isPassword)
    return (
        <View className={`flex flex-row items-center border border-zinc-300 rounded-md px-4 py-3 ${className}`}>
            <TextInput
                style={{ flex: 1 }}
                placeholder={placeholder}
                placeholderTextColor="#9CA3AF"
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={!showPassword && isPassword}
                autoCapitalize="none"
                className="text-text-body"
                {...rest}
            />
            {isPassword && (
                <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    activeOpacity={0.7}
                    className="ml-2"
                >
                    <Feather
                        name={showPassword ? "eye" : "eye-off"}
                        size={24}
                        color="#9CA3AF"
                    />
                </TouchableOpacity>
            )}
        </View>
    );
};

export default CustomTextInput;
