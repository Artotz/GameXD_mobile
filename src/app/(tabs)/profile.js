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
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import GameCard from "../../components/GameCard";
import { supabase } from "../db/supabase";

export default function Profile() {
  const [user, setUser] = useState({});
  const [userFavorites, setUserFavorites] = useState([]);
  const [userReviews, setUserReviews] = useState([]);

  const [gamesTotal, setGamesTotal] = useState(0);
  const [reviewsTotal, setReviewsTotal] = useState(0);

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
    } catch (error) {
      console.error("Erro ao obter dados:", error);
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

  // Dados de exemplo para cada seção
  // const [favoriteGames, setFavoriteGames] = useState([]);
  // const [recentReviews, setRecentReviews] = useState([]);

  // [
  //   { id: "1", title: "Game Long Name 1" },
  //   { id: "2", title: "Game 2" },
  //   { id: "3", title: "Game 3" },
  //   { id: "4", title: "Game 4" },
  //   { id: "5", title: "Game 5" },
  // ];

  // Dados de exemplo para cada seção
  // const recentReviews = [
  //   {
  //     id: "1",
  //     username: "ricardinn",
  //     reviewBody: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tincidunt pharetra elit a maximus. Nulla at erat tincidunt, ultrices sapien sollicitudin, lacinia lacus. Integer at laoreet ante, non facilisis nunc. Nam accumsan venenatis enim eget lacinia. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam metus sem, laoreet sit amet dolor in, rhoncus volutpat mi. Sed mi libero, tincidunt ac arcu non, iaculis rutrum orci.`,
  //     gameId: "1",
  //     gameTitle: "Game Long Name 1",
  //   },
  //   {
  //     id: "2",
  //     username: "ricardinn",
  //     reviewBody: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tincidunt pharetra elit a maximus. Nulla at erat tincidunt, ultrices sapien sollicitudin, lacinia lacus. Integer at laoreet ante, non facilisis nunc. Nam accumsan venenatis enim eget lacinia. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam metus sem, laoreet sit amet dolor in, rhoncus volutpat mi. Sed mi libero, tincidunt ac arcu non, iaculis rutrum orci.`,
  //     gameId: "2",
  //     gameTitle: "Game 2",
  //   },
  //   {
  //     id: "3",
  //     username: "ricardinn",
  //     reviewBody: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tincidunt pharetra elit a maximus. Nulla at erat tincidunt, ultrices sapien sollicitudin, lacinia lacus. Integer at laoreet ante, non facilisis nunc. Nam accumsan venenatis enim eget lacinia. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam metus sem, laoreet sit amet dolor in, rhoncus volutpat mi. Sed mi libero, tincidunt ac arcu non, iaculis rutrum orci.`,
  //     gameId: "3",
  //     gameTitle: "Game 3",
  //   },
  // ];

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

  return (
    <ScrollView style={{ height: "full", backgroundColor: "#1C1A2B" }}>
      <View style={styles.container}>
        <View style={styles.sectionLogo}>
          <Image source={require('../../../assets/Union.png')} style={{ width: 30, height: 22 }} />
          <Text style={styles.textGame}>GameXD</Text>
        </View>
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
    justifyContent: "center",
    paddingVertical: 30,
    marginBottom: 60,
    gap: 8,
  }, 
  sectionLogo: {
    backgroundColor: "#E1E1E1",
    width: "100%", 
    padding: 10,
    flexDirection: "row",
    alignItems: "center", 
    marginBottom: 30,
    marginTop: -30,
  },
  textGame: {
    color: "#8B5AA8",
    marginLeft: 10,
    fontSize: 20,
    fontFamily: 'Orbitron',
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
    width: "100%",
    backgroundColor: "#AB72CE",
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
    flexDirection: "column",
    width: "100%",
    backgroundColor: "#1C1A2B",
    marginTop: 15,
    alignItems: "center",
    justifyContent: "center",
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
    alignItems: "center",
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
  },
  reviewProfilePhoto: {
    width: 100,
    height: 100,
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
