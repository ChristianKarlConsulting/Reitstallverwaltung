import React from 'react';
import { Pin, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import type { NewsPost } from '../../types/news';

type NewsCardProps = {
  post: NewsPost;
  onEdit?: (post: NewsPost) => void;
  onDelete?: (id: string) => void;
  isAdmin?: boolean;
};

const categoryStyles = {
  allgemein: 'bg-blue-100 text-blue-800',
  wichtig: 'bg-red-100 text-red-800',
  veranstaltung: 'bg-green-100 text-green-800',
};

const NewsCard: React.FC<NewsCardProps> = ({ post, onEdit, onDelete, isAdmin = false }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3">
            {post.pinned && <Pin className="h-4 w-4 text-indigo-600" />}
            <span className={`px-2 py-1 rounded-full text-sm ${categoryStyles[post.category]}`}>
              {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
            </span>
          </div>
          <h3 className="text-xl font-semibold mt-2">{post.title}</h3>
          <div className="flex items-center text-sm text-gray-600 mt-1">
            <Calendar className="h-4 w-4 mr-1" />
            {format(post.createdAt, 'dd. MMMM yyyy, HH:mm', { locale: de })} Uhr
          </div>
          <p className="text-gray-600 mt-3 whitespace-pre-line">{post.content}</p>
          <p className="text-sm text-gray-500 mt-4">Verfasst von {post.author}</p>
        </div>
        
        {isAdmin && (
          <div className="flex space-x-2 ml-4">
            <button
              onClick={() => onEdit?.(post)}
              className="px-3 py-1 text-sm text-indigo-600 hover:bg-indigo-50 rounded-md"
            >
              Bearbeiten
            </button>
            <button
              onClick={() => onDelete?.(post.id)}
              className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-md"
            >
              Löschen
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsCard;