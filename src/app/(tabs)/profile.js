import { Link, router } from "expo-router";
// import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Modal,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import GameCard from "../../components/GameCard";
import { supabase } from "../db/supabase";
import { useAuth } from "../../hook/AuthContext";

export default function Profile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [userFavorites, setUserFavorites] = useState([]);
  const [userReviews, setUserReviews] = useState([]);

  const [gamesTotal, setGamesTotal] = useState(0);
  const [reviewsTotal, setReviewsTotal] = useState(0);

  const [isLoading, setIsLoading] = useState(true);
  const [didFetchFail, setDidFetchFail] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);

  const fetchUser = async () => {
    try {


      const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

      setProfile(data)

      setIsLoading(false);
    } catch (error) {
      console.error("Erro ao obter dados:", error);
      setDidFetchFail(true);
    }
  };

  const fetchFavorites = async (data) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:3000/favorites/${user.id}`
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
        `http://127.0.0.1:3000/reviews/user-reviews/${user.id}`
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
    fetchFavorites();
    fetchUserReviews()
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
        alignItems: "center",
        marginBottom: 20,
      }}
    >
      <GameCard
        // title={item.gameTitle}
        src={item.Games.header_image}
        width={60}
        height={60}
        onPress={() => router.push(`../game/${item.game_id}`)}
      />
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: 2,
          marginLeft: 80,
        }}
      >
        <Text style={styles.reviewUsername}>{item.profiles.username}</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          {[1, 2, 3, 4, 5].map((i) => (
            <FontAwesome
              key={i}
              name={i <= item.star_rating ? "star" : "star-o"} // Ícone preenchido se a nota for igual ou menor que o número da estrela
              size={10}
              color="#FFD700"
            />
          ))}
        </View>

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
        testID="FailedToFetch"
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
        <ActivityIndicator testID="ActivityIndicator"></ActivityIndicator>
      </View>
    );
  }

  return (
    <ScrollView style={{ height: "full", backgroundColor: "#1C1A2B" }}>
      <View style={styles.container}>
        <View style={styles.sectionLogo}>
          <Image
            source={require("../../../assets/_Logo_.png")}
            style={{ width: 30, height: 22 }}
          />
          <Text style={styles.textGame}>GameXD</Text>
        </View>
        <View style={styles.profileInfo}>
          <View style={styles.profileInfoLeft}>
            <Image
              style={styles.profilePhoto}
              source={{ uri: profile.avatar_url }}
            />
          </View>
          <View style={styles.profileInfoRight}>
            <Text style={styles.profileTitle}>{profile.username}</Text>
            <Text style={styles.profileText}>
              {gamesTotal} {gamesTotal === 0 || 1 ? 'Jogo Favorito' : 'Jogos Favoritos'}
              {"\n"}
              {reviewsTotal} {reviewsTotal === 0 || 1 ? 'Análise' : 'Análises'} 
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
            testID="FlatList"
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
          // style={{ display: "flex", width: "100%", gap: 12 }}
          // contentContainerStyle={{
          //   justifyContent: "center",
          //   alignItems: "center",
          // }}
        />
        <TouchableOpacity
          style={styles.deleteButton}
        >
          <Text style={styles.deleteButtonText}>Apagar Conta</Text>
        </TouchableOpacity>
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
    backgroundColor: "#AB72CE",
    width: "100%",
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
    marginTop: -30,
    opacity: 0.7,
  },
  textGame: {
    color: "#F0ECF0",
    marginLeft: 10,
    fontSize: 20,
    fontFamily: "Orbitron",
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
    backgroundColor: "#AB72CE",
    marginBottom: 20,
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
    marginTop: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  profileInfoLeft: {
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#1C1A2B",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
  },
  profileInfoRight: {
    width: "100%",
    gap: 8,
    alignItems: "start",
    justifyContent: "start",
  },
  profileTitle: {
    fontSize: 30,
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
    borderRadius: 50,
  },
  reviewProfilePhoto: {
    width: 100,
    height: 100,
    backgroundColor: "#fff",
    borderRadius: 50,
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
  deleteButton: {
    width: "30%",
    height: 40,
    width: "35%",
    height: 50,
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },

});
