import { Link, router } from "expo-router";
// import { StatusBar } from "expo-status-bar";
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
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
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


  const handleDeleteAccount = async () => {
    try {
      const { error } = await supabase
        .from("profiles") // A tabela que armazena os perfis dos usuários
        .delete()
        .eq("id", user.id); // Deleta o perfil baseado no ID do usuário

      if (error) {
        console.error("Erro ao apagar conta:", error);
        Alert.alert("Erro ao apagar conta", error.message);
      } else {
        // Se deletar o perfil com sucesso, desloga o usuário e redireciona para a tela de login
        await supabase.auth.signOut();
        Alert.alert("Conta apagada com sucesso!");
        router.push("/login");
      }
    } catch (error) {
      console.error("Erro ao tentar apagar conta:", error);
      Alert.alert("Erro ao tentar apagar conta", error.message);
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
          style={{ display: "flex", width: "100%", gap: 12 }}
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
          }}
        />

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleDeleteAccount}
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

  deleteButton: {
    width: "90%",
    height: 50,
    backgroundColor: "#ff4d4f",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
