import React from 'react';
import { Phone, Video, MoreVertical, ArrowLeft } from 'lucide-react';
import type { Chat } from '../../types';

interface ChatHeaderProps {
  chat: Chat;
  onBack?: () => void;  
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ chat, onBack }) => {
  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-600 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center">
        
        {onBack && (
          <button
            onClick={onBack}
            className="mr-3 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 lg:hidden"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        )}
 
        <div className="relative">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-lg font-medium">
            {chat.avatar}
          </div>
          {chat.isOnline && (
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
          )}
        </div>
        
        <div className="ml-3">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
            {chat.name}
            {chat.isAI && (
              <span className="ml-2 text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-0.5 rounded-full font-semibold">
                AI
              </span>
            )}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {chat.isAI 
              ? chat.description || 'Искусственный интеллект' 
              : chat.isOnline 
                ? 'В сети' 
                : 'Был недавно'
            }
          </p>
        </div>
      </div>

      
      <div className="flex items-center space-x-2">
        {!chat.isAI && (
          <>
            <button className="p-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
              <Phone className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
              <Video className="w-5 h-5" />
            </button>
          </>
        )}
        <button className="p-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};