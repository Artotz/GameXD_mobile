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

import FontAwesome from "@expo/vector-icons/FontAwesome";
import { supabase } from "../../db/supabase";
import { useAuth } from "../../hook/AuthContext";

import logo from "../../../assets/logo.png";

export default function EditProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState({});

  const [usernameInputText, setUsernameInputText] = useState("");
  const [imageLinkInputText, setImageLinkInputText] = useState("");
  const [imageLinkText, setImageLinkText] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [didFetchFail, setDidFetchFail] = useState(false);

  const fetchUser = async () => {
    try {
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      setProfile(data);

      setIsLoading(false);
    } catch (error) {
      console.error("Erro ao obter dados:", error);
      setDidFetchFail(true);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    setImageLinkText(profile.avatar_url || "image1.png");
    setImageLinkInputText(profile.avatar_url || "image1.png");
    setUsernameInputText(profile.username || "ricardinn1");
  }, [profile]);

  const updateProfile = async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .update({
          username: usernameInputText,
          avatar_url: imageLinkText,
        })
        .match({ id: user.id });

      if (error) {
        throw error;
      }

      // return data;
      // router.push(`../profile/${user.id}`);
      router.push(`../settings`);
    } catch (error) {
      console.error("Erro ao atualizar a avaliação:", error);
      throw error;
    }
  };

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
          <Image source={logo} style={{ width: 30, height: 22 }} />
          <Text style={styles.textGame}>GameXD</Text>
        </View>

        <Text style={styles.title}>Editar Perfil</Text>
        <View style={styles.underline} />

        <View style={styles.profileInfo}>
          <View style={styles.profileInfoLeft}>
            <Image
              style={styles.profilePhoto}
              source={{ uri: imageLinkText }}
            />
            <TextInput
              style={{
                display: "flex",
                width: "90%",
                height: 40,
                paddingHorizontal: 16,
                fontWeight: 500,
                backgroundColor: "#373545",
                color: "white",
                justifyContent: "center",
                borderRadius: 999,
                outline: "none",
              }}
              value={imageLinkInputText}
              onChangeText={(t) => setImageLinkInputText(t)}
            />
            <TouchableOpacity
              onPress={() => setImageLinkText(imageLinkInputText)}
            >
              <FontAwesome
                size={30}
                name="refresh"
                color="white"
                // style={{
                //   position: "absolute",
                //   top: 44,
                //   left: 44,
                //   zIndex: 10,
                // }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.profileInfoRight}>
            <TextInput
              style={{
                display: "flex",
                width: "90%",
                height: 40,
                paddingHorizontal: 16,
                fontWeight: 500,
                backgroundColor: "#373545",
                color: "white",
                justifyContent: "center",
                borderRadius: 999,
                outline: "none",
              }}
              value={usernameInputText}
              onChangeText={(t) => setUsernameInputText(t)}
            />

            {/* <Text style={styles.profileTitle}>{usernameInputText}</Text> */}
            {/* <Text style={styles.profileText}>
              {gamesTotal}{" "}
              {gamesTotal === 0 || 1 ? "Jogo Favorito" : "Jogos Favoritos"}
              {"\n"}
              {reviewsTotal} {reviewsTotal === 0 || 1 ? "Análise" : "Análises"}
            </Text> */}
          </View>

          <TouchableOpacity style={styles.deleteButton} onPress={updateProfile}>
            <Text style={styles.deleteButtonText}>Salvar Alterações</Text>
          </TouchableOpacity>
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
  sectionLogo: {
    backgroundColor: "#AB72CE",
    width: "100%",
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
    marginTop: -30,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 1,
    color: "white",
    alignItems: "flex-start",

    marginTop: 20,
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
    flexDirection: "column",
    marginTop: 15,
    gap: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  profileInfoLeft: {
    flexDirection: "row",
    // width: "100%",
    backgroundColor: "#1C1A2B",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    gap: 8,
  },
  profileInfoRight: {
    width: "100%",
    gap: 8,
    alignItems: "center",
    justifyContent: "center",
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
    borderRadius: 999,
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
    width: "60%",
    height: 50,
    backgroundColor: "#ff4d4f",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
});
