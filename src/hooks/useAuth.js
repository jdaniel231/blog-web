import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { login, register } from "../services/user"; // Importação corrigida

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  const { dispatch } = context;

  const loginUser = async (email, password) => {
    try {
      const response = await login(email, password); // Usando a função importada diretamente

      const token = response?.token;
      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("userEmail", email);
        dispatch({ type: "LOGIN", payload: { email } });
        return { success: true };
      } else {
        dispatch({ type: "LOGIN_FAILED", payload: { message: "Token não encontrado" } });
        return { success: false, message: "Token não encontrado" };
      }
    } catch (error) {
      console.error("Erro ao logar:", error);
      dispatch({ type: "LOGIN_FAILED", payload: { message: error.message } });
      return { success: false, message: error.message };
    }
  };

  const registerUser = async (email, password) => {
    try {
      const response = await register(email, password); // Usando a função importada diretamente

      const token = response?.token;
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
      console.error("Erro ao registrar:", error);
      dispatch({ type: "REGISTER_FAILED", payload: { message: error.message } });
      return { success: false, message: error.message };
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    dispatch({ type: "LOGOUT" });
  };

  return {
    ...context,
    loginUser,
    logoutUser,
    registerUser,
  };
};