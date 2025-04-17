import api from './api';

export const getPosts = async () => {
  try {
    const { data } = await api.get('/api/v1/posts');
    return data;
  } catch (error) {
    console.error('Erro ao obter posts:', error);
    return [];
  }
};

export const getPost = async (id) => {
  try {
    const { data } = await api.get(`/api/v1/posts/${id}`);
    return data;
  } catch (error) {
    console.error('Erro ao obter post:', error);
    return {};
  }
};

export const createPost = async (data) => {
  try {
    const { data: post } = await api.post('/api/v1/posts', data);
    return post;
  } catch (error) {
    console.error('Erro ao criar post:', error);
    return {};
  }
};

export const updatePost = async (id, data) => {
  try {
    const { data: post } = await api.put(`/api/v1/posts/${id}`, data);
    return post;
  } catch (error) {
    console.error('Erro ao atualizar post:', error);
    return {};
  }
};

export const deletePost = async (id) => {
  try {
    await api.delete(`/api/v1/posts/${id}`);
    return true;
  } catch (error) {
    console.error('Erro ao excluir post:', error);
    return false;
  }
};