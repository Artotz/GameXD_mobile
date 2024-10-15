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
  const [commentTitle, setCommentTitle] = useState("");
  const [commentBody, setCommentBody] = useState("");

  const [threads, setThreads] = useState([]);

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
        }}
      >
        <Text style={styles.reviewUsername}>{item.profiles.username}</Text>
        <Text style={styles.forumTitle}>{item.title}</Text>
      </View>
    </Pressable>
  );

  return (
    <ScrollView style={{ backgroundColor: "#1C1A2B" }}>
      <View style={styles.container}>
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
          style={{ display: "flex", width: "100%", gap: 12, marginTop: 20 }}
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
                value={commentTitle}
                onChangeText={(t) => setCommentTitle(t)}
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
                value={commentBody}
                onChangeText={(t) => setCommentBody(t)}
              ></TextInput>
              <Pressable style={{ display: "flex", height: "fit-content" }}>
                <FontAwesome size={28} name="send" color="white" />
              </Pressable>
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
  profileText: {
    fontSize: 12,
    color: "white",
  },
  profilePhoto: {
    width: 50,
    height: 50,
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
  forumTitle: {
    display: "flex",
    fontSize: 18,
    textAlign: "justify",
    color: "white",
  },
});
