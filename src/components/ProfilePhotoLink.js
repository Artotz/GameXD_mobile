import React from "react";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";

const ProfilePhotoLink = ({ avatarURL, onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <Image style={styles.profilePhoto} source={{ uri: avatarURL }} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  profilePhoto: {
    width: 50,
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 999,
  },
});

export default ProfilePhotoLink;
