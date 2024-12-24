import api from '../utils/api';

export const authService = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  register: async (userData: any) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  logout: async () => {
    localStorage.removeItem('token');
  },

  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  }
};
