import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { login, register, logout } from "../services/user"; // Importação corrigida

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  const { dispatch } = context;

  const loginUser = async (email, password) => {
    try {
      const { token } = await login(email, password); // Captura o token retornado pela função login
  
      if (token) {
        localStorage.setItem("token", token); // Salva o token no localStorage
        localStorage.setItem("userEmail", email); // Salva o email no localStorage
        dispatch({ type: "LOGIN", payload: { email } }); // Atualiza o estado de autenticação
        return { success: true };
      } else {
        dispatch({ type: "LOGIN_FAILED", payload: { message: "Token não encontrado" } });
        return { success: false, message: "Token não encontrado" };
      }
    } catch (error) {
      console.error("Erro ao logar:", error.response?.data || error.message);
      dispatch({ type: "LOGIN_FAILED", payload: { message: error.response?.data?.message || error.message } });
      return { success: false, message: error.response?.data?.message || error.message };
    }
  };

  const registerUser = async (name, email, password,  passwordConfirmation) => {
    try {
      const response = await register(name, email, password, passwordConfirmation);
  
      const token = response?.authorization; // Ajuste conforme o campo retornado pela API
      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("userEmail", email);
        dispatch({ type: "REGISTER", payload: { email } });
        return { success: true };
      } else {
        dispatch({ type: "REGISTER_FAILED", payload: { message: "Token não encontrado" } });
        return { success: false, message: "Token não encontrado" };
      }
    } catch (error) {
      console.error("Erro ao registrar:", error.response?.data || error.message);
      dispatch({ type: "REGISTER_FAILED", payload: { message: error.response?.data?.message || error.message } });
      return { success: false, message: error.response?.data?.message || error.message };
    }
  };

  const logoutUser = async () => {
    try {
      await logout(); // Chama a função de logout do serviço
      localStorage.removeItem("token"); // Remove o token do localStorage
      localStorage.removeItem("userEmail"); // Remove o email do localStorage
      dispatch({ type: "LOGOUT" }); // Atualiza o estado de autenticação
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  }

  return {
    ...context,
    loginUser,
    logoutUser,
    registerUser,
  };
};