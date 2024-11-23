import { useState, useCallback } from 'react';
import type { Notification, WaitlistNotification } from '../types/notifications';

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = useCallback((notification: Omit<Notification, 'id' | 'createdAt' | 'read'>) => {
    const newNotification: Notification = {
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
      read: false,
      ...notification,
    };

    setNotifications((prev) => [newNotification, ...prev]);
  }, []);

  const addWaitlistNotification = useCallback((data: WaitlistNotification) => {
    addNotification({
      title: 'Platz frei in Reitstunde',
      message: `Ein Platz ist frei geworden in der ${data.type === 'einzelstunde' ? 'Einzelstunde' : 'Gruppenstunde'} bei ${
        data.instructorName
      } am ${data.date.toLocaleDateString('de-DE')} um ${data.time} Uhr.`,
      type: 'info',
      link: `/reitstunden/${data.lessonId}`,
    });
  }, [addNotification]);

  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }, []);

  const deleteNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  return {
    notifications,
    addNotification,
    addWaitlistNotification,
    markAsRead,
    deleteNotification,
  };
};

export default useNotifications;