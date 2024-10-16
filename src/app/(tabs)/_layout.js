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

// import { StatusBar } from "expo-status-bar";
// import React from 'react';
// import { Text, View, StyleSheet, Image } from "react-native";

// const home = require('../../../assets/Vector (4).svg');
// const review = require('../../../assets/Vector (5).svg');
// const message = require('../../../assets/ph_chat-bold.svg');
// const profile = require('../../../assets/iconamoon_profile.png');

// export default function TabBar() {
//     return (
//         <View style={styles.container}>
//             <Image source={home} style={styles.icon} />
//             <Image source={review} style={styles.icon} />
//             <Text style={styles.plusIcon}> + </Text>
//             <Image source={message} style={styles.icon} />
//             <Image source={profile} style={styles.icon} />
//             <StatusBar style="auto" />
//         </View>

//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flexDirection: 'row',        // Alinha os itens em uma linha
//         backgroundColor: '#373545',
//         padding: 10,
//         justifyContent: 'space-around',  // Distribui os ícones uniformemente
//         width: 412,
//         height: 78,
//         alignItems: 'center',
//     },
//     icon: {
//         width: 24,
//         height: 24,
//         tintColor: 'white',
//     },
//     plusIcon: {
//         fontSize: 24,
//         color: 'white',
//         textAlign: 'center',
//     }
// });
