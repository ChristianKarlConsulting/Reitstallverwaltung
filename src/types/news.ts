export type NewsPost = {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: Date;
  category: 'allgemein' | 'wichtig' | 'veranstaltung';
  pinned?: boolean;
};