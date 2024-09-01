import { StatusBar } from "expo-status-bar";
import React from 'react';
import { Text, TextInput, View, TouchableOpacity, StyleSheet, Image } from "react-native";

const logo = require('../../assets/logo.png')

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo}/>
      <Text style={styles.title}>Entrar</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Email" 
        placeholderTextColor="#ccc"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#ccc"
        secureTextEntry
        autoCapitalize="none"
      />
      
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1C1A2B",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  logo: {
    width: 150,
    height: 130,
    marginBottom: 50,
    marginTop: -80,
  },
  title: {
    width: "90%",
    textAlign: "left",
    fontSize: 32,
    color: "#fff",
    marginBottom: 40,
  },
  input: {
    width: "90%",
    height: 50,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: "#E4DFDF",
    fontSize: 16,
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
