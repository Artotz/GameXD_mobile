import { Stack } from "expo-router";
import { AuthProvider } from "../hook/AuthContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="(account)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="game/[id]" />
        <Stack.Screen name="profile/[id]" />
        <Stack.Screen name="profile/editProfile" />
        <Stack.Screen name="forum/[id]" />
      </Stack>
    </AuthProvider>
  );
}
