import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../db/supabase"; // Certifique-se que o supabase está configurado corretamente
import { ScrollView, Button, Text, View, Image } from "react-native";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Função para obter a sessão ativa do usuário
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user || null); // Define o usuário da sessão
      setLoading(false);
    };

    getSession();

    // Listener para mudança no estado de autenticação
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null); // Atualiza o estado do usuário
      }
    );

    return () => {
      authListener?.subscription.unsubscribe(); // Limpa o listener ao desmontar
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
      {/* {user == null || children}
      {user != null || (
        <ScrollView
          style={{
            backgroundColor: "#1C1A2B",
          }}
          contentContainerStyle={{
            height: "100%",
          }}
        >
          <View
            style={{
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View>
              <Image source={require("../../assets/logo.png")} />
            </View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: "white",
                textAlign: "center",
                marginVertical: 40,
              }}
            >
              Você precisa estar logado!
            </Text>
          </View>
        </ScrollView>
      )} */}
    </AuthContext.Provider>
  );
};

// Custom hook para acessar o contexto
export const useAuth = () => {
  return useContext(AuthContext);
};
