import React from 'react';
import type { Chat } from '../../types';

interface ChatItemProps {
  chat: Chat;
  isSelected: boolean;
  onClick: () => void;
}

export const ChatItem: React.FC<ChatItemProps> = ({
  chat,
  isSelected,
  onClick,
}) => {
  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'сейчас';
    if (minutes < 60) return `${minutes}м`;
    if (hours < 24) return `${hours}ч`;
    if (days < 7) return `${days}д`;
    return date.toLocaleDateString('ru');
  };

  return (
    <div
      className={`flex items-center p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-600 transition-colors ${
        isSelected ? 'bg-blue-50 dark:bg-blue-900/20 border-r-2 border-r-blue-500' : ''
      }`}
      onClick={onClick}
    >
      
      <div className="relative flex-shrink-0">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-lg font-medium">
          {chat.avatar}
        </div>
        {chat.isOnline && (
          <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
        )}
      </div>
      
       
      <div className="ml-3 flex-1 min-w-0">
        <div className="flex justify-between items-baseline">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
            {chat.name}
            {chat.isAI && (
              <span className="ml-2 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-0.5 rounded-full font-semibold">
                AI
              </span>
            )}
          </h3>
          {chat.lastMessage && (
            <span className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0 ml-2">
              {formatTime(new Date(chat.lastMessage.timestamp))}
            </span>
          )}
        </div>
        
        <div className="flex justify-between items-center mt-1">
          <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
            {chat.lastMessage?.isFromUser && (
              <span className="text-blue-500 mr-1">Вы:</span>
            )}
            {chat.lastMessage?.text || 'Нет сообщений'}
          </p>
          {chat.unreadCount > 0 && (
            <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-1 min-w-5 text-center flex-shrink-0 ml-2">
              {chat.unreadCount > 99 ? '99+' : chat.unreadCount}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};