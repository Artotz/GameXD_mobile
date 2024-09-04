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

export default function Profile() {
  // Dados de exemplo para cada seção
  const recentGames = [
    { id: "1", title: "Game 1" },
    { id: "2", title: "Game 2" },
  ];
  const friendsGames = [
    { id: "3", title: "Game 3" },
    { id: "4", title: "Game 4" },
  ];
  const featuredGames = [
    { id: "5", title: "Game 5" },
    { id: "6", title: "Game 6" },
  ];

  const renderGameItem = ({ item }) => (
    <View style={styles.gameItem}>
      <Text style={styles.gameTitle}>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.profileInfo}>
        <View style={styles.profileInfoLeft}>
          <View style={styles.profilePhoto}></View>
        </View>
        <View style={styles.profileInfoRight}>
          <Text style={styles.profileTitle}>Ricardo @ricardinn</Text>
          <Text style={styles.profileText}>
            0 seguidores{"\n"}0 seguindo{"\n"}0 jogos
            {"\n"}0 análises
          </Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Jogos Favoritos</Text>
      <View style={styles.underline} />
      <FlatList
        data={recentGames}
        renderItem={renderGameItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
      />

      <Text style={styles.sectionTitle}>Jogados Recentemente</Text>
      <View style={styles.underline} />
      <FlatList
        data={friendsGames}
        renderItem={renderGameItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
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
  profileInfo: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    gap: 8,
    backgroundColor: "#1C1A2B",
    marginTop: 32,
  },
  profileInfoLeft: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    gap: 8,
    backgroundColor: "#1C1A2B",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
  },
  profileInfoRight: {
    flex: 2,
    width: "100%",
    gap: 8,
    backgroundColor: "#1C1A2B",
    alignItems: "start",
    justifyContent: "center",
    padding: 8,
  },
  profileTitle: {
    fontSize: 16,
    color: "white",
  },
  profileText: {
    fontSize: 12,
    color: "white",
  },
  profilePhoto: {
    width: 100,
    height: 100,
    backgroundColor: "#fff",
    borderRadius: 999,
  },
});
