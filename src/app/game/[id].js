import { Link, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function GameInfo() {
  const { id } = useLocalSearchParams();
  const [gameInfo, setGameInfo] = useState({});
  const [gameReviews, setGameReviews] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [didFetchFail, setDidFetchFail] = useState(false);

  const fetchGameInfo = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:3000/games/${id}`);
      const result = await response.json();
      console.log("game", result);
      setGameInfo(result);
      setIsLoading(false);
    } catch (error) {
      console.error("Erro ao carregar os detalhes do jogo:", error);
      setDidFetchFail(true);
    }
  };

  const fetchGameReviews = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:3000/reviews/${id}`);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      console.log("All Reviews", result);
      setGameReviews(result);
    } catch (error) {
      console.error("Erro ao recuperar dados:", error);
    }
  };

  useEffect(() => {
    fetchGameInfo();
    fetchGameReviews();
  }, [id]);

  const renderReviewItem = ({ item }) => (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        gap: 12,
        paddingHorizontal: 24,
        justifyContent: "flex-start",
        alignItems: "center",
        marginBottom: 20,
      }}
    >
      <Image
        style={styles.profilePhoto}
        source={{ uri: item.profiles.avatar_url }}
      />
      <View
        style={{
          display: "flex",
          width: 300,
          overflow: "hidden",
          justifyContent: "center",
          alignItems: "center",
          // paddingRight: 24,
        }}
      >
        <Text style={styles.reviewUsername}>{item.profiles.username}</Text>
        <Text style={styles.reviewBody}>{item.review_body}</Text>
      </View>
    </View>
  );

  // Fetch State Management
  if (didFetchFail) {
    return (
      <View
        style={{
          height: "100vh",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#1C1A2B",
        }}
      >
        <FontAwesome size={28} name="exclamation-triangle" color="white" />
      </View>
    );
  } else if (isLoading) {
    return (
      <View
        style={{
          height: "100vh",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#1C1A2B",
        }}
      >
        <ActivityIndicator></ActivityIndicator>
      </View>
    );
  }

  return (
    <ScrollView style={{ backgroundColor: "#1C1A2B" }}>
      <View style={styles.container}>
        <Image
          resizeMode="cover"
          style={{
            width: 300, //mudar aqui
            height: 300,
          }}
          source={{ uri: gameInfo.header_image }}
          // source={{ uri: "../assets/animalCrossing.jpg" }}
        />

        <Text style={styles.gameTitle}>{id}</Text>
        <Text style={styles.sectionTitle}>{gameInfo.name}</Text>
        <Text style={styles.gameBrand}>
          {gameInfo.publishers}
          {"\n"}
        </Text>
        <View style={styles.underline} />
        <Text style={styles.gameTitle}>{gameInfo.short_description}</Text>
        <Text style={styles.gameAnalises}>Análises{"\n"}</Text>
        <View style={styles.underline} />

        <FlatList
          data={gameReviews}
          renderItem={renderReviewItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          style={{ display: "flex", width: "100%", gap: 12 }}
          // contentContainerStyle={{ justifyContent: "center" }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "#1C1A2B",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 30,
    marginBottom: 60,
    gap: 8,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 1,
    color: "white",
    textAlign: "center",
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 1,
    color: "#a4a3aa",
    textAlign: "center",
    marginTop: 20,
  },
  underline: {
    height: 1,
    width: "90%",
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
  gameTitle: {
    display: "flex",
    fontSize: 16,
    textAlign: "center",
    color: "white",
  },
  gameText: {
    fontSize: 12,
    textAlign: "center",
    color: "white",
  },
  gameImage: {
    width: 300,
    height: 300,
  },
  gameBrand: {
    fontSize: 12,
    textAlign: "center",
    color: "white",
  },
  gameAnalises: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 1,
    color: "#a4a3aa",
    textAlign: "center",
    marginTop: 20,
  },
  profilePhoto: {
    width: 50,
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 999,
  },
  reviewUsername: {
    display: "flex",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "#a4a3aa",
  },
  reviewBody: {
    display: "flex",
    fontSize: 12,
    textAlign: "center",
    color: "white",
  },
});
