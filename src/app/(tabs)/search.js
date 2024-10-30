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

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [delaySearchQuery, setDelaySearchQuery] = useState("");

  const [recentGames, setRecentGames] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [didFetchFail, setDidFetchFail] = useState(false);

  const searchGames = async (query) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:3000/games/search-game/${query}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      console.log("Games", result);
      setRecentGames(result);
      setIsLoading(false);
      if (result.length == 0) setDidFetchFail(true);
    } catch (error) {
      console.error("Erro ao recuperar dados:", error);
      setIsLoading(false);
      setDidFetchFail(true);
    }
  };

  useEffect(() => {
    if (searchQuery) setIsLoading(true);
    else setIsLoading(false);
    setDidFetchFail(false);

    const handler = setTimeout(() => {
      setDelaySearchQuery(searchQuery);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  useEffect(() => {
    if (delaySearchQuery) {
      searchGames(delaySearchQuery);
    }
  }, [delaySearchQuery]);

  const renderGameItem = ({ item }) => (
    <View testID="FlatListItem" style={{ margin: 4 }}>
      <GameCard
        title={item.name}
        src={item.header_image}
        onPress={() => router.push(`../game/${item.id}`)}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.sectionLogo}>
          <Image source={require('../../../assets/_Logo_.png')} style={{ width: 30, height: 22 }} />
          <Text style={styles.textGame}>GameXD</Text>
      </View>
      <Text style={styles.title}>Busca</Text>

      <TextInput
        testID="SearchInput"
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
        value={searchQuery}
        onChangeText={(t) => setSearchQuery(t)}
      ></TextInput>
      <View style={styles.underline} />
      {didFetchFail ? (
        <View
          testID="FailedToFetch"
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
          testID="ActivityIndicator"
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
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#1C1A2B",
            marginBottom: 60,
          }}
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FlatList
            testID="FlatList"
            data={recentGames}
            renderItem={renderGameItem}
            keyExtractor={(item) => item.id}
            numColumns={3}
            showsVerticalScrollIndicator={false}
          />
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    height: "100%",
    backgroundColor: "#1C1A2B",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 30,
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
