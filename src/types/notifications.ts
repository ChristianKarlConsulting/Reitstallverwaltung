export type Notification = {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  createdAt: Date;
  read: boolean;
  link?: string;
};

export type WaitlistNotification = {
  lessonId: string;
  instructorName: string;
  date: Date;
  time: string;
  type: 'einzelstunde' | 'gruppenstunde';
};