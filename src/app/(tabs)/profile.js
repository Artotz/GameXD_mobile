import { Link, router } from "expo-router";
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
import GameCard from "../../components/GameCard";
import { supabase } from "../db/supabase";

export default function Profile() {
  const [user, setUser] = useState({});
  const [userFavorites, setUserFavorites] = useState([]);
  const [userReviews, setUserReviews] = useState([]);

  const [gamesTotal, setGamesTotal] = useState(0);
  const [reviewsTotal, setReviewsTotal] = useState(0);

  const [isLoading, setIsLoading] = useState(true);
  const [didFetchFail, setDidFetchFail] = useState(false);

  const fetchUser = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:3000/profiles`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      console.log("users", result);
      setUser(result[4]);
      fetchFavorites(result[4]);
      fetchUserReviews(result[4]);
      setIsLoading(false);
    } catch (error) {
      console.error("Erro ao obter dados:", error);
      setDidFetchFail(true);
    }
  };

  const fetchFavorites = async (data) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:3000/favorites/${data.id}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setUserFavorites(result);
      setGamesTotal(result.length);
      console.log("User favorites", result);
    } catch (error) {
      console.error("Erro ao obter dados:", error);
    }
  };

  const fetchUserReviews = async (data) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:3000/reviews/user-reviews/${data.id}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setUserReviews(result);
      setReviewsTotal(result.length);
      console.log("user review", result);
    } catch (error) {
      console.error("Erro ao recuperar dados:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const renderGameItem = ({ item }) => (
    <View style={{ marginHorizontal: 4 }}>
      <GameCard
        title={item.Games.name}
        src={item.Games.header_image}
        onPress={() => router.push(`../game/${item.game_id}`)}
      />
    </View>
  );

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
      {/* <Image
        style={styles.reviewProfilePhoto}
        source={{ uri: "../assets/ricardo.png" }}
      /> */}
      <GameCard
        // title={item.gameTitle}
        src={item.Games.header_image}
        width={50}
        height={50}
        onPress={() => router.push(`../game/${item.Games.game_id}`)}
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
        <View style={styles.profileInfo}>
          <View style={styles.profileInfoLeft}>
            <Image
              style={styles.profilePhoto}
              source={{ uri: user.avatar_url }}
            />
          </View>
          <View style={styles.profileInfoRight}>
            <Text style={styles.profileTitle}>{user.username}</Text>
            <Text style={styles.profileText}>
              {gamesTotal} jogos
              {"\n"}
              {reviewsTotal} análises
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Jogos Favoritos</Text>
        <View style={styles.underline} />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ width: "100%" }}
        >
          <FlatList
            data={userFavorites}
            renderItem={renderGameItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </ScrollView>

        <Text style={styles.sectionTitle}>Análises</Text>
        <View style={styles.underline} />

        <FlatList
          data={userReviews}
          renderItem={renderReviewItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          style={{ display: "flex", width: "100%", gap: 12 }}
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
          }}
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
    justifyContent: "flex-start",
    paddingVertical: 30,
    marginBottom: 60,
    gap: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 1,
    color: "#a4a3aa",
    alignItems: "flex-start",
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
  profileInfo: {
    flexDirection: "row",
    width: "100%",
    gap: 8,
    backgroundColor: "#1C1A2B",
    marginVertical: 32,
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
  reviewProfilePhoto: {
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
