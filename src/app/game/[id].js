import { Link, useLocalSearchParams, useRouter } from "expo-router";
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
  Modal,
  Pressable,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import ProfilePhotoLink from "../../components/ProfilePhotoLink";
import { useAuth } from "../../hook/AuthContext";

export default function GameInfo() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { user } = useAuth();

  const [gameInfo, setGameInfo] = useState({});
  const [gameReviews, setGameReviews] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [userAlreadyReviewed, setUserAlreadyReviewed] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [didFetchFail, setDidFetchFail] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(0);
  const [rating, setRating] = useState(1); // Estado para armazenar a nota de review
  const [reviewBody, setReviewBody] = useState("");

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
      // setGameReviews([
      //   {
      //     id: 1,
      //     profiles: { username: "Username 1", avatar_url: "image1.png" },
      //     star_rating: 3,
      //     review_body:
      //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam venenatis interdum metus vel ullamcorper. Nullam molestie dui magna, eu venenatis purus venenatis ut. Donec erat urna, semper tempor tortor nec, laoreet vestibulum ex. Nam tempus dignissim euismod. Sed leo odio, pretium quis varius ut, vestibulum non nulla. Cras condimentum nulla non purus tristique ultrices id at dui. Sed accumsan fringilla sapien eu ullamcorper. Sed suscipit eros ex, ut aliquam purus aliquet ut. Morbi sed mattis quam. Maecenas tempor tristique ligula id accumsan. Fusce et eros nisl. Cras pellentesque est a erat rhoncus gravida. Sed a ipsum dolor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eget dui nec nisi volutpat mollis. Donec efficitur diam vel ante efficitur aliquet.",
      //   },
      // ]);
    }
  };

  const checkIsFavorite = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:3000/favorites/check-favorite/${user.id}/${id}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      if (result.length > 0) {
        setIsFavorite(true);
      }
    } catch (error) {
      console.error("Erro ao recuperar dados:", error);
    }
  };

  const checkUserAlreadyReviewed = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:3000/reviews/check-user-review/${user.id}/${id}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();

      if (result.length > 0) setUserAlreadyReviewed(true);
    } catch (error) {
      console.error("Erro ao recuperar dados:", error);
    }
  };

  useEffect(() => {
    fetchGameInfo();
    fetchGameReviews();
    checkIsFavorite();
    checkUserAlreadyReviewed();
  }, [id]);

  const handleIsFavorite = async () => {
    if (!isFavorite) {
      try {
        const response = await fetch(
          "http://127.0.0.1:3000/favorites/send-favorite",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: id,
              user_id: user.id,
            }),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Falha ao favoritar");
        }

        setIsFavorite(true);
      } catch (error) {
        console.error("Erro ao enviar favorito:", error);
      }
    } else {
      try {
        const response = await fetch(
          `http://127.0.0.1:3000/favorites/delete-favorite/${id}/${user.id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Network response was not ok");
        }

        const result = await response.json();
        setIsFavorite(false);
      } catch (error) {
        console.error("Erro ao recuperar dados de favorito:", error);
      }
    }
  };

  const postNewReview = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:3000/reviews/send-review",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: id,
            user_id: user.id,
            review_body: reviewBody,
            star_rating: rating,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      checkUserAlreadyReviewed();
      fetchGameReviews();
      setIsModalVisible(false);
    } catch (error) {
      console.error("Erro ao recuperar dados:", error);
    }
  };

  const updateReview = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:3000/reviews/update-review",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: id,
            user_id: user.id,
            review_body: reviewBody,
            star_rating: rating,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      fetchGameReviews();
      setIsModalVisible(false);
    } catch (error) {
      console.error("Erro ao recuperar dados:", error);
    }
  };

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
      <ProfilePhotoLink
        avatarURL={item.profiles.avatar_url}
        onPress={() => router.push(`../profile/${item.profiles.id}`)}
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
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 8,
            // paddingRight: 24,
          }}
        >
          <Text style={styles.reviewUsername}>{item.profiles.username}</Text>
          {item.profiles.id == user.id && (
            <FontAwesome
              size={16}
              name="edit"
              color="white"
              onPress={() => {
                setRating(item.star_rating);
                setReviewBody(item.review_body);
                setIsModalVisible(2);
              }}
            />
          )}
        </View>
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
        {/* <Text style={styles.sectionTitle}>Falha de Carregamento</Text> */}
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
        testID="ActivityIndicator"
      >
        <ActivityIndicator></ActivityIndicator>
      </View>
    );
  }

  return (
    <ScrollView style={{ height: "full", backgroundColor: "#1C1A2B" }}>
      {/* Botão de voltar, definir rota ao voltar */}
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <FontAwesome name="arrow-left" size={24} color="#fff" />
      </TouchableOpacity>

      <View style={styles.container} testID="GameInfoContainer">
        <Image
          resizeMode="cover"
          style={{
            width: 300, //mudar aqui
            height: 300,
          }}
          source={{ uri: gameInfo.header_image }}
          // source={{ uri: "../assets/animalCrossing.jpg" }}
        />

        <Text style={styles.gameTitle}>GameXD n˚ {id}</Text>
        <View style={{ display: "flex", flexDirection: "row", gap: 16 }}>
          <FontAwesome
            size={28}
            name="plus-circle"
            color={userAlreadyReviewed ? "gray" : "white"}
            onPress={() => {
              if (!userAlreadyReviewed) {
                setRating(1);
                setReviewBody("");
                setIsModalVisible(1);
              }
            }}
          />
          <FontAwesome
            size={28}
            name={isFavorite ? "heart" : "heart-o"}
            color="white"
            onPress={handleIsFavorite}
          />
        </View>
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

      <Modal visible={isModalVisible} animationType="none" transparent={true}>
        <View
          style={{
            display: "flex",
            flex: 1,
            width: "100%",
            height: "100%",
            // backgroundColor: "rgba(0,0,0,0.25)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              width: "90%",
              backgroundColor: "rgba(0,0,0,1)",
              borderColor: "rgb(55, 53, 69)",
              borderWidth: 4,
              borderRadius: 36,
              gap: 18,
              paddingBottom: 18,
            }}
          >
            {/* Header */}
            <View
              style={{
                // display: "flex",
                // flexDirection: "column",
                // width: "90%",
                // height: "50%",
                backgroundColor: "rgb(55, 53, 69)",
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                paddingHorizontal: 4,
                paddingVertical: 8,
              }}
            >
              <View
                style={{
                  display: "flex",
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingHorizontal: 24,
                }}
              >
                <View
                  style={{
                    display: "flex",
                    width: 30,
                  }}
                ></View>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    color: "white",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  {isModalVisible == 2 ? "Editar Review" : "Adicionar Review"}
                </Text>
                <View
                  style={{
                    display: "flex",
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <FontAwesome
                    name="close"
                    size={24}
                    color="white"
                    onPress={() => setIsModalVisible(0)}
                  />
                </View>
              </View>
            </View>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                gap: 16,
                paddingHorizontal: 16,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                {[1, 2, 3, 4, 5].map((i) => (
                  <Pressable key={i} onPress={() => setRating(i)}>
                    <FontAwesome
                      name={i <= rating ? "star" : "star-o"} // Ícone preenchido se a nota for igual ou menor que o número da estrela
                      size={30}
                      color="#FFD700" // Cor dourada para indicar a seleção
                    />
                  </Pressable>
                ))}
              </View>
            </View>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                gap: 16,
                paddingHorizontal: 16,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TextInput
                style={{
                  display: "flex",
                  width: "100%",
                  height: 150,
                  paddingHorizontal: 16,
                  fontWeight: 500,
                  backgroundColor: "#373545",
                  color: "white",
                  borderRadius: 8,
                  outline: "none",
                }}
                value={reviewBody}
                onChangeText={(t) => setReviewBody(t)}
              ></TextInput>
              <FontAwesome
                size={28}
                name="send"
                color="white"
                onPress={() => {
                  if (isModalVisible == 1) postNewReview();
                  else updateReview();
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
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
  backButton: {
    left: 20,
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
    width: "100%",
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
