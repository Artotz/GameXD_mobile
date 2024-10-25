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
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import GameCard from "../../components/GameCard";
import Header from "../../components/Header";

export default function Home() {
  const [recentGames, setRecentGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [didFetchFail, setDidFetchFail] = useState(false);

  const fetchRecentGames = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:3000/games/recent-games`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();

      //printing the result
      // console.log("Games", result);

      setRecentGames(result);
      setIsLoading(false);
    } catch (error) {
      // console.error("Erro ao recuperar dados:", error);
      setDidFetchFail(true);
    }
  };

  useEffect(() => {
    fetchRecentGames();
  }, []);

  const renderGameItem = ({ item }) => (
    <View testID="GameCard" style={{ marginHorizontal: 10 }}>
      <GameCard
        title={item.name}
        src={item.header_image}
        onPress={() => router.push(`../game/${item.id}`)}
      />
    </View>
  );

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
  //       {/* <Text style={styles.sectionTitle}>Falha de Carregamento</Text> */}
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
  //       testID="ActivityIndicator"
  //     >
  //       <ActivityIndicator></ActivityIndicator>
  //     </View>
  //   );
  // }

  return (
    <ScrollView style={{ backgroundColor: "#1C1A2B" }}>
      <View style={styles.container}>
        <Header />

        <Text style={styles.title}>Home</Text>
        <View style={styles.underline} />

        <Text style={styles.sectionTitle}>Recentemente Adicionados</Text>
        <View style={styles.underline} />
        {didFetchFail ? (
          <View
            style={{
              marginTop: 16,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#1C1A2B",
            }}
          >
            <FontAwesome size={28} name="exclamation-triangle" color="white" />
          </View>
        ) : isLoading ? (
          <View
            style={{
              marginTop: 16,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#1C1A2B",
            }}
          >
            <ActivityIndicator></ActivityIndicator>
          </View>
        ) : (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.scrollIndicator}
          >
            <FlatList
              testID="FlatList"
              data={recentGames}
              renderItem={renderGameItem}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </ScrollView>
        )}

        <Text style={styles.sectionTitle}>Destaques da Semana</Text>
        <View style={styles.underline} />
        {didFetchFail ? (
          <View
            style={{
              marginTop: 16,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#1C1A2B",
            }}
          >
            <FontAwesome size={28} name="exclamation-triangle" color="white" />
          </View>
        ) : isLoading ? (
          <View
            style={{
              marginTop: 16,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#1C1A2B",
            }}
          >
            <ActivityIndicator></ActivityIndicator>
          </View>
        ) : (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.scrollIndicator}
          >
            <FlatList
              data={recentGames}
              renderItem={renderGameItem}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </ScrollView>
        )}
      </View>
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
  scrollIndicator: {
    width: "90%",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 1,
    color: "white",
    alignItems: "flex-start",
    marginTop: 20,
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
});
