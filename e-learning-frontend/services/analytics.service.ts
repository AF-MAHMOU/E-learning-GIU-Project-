import api from '../utils/api';

export const analyticsService = {
  getCourseAnalytics: async (courseId: string) => {
    const response = await api.get(`/analytics/courses/${courseId}`);
    return response.data;
  },

  getUserAnalytics: async (userId: string) => {
    const response = await api.get(`/analytics/users/${userId}`);
    return response.data;
  },

  getSystemAnalytics: async () => {
    const response = await api.get('/analytics/system');
    return response.data;
  }
};
