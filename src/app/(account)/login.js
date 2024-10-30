import { useRouter, Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Switch,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useState } from "react";
import { supabase } from "../../db/supabase.js"; // Certifique-se de ter a configuração do supabase importada corretamente

import logo from "../../../assets/logo.png";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberAccount, setRememberAccount] = useState(false);
  const router = useRouter(); // Para navegar entre telas

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);

    if (error) {
      Alert.alert("Erro", error.message);
    } else {
      router.replace("/home");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.title}>Entrar</Text>

      <View style={styles.inputContainer}>
        <Icon name="envelope" size={20} color="#ccc" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#ccc"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          testID="emailInput"
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
          value={password}
          onChangeText={setPassword}
          testID="passwordInput"
        />
      </View>

      <View style={styles.rememberContainer}>
        <Text style={styles.rememberText}>Lembrar Conta?</Text>
        <Switch
          value={rememberAccount}
          onValueChange={setRememberAccount}
          trackColor={{ false: "#767577", true: "#AB72CE" }}
          thumbColor={rememberAccount ? "#fff" : "#f4f3f4"}
        />
        <Link href="forgotPassword">
          <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
        </Link>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handleSignIn}
        disabled={loading}
        testID="loginButton"
      >
        <Text style={styles.buttonText}>
          {loading ? "Entrando..." : "Entrar"}
        </Text>
      </TouchableOpacity>

      <View style={styles.signUpContainer}>
        <Text style={styles.signUpText}>Não tem uma conta? </Text>
        <Link href="signUp">
          <Text style={styles.signUpLink}>Cadastre-se!</Text>
        </Link>
      </View>
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
  signUpContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  signUpText: {
    color: "#ccc",
    fontSize: 16,
  },
  signUpLink: {
    color: "#AB72CE",
    fontSize: 16,
    fontWeight: "bold",
  },
  rememberContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "90%",
    marginBottom: 5,
  },
  rememberText: {
    color: "#ccc",
    fontSize: 16,
  },
  forgotPasswordText: {
    color: "#AB72CE",
    fontSize: 16,
    fontWeight: "bold",
  },
});
