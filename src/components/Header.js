import React from "react";
import { Image, Text, View, StyleSheet } from "react-native";
import { useFonts } from "expo-font"; // Importar o hook do expo-font

import logo from "../../assets/logo.png";
import Orbitron from "../../assets/fonts/Orbitron-VariableFont_wght.ttf";
import { TouchableOpacity } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router";

export default function Header({ hasBackButton = false }) {
  const router = useRouter();

  // Carregar a fonte Orbitron
  const [fontsLoaded] = useFonts({
    Orbitron,
  });

  return (
    <View style={styles.sectionLogo}>
      {/* Botão de voltar, definir rota ao voltar */}
      {hasBackButton ? (
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <FontAwesome name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
      ) : (
        <View style={styles.backButton}></View>
      )}
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignSelf: "flex-end",
          paddingRight: 20,
        }}
      >
        <Image source={logo} style={{ width: 30, height: 22 }} />
        <Text style={styles.textGame}>GameXD</Text>
      </View>
      <View style={styles.backButton}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionLogo: {
    display: "flex",
    backgroundColor: "#AB72CE",
    width: "100%",
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // marginBottom: 30,
    marginTop: -30,
  },
  textGame: {
    color: "#F0ECF0",
    marginLeft: 10,
    fontSize: 20,
    fontFamily: "Orbitron",
  },
  backButton: {
    display: "flex",
    flexGrow: 1,
    width: 24,
  },
});
