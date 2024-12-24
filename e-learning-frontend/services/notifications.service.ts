import api from '../utils/api';

export const notificationsService = {
  getAllNotifications: async () => {
    const response = await api.get('/notifications');
    return response.data;
  },

  markAsRead: async (notificationId: string) => {
    const response = await api.patch(`/notifications/${notificationId}/read`);
    return response.data;
  },

  deleteNotification: async (notificationId: string) => {
    const response = await api.delete(`/notifications/${notificationId}`);
    return response.data;
  }
};
