import { useEffect, useState } from 'react';
import { notificationsService } from '../../services';
import { useAuth } from '../../hooks/useAuth';

interface Notification {
  id: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await notificationsService.getAllNotifications();
        setNotifications(data);
      } catch (error) {
        console.error('Failed to fetch notifications:', error);
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchNotifications();
    }
  }, [isAuthenticated]);

  const handleMarkAsRead = async (notificationId: string) => {
    try {
      await notificationsService.markAsRead(notificationId);
      setNotifications(notifications.map(notification => 
        notification.id === notificationId 
          ? { ...notification, read: true }
          : notification
      ));
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  };

  const handleDelete = async (notificationId: string) => {
    try {
      await notificationsService.deleteNotification(notificationId);
      setNotifications(notifications.filter(n => n.id !== notificationId));
    } catch (error) {
      console.error('Failed to delete notification:', error);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Notifications</h1>
      <div className="space-y-4">
        {notifications.length === 0 ? (
          <p className="text-gray-500">No notifications</p>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 rounded-lg shadow ${
                notification.read ? 'bg-gray-50' : 'bg-white border-l-4 border-blue-500'
              }`}
            >
              <div className="flex justify-between items-start">
                <p className={`${notification.read ? 'text-gray-600' : 'text-gray-900'}`}>
                  {notification.message}
                </p>
                <div className="flex space-x-2">
                  {!notification.read && (
                    <button
                      onClick={() => handleMarkAsRead(notification.id)}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      Mark as read
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(notification.id)}
                    className="text-sm text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                {new Date(notification.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}