import React from "react";
import { Image, Text, View, StyleSheet } from "react-native";
import { useFonts } from "expo-font"; // Importar o hook do expo-font

export default function Header() {
  // Carregar a fonte Orbitron
  const [fontsLoaded] = useFonts({
    Orbitron: require("../../assets/fonts/Orbitron-VariableFont_wght.ttf"), // Certifique-se de que o caminho esteja correto
  });

  return (
    <View style={styles.sectionLogo}>
      <Image
        source={require("../../assets/_Logo_.png")}
        style={{ width: 30, height: 22 }}
      />
      <Text style={styles.textGame}>GameXD</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionLogo: {
    backgroundColor: "#AB72CE",
    width: "100%",
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    // marginBottom: 30,
    marginTop: -30,
  },
  textGame: {
    color: "#F0ECF0",
    marginLeft: 10,
    fontSize: 20,
    fontFamily: "Orbitron",
  },
});
