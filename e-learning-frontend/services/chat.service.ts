import api from '../utils/api';

export const chatService = {
  getAllChats: async () => {
    const response = await api.get('/chat');
    return response.data;
  },

  getChatById: async (id: string) => {
    const response = await api.get(`/chat/${id}`);
    return response.data;
  },

  createChat: async (participants: string[]) => {
    const response = await api.post('/chat', { participants });
    return response.data;
  },

  sendMessage: async (chatId: string, content: string) => {
    const response = await api.post(`/chat/${chatId}/messages`, { content });
    return response.data;
  },

  getChatMessages: async (chatId: string) => {
    const response = await api.get(`/chat/${chatId}/messages`);
    return response.data;
  }
};
