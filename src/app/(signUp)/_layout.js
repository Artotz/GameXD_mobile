import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";


export default function SignUpLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >

      <Stack.Screen
        name="signUp"
        options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack>
  );
}
