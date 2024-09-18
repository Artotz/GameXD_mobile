import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default function GameInfo() {

  return (
    <View style={styles.container}>
      <View style={styles.gameInfo}>
        <View style={styles.gameInfoLeft}>
          <View>
            <Image style={styles.gameImage}
            source={require ('/Users/Natasha/GameXD_mobile/GameXD_mobile-1/assets/animalCrossing.jpg')} />
          </View>
          
      <Text style={styles.gameTitle}>Média</Text>
      <View style={styles.underline} />
        </View>
        <View style={styles.gameInfoRight}>
      <Text style={styles.sectionTitle}>Animal Crossing: New Horizons</Text>
      <Text style={styles.gameBrand}>Nitendo * 2020{"\n"}</Text>
      <Text style={styles.gameTitle}>Escape para uma ilha deserta e crie o seu próprio paraíso enquanto explora, cria e customiza em Animal Crossing: New Horizons. A sua ilha traz uma variedade incrível de recursos naturais que podem ser usados para criar de tudo, desde objetos para o seu conforto a ferramentas. 

Você pode caçar insetos ao amanhecer, decorar o seu paraíso durante o dia ou desfrutar do pôr do sol na praia enquanto pesca no oceano. A hora do dia e as estações do ano correspondem à realidade, então aproveite a oportunidade de conferir a sua ilha a cada dia para encontrar novas surpresas durante o ano todo.</Text>
        
        <Text style={styles.gameAnalises}>Análises{"\n"}</Text>
        <View style={styles.underline} />
        
        </View>
        </View>
        </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1C1A2B",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 1,
    color: "#a4a3aa",
    alignItems: "flex-start",
    marginTop: 20,
  },
  gameItem: {
    width: 150,
    height: 150,
    marginRight: 15,
    marginTop: 20,
    padding: 10,
    backgroundColor: "#D8BFD8",
    borderRadius: 8,
    alignItems: "center",
  },
  gameTitle: {
    fontSize: 16,
    color: "white",
    alignItems: "flex-start", 
  },

  underline: {
    width: "90%",
    height: 1,
    backgroundColor: "white",
  },
  button: {
    width: "90%",
    height: 50,
    backgroundColor: "#AB72CE",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  gameInfo: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    gap: 8,
    backgroundColor: "#1C1A2B",
    marginTop: 32,
  },
  gameInfoLeft: {
    flex: 1,
    flexDirection: "column",
    width: "100%",
    gap: 20,
    backgroundColor: "#1C1A2B",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
  },
  gameInfoRight: {
    flex: 2,
    width: "100%",
    gap: 8,
    backgroundColor: "#1C1A2B",
    alignItems: "start",
    justifyContent: "center",
    padding: 8,
  },
  gameTitle: {
    fontSize: 16,
    color: "white",
  },
  gameText: {
    fontSize: 12,
    color: "white",
  },
  gameImage: {
    width: 300,
    height: 300,

  },
  gameBrand:{
    fontSize: 12,
    color: "white",
  },
  gameAnalises:{
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 1,
    color: "#a4a3aa",
    alignItems: "flex-start",
    marginTop: 20,
  }

});
