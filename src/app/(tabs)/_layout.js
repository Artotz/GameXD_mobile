import { Tabs } from "expo-router";
import { View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { AuthProvider } from "../../hook/AuthContext";

export default function RootLayout() {
  return (
    <AuthProvider>
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          borderWidth: 0,
          backgroundColor: "#373545",
          height: 60,
          position: "absolute",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "home",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "search",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="search" color={color} />
          ),
        }}
      />
      <Tabs.Screen

        name="forum"
        options={{
          title: "forum",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="comments" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "profile",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="user" color={color} />
          ),
        }}
      />
    </Tabs>
    </AuthProvider>
    
  );
}
