import React from "react";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";

const GameCard = ({ title, src, width = 100, height = 100, onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.container}>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            position: "relative",
            overflow: "hidden",
            backgroundColor: "#7f5499",
            width: width,
            height: height,
            borderRadius: 16,
          }}
        >
          <View
            style={{
              textOverflow: "ellipsis",
            }}
          >
            <Text
              numberOfLines={1}
              style={{ color: "#fff", paddingHorizontal: 8 }}
            >
              {title}
            </Text>
          </View>
          <Image
            resizeMode="cover"
            style={{
              width: width, //mudar aqui
              height: height,
            }}
            source={{ uri: src }}
            // source={{ uri: "assets/animalCrossing.jpg" }}
          />
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  // card: {
  //   display: "flex",
  //   flexDirection: "column",
  //   position: "relative",
  //   overflow: "hidden",
  //   backgroundColor: "#7f5499",
  //   width: { width },
  //   height: { height },
  //   borderRadius: 16,
  // },
});

export default GameCard;
