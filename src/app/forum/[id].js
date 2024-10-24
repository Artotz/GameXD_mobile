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
  Pressable,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function ForumInfo() {
  const { id } = useLocalSearchParams();
  const userId = "d2a0f54b-ee89-4584-92e7-dc7f9846fe87";

  const [thread, setThread] = useState([]);
  const [comments, setComments] = useState([]);

  const [commentBody, setCommentBody] = useState("");

  const fetchThread = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:3000/forums/forum/${id}`);
      if (!response.ok) throw new Error("Network response was not ok");
      const result = await response.json();
      setThread(result);
    } catch (error) {
      console.error("Erro ao recuperar dados:", error);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:3000/forums/forum/${id}/comments`
      );
      if (!response.ok) throw new Error("Network response was not ok");
      const result = await response.json();
      setComments(result);
      console.log(result);
    } catch (error) {
      console.error("Erro ao recuperar dados dos comentários:", error);
    }
  };

  useEffect(() => {
    fetchThread();
    fetchComments();
  }, []);

  const postNewComment = async () => {
    try {
      const response = await fetch("http://127.0.0.1:3000/forums/new-comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          forum_id: id,
          comment: commentBody,
        }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      fetchComments();
      setCommentBody("");
    } catch (error) {
      console.error("Erro ao recuperar dados:", error);
    }
  };

  const recentReviews = [
    {
      id: "1",
      profiles: {
        username: "ricardinn1",
        avatar_url:
          "https://i.pinimg.com/736x/ee/79/41/ee7941e54053f388bbc8f4fb043765b6.jpg",
      },
      review_body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tincidunt pharetra elit a maximus. Nulla at erat tincidunt, ultrices sapien sollicitudin, lacinia lacus. Integer at laoreet ante, non facilisis nunc. Nam accumsan venenatis enim eget lacinia. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam metus sem, laoreet sit amet dolor in, rhoncus volutpat mi. Sed mi libero, tincidunt ac arcu non, iaculis rutrum orci.`,
    },
    {
      id: "2",
      profiles: {
        username: "ricardinn2",
        avatar_url:
          "https://i.pinimg.com/736x/ee/79/41/ee7941e54053f388bbc8f4fb043765b6.jpg",
      },
      review_body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tincidunt pharetra elit a maximus. Nulla at erat tincidunt, ultrices sapien sollicitudin, lacinia lacus. Integer at laoreet ante, non facilisis nunc. Nam accumsan venenatis enim eget lacinia. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam metus sem, laoreet sit amet dolor in, rhoncus volutpat mi. Sed mi libero, tincidunt ac arcu non, iaculis rutrum orci.`,
    },
    {
      id: "3",
      profiles: {
        username: "ricardinn3",
        avatar_url:
          "https://i.pinimg.com/736x/ee/79/41/ee7941e54053f388bbc8f4fb043765b6.jpg",
      },
      review_body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tincidunt pharetra elit a maximus. Nulla at erat tincidunt, ultrices sapien sollicitudin, lacinia lacus. Integer at laoreet ante, non facilisis nunc. Nam accumsan venenatis enim eget lacinia. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam metus sem, laoreet sit amet dolor in, rhoncus volutpat mi. Sed mi libero, tincidunt ac arcu non, iaculis rutrum orci.`,
    },
  ];

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
        }}
      >
        <Text style={styles.reviewUsername}>{item.profiles.username}</Text>
        <Text style={styles.reviewBody}>{item.comment}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={{ backgroundColor: "#1C1A2B" }}>
      <View style={styles.container}>
        <Text style={styles.title}>{thread.title}</Text>
        <Text style={styles.sectionTitle}>{thread.description}</Text>
        <View style={styles.underline} />

        <FlatList
          data={comments}
          renderItem={renderReviewItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          style={{ display: "flex", width: "100%", gap: 12, marginTop: 20 }}
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
          }}
        />
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
              height: 100,
              paddingHorizontal: 16,
              fontWeight: 500,
              backgroundColor: "#373545",
              color: "white",
              justifyContent: "center",
              borderRadius: 8,
              outline: "none",
            }}
            value={commentBody}
            onChangeText={(t) => setCommentBody(t)}
          ></TextInput>
          {/* <Pressable style={{ display: "flex", height: "fit-content" }} > */}
          <FontAwesome
            size={28}
            name="send"
            color="white"
            onPress={postNewComment}
          />
          {/* </Pressable> */}
        </View>
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
