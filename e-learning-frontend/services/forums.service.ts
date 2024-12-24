import api from '../utils/api';

export const forumsService = {
  getAllForums: async () => {
    const response = await api.get('/forum');
    return response.data;
  },

  getForumById: async (id: string) => {
    const response = await api.get(`/forum/${id}`);
    return response.data;
  },

  createForum: async (forumData: any) => {
    const response = await api.post('/forum', forumData);
    return response.data;
  },

  updateForum: async (id: string, forumData: any) => {
    const response = await api.patch(`/forum/${id}`, forumData);
    return response.data;
  },

  deleteForum: async (id: string) => {
    const response = await api.delete(`/forum/${id}`);
    return response.data;
  },

  // Posts and comments
  createPost: async (forumId: string, postData: any) => {
    const response = await api.post(`/forum/${forumId}/posts`, postData);
    return response.data;
  },

  addComment: async (forumId: string, postId: string, commentData: any) => {
    const response = await api.post(`/forum/${forumId}/posts/${postId}/comments`, commentData);
    return response.data;
  }
};
