import api from './api';

// Função utilitária para salvar o token e o email no localStorage
const saveAuthData = (token, email) => {
  localStorage.setItem('token', token);
  localStorage.setItem('userEmail', email);
};

// Função utilitária para lidar com erros
const handleError = (error, defaultMessage) => {
  console.error('Erro:', error);
  return {
    success: false,
    message: error.response?.data?.message || defaultMessage,
  };
};

export const login = async (email, password) => {
  try {
    const response = await api.post('/users/sign_in', {
      user: { email, password },
    });

    const token = response.data?.authorization;
    if (token) {
      saveAuthData(token, email);
      return { success: true };
    }

    return { success: false, message: 'Token não encontrado' };
  } catch (error) {
    return handleError(error, 'Erro ao fazer login');
  }
};

export const register = async (email, password, passwordConfirmation) => {
  try {
    const response = await api.post('/users', {
      user: { email, password, password_confirmation: passwordConfirmation },
    });

    const token = response.data?.authorization;
    if (token) {
      saveAuthData(token, email);
      return { success: true };
    }

    return { success: false, message: 'Token não encontrado' };
  } catch (error) {
    return handleError(error, 'Erro ao registrar');
  }
};

export const logoutUser = async () => {
  try {
    await api.delete('/users/sign_out');
  } catch (error) {
    console.error('Erro ao fazer logout:', error);
  } finally {
    // Remove os dados do localStorage mesmo que a requisição falhe
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    return true;
  }
};