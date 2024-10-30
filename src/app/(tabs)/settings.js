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
import Header from "../../components/Header";

export default function Settings() {
  const { user } = useAuth();

  const [isLoading, setIsLoading] = useState(true);
  const [didFetchFail, setDidFetchFail] = useState(false);

  const fetchUser = async () => {
    try {
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      setIsLoading(false);
    } catch (error) {
      console.error("Erro ao obter dados:", error);
      setDidFetchFail(true);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

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

  // Fetch State Management
  // if (didFetchFail) {
  //   return (
  //     <View
  //       style={{
  //         height: "100vh",
  //         alignItems: "center",
  //         justifyContent: "center",
  //         backgroundColor: "#1C1A2B",
  //       }}
  //       testID="FailedToFetch"
  //     >
  //       <FontAwesome size={28} name="exclamation-triangle" color="white" />
  //     </View>
  //   );
  // } else if (isLoading) {
  //   return (
  //     <View
  //       style={{
  //         height: "100vh",
  //         alignItems: "center",
  //         justifyContent: "center",
  //         backgroundColor: "#1C1A2B",
  //       }}
  //     >
  //       <ActivityIndicator testID="ActivityIndicator"></ActivityIndicator>
  //     </View>
  //   );
  // }

  return (
    <ScrollView style={{ height: "full", backgroundColor: "#1C1A2B" }}>
      <View style={styles.container}>
        <Header />

        <TouchableOpacity
          onPress={() => router.push(`../profile/${user.id}`)}
          style={styles.button}
        >
          <Text style={styles.deleteButtonText}>Ver Perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push(`../profile/editProfile`)}
          style={styles.button}
        >
          <Text style={styles.deleteButtonText}>Editar Perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity
          // onPress={handleDeleteAccount}
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
    backgroundColor: "#ff4d4f",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  button: {
    width: "30%",
    height: 40,
    backgroundColor: "#AB72CE",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
});
