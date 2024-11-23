import React, { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import NewsCard from '../components/News/NewsCard';
import NewsForm from '../components/News/NewsForm';
import type { NewsPost } from '../types/news';

// Beispieldaten - In einer echten App würden diese von einer API kommen
const mockNews: NewsPost[] = [
  {
    id: '1',
    title: 'Neue Koppelzeiten ab nächster Woche',
    content: 'Ab dem 1. April gelten folgende neue Koppelzeiten:\n\nMorgens: 8:00 - 12:00 Uhr\nNachmittags: 14:00 - 18:00 Uhr\n\nBitte beachten Sie die geänderten Zeiten.',
    author: 'Anna Müller',
    createdAt: new Date('2024-03-25T10:00:00'),
    category: 'wichtig',
    pinned: true,
  },
  {
    id: '2',
    title: 'Reitturnier im Mai',
    content: 'Wir freuen uns, unser jährliches Reitturnier anzukündigen. Das Turnier findet am 15. Mai statt. Anmeldungen sind ab sofort möglich.',
    author: 'Thomas Weber',
    createdAt: new Date('2024-03-24T15:30:00'),
    category: 'veranstaltung',
  },
];

const Neuigkeiten = () => {
  const [news, setNews] = useState<NewsPost[]>(mockNews);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<NewsPost | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSave = (data: Omit<NewsPost, 'id' | 'createdAt'>) => {
    if (editingPost) {
      setNews(news.map(post => 
        post.id === editingPost.id 
          ? { ...post, ...data }
          : post
      ));
    } else {
      const newPost: NewsPost = {
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date(),
        ...data,
      };
      setNews([newPost, ...news]);
    }
    setIsFormOpen(false);
    setEditingPost(null);
  };

  const handleEdit = (post: NewsPost) => {
    setEditingPost(post);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Möchten Sie diese Mitteilung wirklich löschen?')) {
      setNews(news.filter(post => post.id !== id));
    }
  };

  const filteredNews = news.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedNews = [...filteredNews].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return b.createdAt.getTime() - a.createdAt.getTime();
  });

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Neuigkeiten</h1>
        <button
          onClick={() => {
            setEditingPost(null);
            setIsFormOpen(true);
          }}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Neue Mitteilung
        </button>
      </header>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Neuigkeiten durchsuchen..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
        />
      </div>

      <div className="space-y-4">
        {sortedNews.map((post) => (
          <NewsCard
            key={post.id}
            post={post}
            onEdit={handleEdit}
            onDelete={handleDelete}
            isAdmin={true}
          />
        ))}
        
        {sortedNews.length === 0 && (
          <p className="text-center text-gray-500 py-8">
            Keine Neuigkeiten gefunden
          </p>
        )}
      </div>

      <NewsForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingPost(null);
        }}
        onSave={handleSave}
        initialData={editingPost}
      />
    </div>
  );
};

export default Neuigkeiten;