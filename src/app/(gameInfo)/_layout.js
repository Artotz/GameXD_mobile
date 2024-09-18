import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";

export default function gameInfoLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="gameInfo"
        options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack>
  );
}
