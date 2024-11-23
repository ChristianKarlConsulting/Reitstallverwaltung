import React from 'react';
import { Bell, X, Info, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import type { Notification } from '../../types/notifications';

type NotificationCenterProps = {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
};

const iconMap = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: XCircle,
};

const colorMap = {
  info: 'text-blue-500',
  success: 'text-green-500',
  warning: 'text-yellow-500',
  error: 'text-red-500',
};

const NotificationCenter: React.FC<NotificationCenterProps> = ({
  notifications,
  onMarkAsRead,
  onDelete,
}) => {
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="relative">
      <button className="relative p-2 text-gray-600 hover:text-gray-900">
        <Bell className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg overflow-hidden z-50">
        <div className="p-4 border-b">
          <h3 className="text-lg font-semibold">Benachrichtigungen</h3>
        </div>

        <div className="max-h-96 overflow-y-auto">
          {notifications.map((notification) => {
            const Icon = iconMap[notification.type];
            const colorClass = colorMap[notification.type];

            return (
              <div
                key={notification.id}
                className={`p-4 border-b ${
                  !notification.read ? 'bg-gray-50' : ''
                }`}
              >
                <div className="flex items-start">
                  <Icon className={`h-5 w-5 mt-0.5 ${colorClass}`} />
                  <div className="ml-3 flex-1">
                    <p className="font-medium">{notification.title}</p>
                    <p className="text-sm text-gray-600">{notification.message}</p>
                    {notification.link && (
                      <a
                        href={notification.link}
                        className="text-sm text-indigo-600 hover:text-indigo-800 mt-1 block"
                      >
                        Details anzeigen
                      </a>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    {!notification.read && (
                      <button
                        onClick={() => onMarkAsRead(notification.id)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <CheckCircle className="h-4 w-4" />
                      </button>
                    )}
                    <button
                      onClick={() => onDelete(notification.id)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          {notifications.length === 0 && (
            <p className="text-center text-gray-500 py-4">
              Keine Benachrichtigungen
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationCenter;