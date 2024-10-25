import { Link, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useForm, Controller } from "react-hook-form";
import { supabase } from "../../db/supabase.js";

const logo = require("../../../assets/logo.png");

export default function SignUp() {
  const router = useRouter(); // para navegação após cadastro
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm(); // Correção aqui: está chamando corretamente o useForm

  const onSubmit = async (e) => {
    const { email, username, password } = e;
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("username")
        .eq("username", username);

      if (error) {
        console.error("Erro ao verificar nome de usuário.", error);
        Alert.alert("Erro ao verificar a disponibilidade do nome de usuário.");
        return;
      }

      if (data.length > 0) {
        Alert.alert("Esse nome de usuário não está disponível, tente outro.");
        return;
      }

      const { data: signUpData, error: signUpError } =
        await supabase.auth.signUp({
          email,
          password,
          options: { data: { username } },
        });

      if (signUpError) {
        console.log(signUpError);
        Alert.alert(signUpError.message);
      } else {
        const { error: profileError } = await supabase
          .from("profiles")
          .update([
            {
              username,
              avatar_url:
                "https://i.pinimg.com/736x/ee/79/41/ee7941e54053f388bbc8f4fb043765b6.jpg",
            },
          ])
          .eq("id", signUpData?.user?.id);

        if (profileError) {
          Alert.alert("Erro ao criar perfil.", profileError.message);
          return;
        } else {
          Alert.alert("Perfil criado com sucesso! " + signUpData?.user?.email);
          router.push("/home"); // navega para a tela inicial
        }
      }
    } catch (error) {
      console.error("Erro durante o processo de cadastro.", error);
      Alert.alert("Erro ao tentar criar a conta.");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.title}>Cadastro</Text>

      <View style={styles.inputContainer}>
        <Icon name="user" size={20} color="#ccc" style={styles.icon} />
        <Controller
          control={control}
          name="username"
          rules={{ required: "Nome de usuário obrigatório." }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Nome"
              placeholderTextColor="#ccc"
              keyboardType="default"
              autoCapitalize="none"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.username && (
          <Text style={styles.error}>{errors.username.message}</Text>
        )}
      </View>

      <View style={styles.inputContainer}>
        <Icon name="envelope" size={20} color="#ccc" style={styles.icon} />
        <Controller
          control={control}
          name="email"
          rules={{ required: "Email é obrigatório." }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#ccc"
              keyboardType="email-address"
              autoCapitalize="none"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.email && (
          <Text style={styles.error}>{errors.email.message}</Text>
        )}
      </View>

      <View style={styles.inputContainer}>
        <Icon name="lock" size={20} color="#ccc" style={styles.icon} />
        <Controller
          control={control}
          name="password"
          rules={{ required: "Senha é obrigatória." }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Senha"
              placeholderTextColor="#ccc"
              secureTextEntry
              autoCapitalize="none"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.password && (
          <Text style={styles.error}>{errors.password.message}</Text>
        )}
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
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit(onSubmit)}
        >
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
