import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from "../app/db/supabase"; // Certifique-se que o supabase está configurado corretamente

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Função para obter a sessão ativa do usuário
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null); // Define o usuário da sessão
      setLoading(false);
    };

    getSession();

    // Listener para mudança no estado de autenticação
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null); // Atualiza o estado do usuário
    });

    return () => {
      authListener?.unsubscribe(); // Limpa o listener ao desmontar
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook para acessar o contexto
export const useAuth = () => {
  return useContext(AuthContext);
};
