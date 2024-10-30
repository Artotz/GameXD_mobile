import { Redirect, router } from "expo-router";
import React from "react";
import { View, Image, StyleSheet, Text, ScrollView, Button } from "react-native";
import { SafeAreaView } from "react-native";
import { AuthProvider } from "../hook/AuthContext.js";

const Index = () => {
  return (
 //<AuthProvider>
    <SafeAreaView className="bg-[#171524] h-full flex-1">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="w-full justify-center items-center min-h-[85vh] pt-10 h-full px-4 flex flex-col gap-4">
          <View>
            <Image source={require("../../assets/logo.png")} />
          </View>

          <Button
            title="Continuar"
            handlePress={() => router.push("/login")}
            containerStyles="w-full mt-7 bg-white rounded-2xl"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
 //</AuthProvider>
  );
};

export default Index;