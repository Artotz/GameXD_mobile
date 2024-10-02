import { Link, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default function GameInfo() {
  const { id } = useLocalSearchParams();

  // Dados de exemplo para cada seção
  const recentGames = [
    {
      id: "1",
      username: "ricardinn 1",
      reviewBody: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tincidunt pharetra elit a maximus. Nulla at erat tincidunt, ultrices sapien sollicitudin, lacinia lacus. Integer at laoreet ante, non facilisis nunc. Nam accumsan venenatis enim eget lacinia. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam metus sem, laoreet sit amet dolor in, rhoncus volutpat mi. Sed mi libero, tincidunt ac arcu non, iaculis rutrum orci.`,
    },
    {
      id: "2",
      username: "ricardinn 2",
      reviewBody: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tincidunt pharetra elit a maximus. Nulla at erat tincidunt, ultrices sapien sollicitudin, lacinia lacus. Integer at laoreet ante, non facilisis nunc. Nam accumsan venenatis enim eget lacinia. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam metus sem, laoreet sit amet dolor in, rhoncus volutpat mi. Sed mi libero, tincidunt ac arcu non, iaculis rutrum orci.`,
    },
    {
      id: "3",
      username: "ricardinn 3",
      reviewBody: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tincidunt pharetra elit a maximus. Nulla at erat tincidunt, ultrices sapien sollicitudin, lacinia lacus. Integer at laoreet ante, non facilisis nunc. Nam accumsan venenatis enim eget lacinia. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam metus sem, laoreet sit amet dolor in, rhoncus volutpat mi. Sed mi libero, tincidunt ac arcu non, iaculis rutrum orci.`,
    },
  ];

  // item.profiles.avatar_url, item.profiles.username, item.review_body
  const renderGameItem = ({ item }) => (
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
        source={{ uri: "../assets/ricardo.png" }}
      />
      <View
        style={{
          display: "flex",
          width: 300,
          overflow: "hidden",
          justifyContent: "center",
          alignItems: "center",
          paddingRight: 24,
        }}
      >
        <Text style={styles.reviewUsername}>{item.username}</Text>
        <Text style={styles.reviewBody}>{item.reviewBody}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={{ height: "full", backgroundColor: "#1C1A2B" }}>
      <View style={styles.container}>
        <Image
          resizeMode="cover"
          style={{
            width: 300, //mudar aqui
            height: 300,
          }}
          // source={{ uri: src }}
          source={{ uri: "../assets/animalCrossing.jpg" }}
        />

        <Text style={styles.gameTitle}>{id}</Text>
        <Text style={styles.sectionTitle}>Animal Crossing: New Horizons</Text>
        <Text style={styles.gameBrand}>Nintendo (2020){"\n"}</Text>
        <View style={styles.underline} />
        <Text style={styles.gameTitle}>
          Escape para uma ilha deserta e crie o seu próprio paraíso enquanto
          explora, cria e customiza em Animal Crossing: New Horizons. A sua ilha
          traz uma variedade incrível de recursos naturais que podem ser usados
          para criar de tudo, desde objetos para o seu conforto a ferramentas.
          Você pode caçar insetos ao amanhecer, decorar o seu paraíso durante o
          dia ou desfrutar do pôr do sol na praia enquanto pesca no oceano. A
          hora do dia e as estações do ano correspondem à realidade, então
          aproveite a oportunidade de conferir a sua ilha a cada dia para
          encontrar novas surpresas durante o ano todo.
        </Text>
        <Text style={styles.gameAnalises}>Análises{"\n"}</Text>
        <View style={styles.underline} />

        <FlatList
          data={recentGames}
          renderItem={renderGameItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          style={{ display: "flex", width: "100%", gap: 12 }}
          // contentContainerStyle={{ justifyContent: "center" }}
        />
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
