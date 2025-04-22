import api from "./api";

export const getComments = async (id) => {
  try {
    const { data } = await api.get(`api/v1/posts/${id}/comments`);
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const createComment = async (id, commentText) => {
  try {
    const { data } = await api.post(`api/v1/posts/${id}/comments`, {
      comment: {
        commit: commentText,
      },
    });
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
};


export const deleteComment = async (id, commentId) => {
  try {
    await api.delete(`api/v1/posts/${id}/comments/${commentId}`);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

