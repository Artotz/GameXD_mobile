import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="signUp"
        options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack>
  );
}
