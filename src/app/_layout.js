import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";

export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen name="homeScreen"></Stack.Screen>
    </Stack>
  );
}
