import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const logo = require("../../../assets/logo.png");

export default function SignUp() {
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.title}>Cadastro</Text>

      <View style={styles.inputContainer}>
        <Icon name="user" size={20} color="#ccc" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Nome"
          placeholderTextColor="#ccc"
          keyboardType="default"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="envelope" size={20} color="#ccc" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#ccc"
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="lock" size={20} color="#ccc" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#ccc"
          secureTextEntry
          autoCapitalize="none"
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon name="lock" size={20} color="#ccc" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Confirmar Senha"
          placeholderTextColor="#ccc"
          secureTextEntry
          autoCapitalize="none"
        />
      </View>
      <Link href="" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Criar Conta</Text>
        </TouchableOpacity>
      </Link>

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
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    height: 50,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    marginBottom: 20,
    paddingHorizontal: 10,
    height: 50,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: "#000", // Certifica-se de que o texto dentro da caixa de texto é visível
    fontSize: 16,
    height: "100%", // Garante que o TextInput preencha toda a altura da View
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
