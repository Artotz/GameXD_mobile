import { router } from "expo-router";
import React from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  ScrollView,
  Button,
} from "react-native";

import logo from "../../assets/logo.png";

const Index = () => {
  return (
    <ScrollView
      style={{
        backgroundColor: "#1C1A2B",
      }}
      contentContainerStyle={{
        height: "100%",
      }}
    >
      <View
        style={{
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View>
          <Image source={logo} />
        </View>

        <Button title="Continuar" onPress={() => router.push("/login")} />
      </View>
    </ScrollView>
  );
};

export default Index;
