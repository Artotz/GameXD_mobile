import { Link, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Text, TextInput, View, TouchableOpacity, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useState } from 'react';
import { supabase } from "../../db/supabase";
import Footer from "../../components/footer.js";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [showFooter, setShowFooter] = useState(false);
  const router = useRouter();

  const handlePasswordReset = async () => {
    setLoading(true);

    const { data, error } = await supabase.auth.resetPasswordForEmail(email);

    if (error) {
      if (error.status === 400) {
        console.log("Erro", "E-mail não registrado. Verifique e tente novamente.");
        setLoading(false)
      } else {
        console.log("Erro", error.message);
        setLoading(false)
      }
    } else {
      console.log(
        "Sucesso",
        "Se o e-mail estiver registrado, um link de redefinição de senha será enviado."
      );
      setShowFooter(true); 
      setLoading(false)
      setTimeout(() => {
        setShowFooter(false);
      }, 3000);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Icon name="arrow-left" size={24} color="#fff" />
      </TouchableOpacity>

      <Text style={styles.title}>Recuperar Senha</Text>

      <Text style={styles.forgotPasswordText}>
        Por favor, coloque seu endereço de e-mail para solicitar uma nova senha.
      </Text>

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
        />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handlePasswordReset}
        disabled={loading}
      >
        <Text style={styles.buttonText}>{loading ? "Enviando..." : "Enviar"}</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />

      {showFooter && <Footer />}

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
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
  },
  title: {
    fontSize: 32,
    color: "#fff",
    marginBottom: 40,
    textAlign: "center",
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
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: "#000",
    fontSize: 16,
    height: "100%",
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
  forgotPasswordText: {
    color: "#F0ECF0",
    fontSize: 16,
    fontWeight: "thin",
    marginBottom: 20,
    marginTop: -20,
  },
});
