import { Link, router, useLocalSearchParams } from "expo-router";
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
import FontAwesome from "@expo/vector-icons/FontAwesome";
import GameCard from "../../components/GameCard";
import { supabase } from "../../db/supabase";
import { useAuth } from "../../hook/AuthContext";
import Header from "../../components/Header";

export default function ProfileInfo() {
  const { user } = useAuth();

  const { id } = useLocalSearchParams();
  const [profile, setProfile] = useState({});
  const [userFavorites, setUserFavorites] = useState([]);
  const [userReviews, setUserReviews] = useState([]);

  const [gamesTotal, setGamesTotal] = useState(0);
  const [reviewsTotal, setReviewsTotal] = useState(0);

  const [isLoading, setIsLoading] = useState(true);
  const [didFetchFail, setDidFetchFail] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      Alert.alert("Deslogado com sucesso!");
      router.push("/login"); // Redireciona para a tela de login
    } catch (error) {
      console.error("Erro ao deslogar:", error);
      Alert.alert("Erro ao deslogar", error.message);
    }
  };
  const fetchUser = async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", id)
        .single();

      if (data) {
        setProfile(data);
        setIsLoading(false);
      } else setDidFetchFail(true);

      console.log("data ", data);
    } catch (error) {
      console.error("Erro ao obter dados:", error);
      setDidFetchFail(true);
    }
  };

  const fetchFavorites = async (data) => {
    try {
      const response = await fetch(`http://127.0.0.1:3000/favorites/${id}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setUserFavorites(result);
      setGamesTotal(result.length);
      // console.log("User favorites", result);
    } catch (error) {
      console.error("Erro ao obter dados:", error);
    }
  };

  const fetchUserReviews = async (data) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:3000/reviews/user-reviews/${id}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setUserReviews(result);
      setReviewsTotal(result.length);
      // console.log("user review", result);
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
    fetchFavorites();
    fetchUserReviews();
  }, []);

  const renderGameItem = ({ item }) => (
    <View testID={"FavoritesFlatListItem"} style={{ marginHorizontal: 4 }}>
      <GameCard
        title={item.Games.name}
        src={item.Games.header_image}
        onPress={() => router.push(`../game/${item.game_id}`)}
      />
    </View>
  );

  const renderReviewItem = ({ item }) => (
    <View
      testID={"ReviewsFlatListItem"}
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
        <Header hasBackButton={true} />

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
              {gamesTotal}{" "}
              {gamesTotal === 0 || 1 ? "Jogo Favorito" : "Jogos Favoritos"}
              {"\n"}
              {reviewsTotal} {reviewsTotal === 0 || 1 ? "Análise" : "Análises"}
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
            testID="FavoritesFlatList"
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
          testID="ReviewsFlatList"
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
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Deslogar</Text>
        </TouchableOpacity>

        {
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={styles.deleteButton}
          >
            <Text style={styles.deleteButtonText}>Apagar Conta</Text>
          </TouchableOpacity>
        }

        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>
                Você tem certeza que deseja apagar sua conta? Essa ação não pode
                ser desfeita.
              </Text>

              <View style={styles.modalButtonsContainer}>
                <TouchableOpacity
                  onPress={() => {
                    handleDeleteAccount();
                    setModalVisible(false);
                  }}
                  style={[styles.modalButton, styles.confirmButton]}
                >
                  <Text style={styles.modalButtonText}>Sim</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  style={[styles.modalButton, styles.cancelButton]}
                >
                  <Text style={styles.modalButtonText}>Não</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // semi-transparente
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#372f52", // Fundo do modal
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  modalText: {
    fontSize: 18,
    color: "white", // Cor da fonte
    marginBottom: 20,
    textAlign: "center",
  },
  modalButtonsContainer: {
    flexDirection: "row",
    gap: 20,
  },
  modalButton: {
    width: "90%",
    height: 40,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000", // Cor da sombra
    shadowOffset: { width: 0, height: 2 }, // Deslocamento da sombra
    shadowOpacity: 0.8, // Intensidade da sombra
    shadowRadius: 4, // Raio da sombra
    elevation: 5, // Sombra para Android
  },
  confirmButton: {
    backgroundColor: "#6d5ab0", // Cor marrom para o botão "Sim"
  },
  cancelButton: {
    backgroundColor: "#3b2d47", // Cor roxo escuro para o botão "Não"
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  logoutButton: {
    width: "35%",
    height: 50,
    backgroundColor: "#3b2d47", // Cor roxa escura para o botão de logout
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    shadowColor: "#000", // Cor da sombra
    shadowOffset: { width: 0, height: 2 }, // Deslocamento da sombra
    shadowOpacity: 0.8, // Intensidade da sombra
    shadowRadius: 4, // Raio da sombra
    elevation: 5, // Sombra para Android
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
