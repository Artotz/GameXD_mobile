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
  Pressable,
  Modal,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function Forum() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [threadTitle, setThreadTitle] = useState("");
  const [threadBody, setThreadBody] = useState("");

  const [threads, setThreads] = useState([]);

  const userId = "d2a0f54b-ee89-4584-92e7-dc7f9846fe87";

  const fetchThreads = async () => {
    try {
      const response = await fetch("http://127.0.0.1:3000/forums");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      console.log("Threads", result);
      setThreads(result);
    } catch (error) {
      console.error("Erro ao recuperar dados:", error);
    }
  };

  useEffect(() => {
    fetchThreads();
  }, []);

  const postNewThread = async () => {
    try {
      const response = await fetch("http://127.0.0.1:3000/forums/new-forum", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          title: threadTitle,
          description: threadBody,
        }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      fetchThreads();
      setIsModalVisible(false);
      setThreadTitle("");
      setThreadBody("");
    } catch (error) {
      console.error("Erro ao recuperar dados:", error);
    }
  };

  // const recentReviews = [
  //   {
  //     id: "1",
  //     profiles: {
  //       username: "ricardinn1",
  //       avatar_url:
  //         "https://i.pinimg.com/736x/ee/79/41/ee7941e54053f388bbc8f4fb043765b6.jpg",
  //     },
  //     title: `Lorem ipsum dolor sit amet`,
  //   },
  //   {
  //     id: "2",
  //     profiles: {
  //       username: "ricardinn2",
  //       avatar_url:
  //         "https://i.pinimg.com/736x/ee/79/41/ee7941e54053f388bbc8f4fb043765b6.jpg",
  //     },
  //     title: `Lorem ipsum dolor sit amet`,
  //   },
  //   {
  //     id: "3",
  //     profiles: {
  //       username: "ricardinn3",
  //       avatar_url:
  //         "https://i.pinimg.com/736x/ee/79/41/ee7941e54053f388bbc8f4fb043765b6.jpg",
  //     },
  //     title: `Lorem ipsum dolor sit amet`,
  //   },
  //   {
  //     id: "4",
  //     profiles: {
  //       username: "ricardinn4",
  //       avatar_url:
  //         "https://i.pinimg.com/736x/ee/79/41/ee7941e54053f388bbc8f4fb043765b6.jpg",
  //     },
  //     title: `Lorem ipsum dolor sit amet`,
  //   },
  //   {
  //     id: "5",
  //     profiles: {
  //       username: "ricardinn4",
  //       avatar_url:
  //         "https://i.pinimg.com/736x/ee/79/41/ee7941e54053f388bbc8f4fb043765b6.jpg",
  //     },
  //     title: `Lorem ipsum dolor sit amet`,
  //   },
  //   {
  //     id: "6",
  //     profiles: {
  //       username: "ricardinn4",
  //       avatar_url:
  //         "https://i.pinimg.com/736x/ee/79/41/ee7941e54053f388bbc8f4fb043765b6.jpg",
  //     },
  //     title: `Lorem ipsum dolor sit amet`,
  //   },
  //   {
  //     id: "7",
  //     profiles: {
  //       username: "ricardinn4",
  //       avatar_url:
  //         "https://i.pinimg.com/736x/ee/79/41/ee7941e54053f388bbc8f4fb043765b6.jpg",
  //     },
  //     title: `Lorem ipsum dolor sit amet`,
  //   },
  //   {
  //     id: "8",
  //     profiles: {
  //       username: "ricardinn4",
  //       avatar_url:
  //         "https://i.pinimg.com/736x/ee/79/41/ee7941e54053f388bbc8f4fb043765b6.jpg",
  //     },
  //     title: `Lorem ipsum dolor sit amet`,
  //   },
  //   {
  //     id: "9",
  //     profiles: {
  //       username: "ricardinn4",
  //       avatar_url:
  //         "https://i.pinimg.com/736x/ee/79/41/ee7941e54053f388bbc8f4fb043765b6.jpg",
  //     },
  //     title: `Lorem ipsum dolor sit amet`,
  //   },
  //   {
  //     id: "10",
  //     profiles: {
  //       username: "ricardinn4",
  //       avatar_url:
  //         "https://i.pinimg.com/736x/ee/79/41/ee7941e54053f388bbc8f4fb043765b6.jpg",
  //     },
  //     title: `Lorem ipsum dolor sit amet`,
  //   },
  //   {
  //     id: "11",
  //     profiles: {
  //       username: "ricardinn4",
  //       avatar_url:
  //         "https://i.pinimg.com/736x/ee/79/41/ee7941e54053f388bbc8f4fb043765b6.jpg",
  //     },
  //     title: `Lorem ipsum dolor sit amet`,
  //   },
  //   {
  //     id: "12",
  //     profiles: {
  //       username: "ricardinn4",
  //       avatar_url:
  //         "https://i.pinimg.com/736x/ee/79/41/ee7941e54053f388bbc8f4fb043765b6.jpg",
  //     },
  //     title: `Lorem ipsum dolor sit amet`,
  //   },
  // ];

  const renderReviewItem = ({ item }) => (
    <Pressable
      onPress={() => router.push(`../forum/${item.id}`)}
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        gap: 12,
        paddingHorizontal: 24,
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          width: 400,
          alignItems: "center",
          borderBottomColor: "#AB72CE",
          borderWidth: 0.9,
          padding: 20,
          gap: 50,
        }}
      >
        <Image
          style={styles.profilePhoto}
          source={{ uri: item.profiles.avatar_url }}
        />
        <View>
          <Text style={styles.reviewUsername}>{item.profiles.username}</Text>
          <Text style={styles.forumTitle}>{item.title}</Text>
          <button style={styles.button}>Responder</button>
        </View>
      </View>
    </Pressable>
  );

  return (
    <ScrollView style={{ backgroundColor: "#1C1A2B" }}>
      <View style={styles.container}>
        <View style={styles.sectionLogo}>
          <Image
            source={require("../../../assets/_Logo_.png")}
            style={{ width: 30, height: 22 }}
          />
          <Text style={styles.textGame}>GameXD</Text>
        </View>

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
              width: 28,
            }}
          ></View>
          <Text style={styles.title}>Fórum</Text>
          <View
            style={{
              display: "flex",
              flexDirection: "column-reverse",
              paddingBottom: 8,
            }}
          >
            <FontAwesome
              size={28}
              name="plus-circle"
              color="white"
              onPress={() => setIsModalVisible(true)}
            />
          </View>
        </View>
        <View style={styles.underline} />

        <FlatList
          data={threads}
          renderItem={renderReviewItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          style={{ display: "flex", width: "90%", gap: 4, marginTop: 20 }}
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
          }}
        />
      </View>

      <Modal visible={isModalVisible} animationType="none" transparent={true}>
        <View
          style={{
            display: "flex",
            flex: 1,
            width: "100%",
            height: "100%",
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
                  Adicionar Discussão
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
                    onPress={() => setIsModalVisible(false)}
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
              <TextInput
                style={{
                  display: "flex",
                  width: "100%",
                  height: 50,
                  paddingHorizontal: 16,
                  fontWeight: 500,
                  fontSize: 30,
                  backgroundColor: "#373545",
                  color: "white",
                  borderRadius: 8,
                  outline: "none",
                }}
                value={threadTitle}
                onChangeText={(t) => setThreadTitle(t)}
              ></TextInput>
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
                value={threadBody}
                onChangeText={(t) => setThreadBody(t)}
              ></TextInput>
              {/* <Pressable style={{ display: "flex", height: "fit-content" }}> */}
              <FontAwesome
                size={28}
                name="send"
                color="white"
                onPress={postNewThread}
              />
              {/* </Pressable> */}
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
    justifyContent: "flex-start",
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
  },
  textGame: {
    color: "#F0ECF0",
    marginLeft: 10,
    fontSize: 20,
    fontFamily: 'Orbitron',
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "white",
    alignItems: "center",
    textAlign: "center",
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
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
    backgroundColor: "#AB72CE",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 10,
    width: 70,
    marginTop: 5,
    color: "white",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  profileText: {
    fontSize: 12,
    color: "white",
  },
  profilePhoto: {
    width: 50,
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 50,
    marginLeft: 55,
  },
  reviewProfilePhoto: {
    width: 50,
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 50,
  },
  reviewUsername: {
    display: "flex",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#a4a3aa",
    marginRight: 20,
  },
  forumTitle: {
    display: "flex",
    fontSize: 14,
    color: "white",
    marginRight: 20,
    flexShrink: 1,
    flexWrap: "wrap",
    maxWidth: "70%",
  },
});
