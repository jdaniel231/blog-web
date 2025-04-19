import api from './api';

export const login = async (email, password) => {
  try {
    const response = await api.post('/users/sign_in', {
      user: { email, password },
    });

    // Captura o token do corpo da resposta
    const token = response.data.authorization;
    return { token, data: response.data }; // Retorna o token e os dados do usuário
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    throw error;
  }
};

export const register = async (email, name, password, passwordConfirmation) => {
  try {
    const response = await api.post('/users', {
      user: { email, name ,password, password_confirmation: passwordConfirmation },
    });

    return response.data; // Retorna os dados da resposta
  } catch (error) {
    console.error('Erro ao registrar:', error);
    throw error; // Lança o erro para ser tratado no hook
  }
};


export const logout = async () => {
  try {
    await api.delete('/users/sign_out'); // Envia a requisição de logout para o backend
  } catch (error) {
    console.error('Erro ao fazer logout:', error);
    throw error; // Lança o erro para ser tratado no hook
  }
};