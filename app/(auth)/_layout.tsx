import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack screenOptions={{
      headerShown: false
    }} >
      <Stack.Screen name="task-rooms" />
      <Stack.Screen name="[room]" />
    </Stack>)
}
