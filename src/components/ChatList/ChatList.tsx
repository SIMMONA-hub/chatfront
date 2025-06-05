import React, { useState } from 'react';
import { Search, MessageCircle, Bot, Users, Plus } from 'lucide-react';
import { ChatItem } from './ChatItem';
import { mockChats } from '../../utils/mockData';
import { useSearch } from '../Layout/hooks/useSearch';

interface ChatListProps {
  selectedChatId: string | null;
  onChatSelect: (chatId: string) => void;
}

export const ChatList: React.FC<ChatListProps> = ({
  selectedChatId,
  onChatSelect,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'ai' | 'personal'>('all');
  const { query, setQuery, filteredItems } = useSearch(mockChats, 'name');

  const getFilteredChats = () => {
    let filtered = filteredItems;
    if (activeTab === 'ai') {
      filtered = filteredItems.filter(chat => chat.isAI);
    } else if (activeTab === 'personal') {
      filtered = filteredItems.filter(chat => !chat.isAI);
    }
    return filtered;
  };

  const finalChats = getFilteredChats();
  const aiChats = finalChats.filter(chat => chat.isAI);
  const personalChats = finalChats.filter(chat => !chat.isAI);

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-800">
       
      <div className="p-4 border-b border-gray-200 dark:border-gray-600">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
            <MessageCircle className="w-6 h-6 mr-2 text-blue-500" />
            ChatFront
          </h1>
          <button className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-full transition-colors">
            <Plus className="w-5 h-5" />
          </button>
        </div>
        
         
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Поиск чатов..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-gray-600 transition-all text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
 
        <div className="flex mt-3 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('all')}
            className={`flex-1 py-1.5 px-3 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'all'
                ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Все
          </button>
          <button
            onClick={() => setActiveTab('ai')}
            className={`flex-1 py-1.5 px-3 rounded-md text-sm font-medium transition-colors flex items-center justify-center ${
              activeTab === 'ai'
                ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <Bot className="w-4 h-4 mr-1" />
            AI
          </button>
          <button
            onClick={() => setActiveTab('personal')}
            className={`flex-1 py-1.5 px-3 rounded-md text-sm font-medium transition-colors flex items-center justify-center ${
              activeTab === 'personal'
                ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <Users className="w-4 h-4 mr-1" />
            Люди
          </button>
        </div>
      </div>

     
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'all' && (
          <>
           
            {aiChats.length > 0 && (
              <div>
                <div className="px-4 py-2 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-100 dark:border-gray-600/50">
                  <h3 className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide flex items-center">
                    <Bot className="w-3 h-3 mr-1" />
                    AI Ассистенты ({aiChats.length})
                  </h3>
                </div>
                {aiChats.map((chat) => (
                  <ChatItem
                    key={chat.id}
                    chat={chat}
                    isSelected={selectedChatId === chat.id}
                    onClick={() => onChatSelect(chat.id)}
                  />
                ))}
              </div>
            )}

    
            {personalChats.length > 0 && (
              <div>
                {aiChats.length > 0 && (
                  <div className="px-4 py-2 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-100 dark:border-gray-600/50">
                    <h3 className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide flex items-center">
                      <Users className="w-3 h-3 mr-1" />
                      Личные чаты ({personalChats.length})
                    </h3>
                  </div>
                )}
                {personalChats.map((chat) => (
                  <ChatItem
                    key={chat.id}
                    chat={chat}
                    isSelected={selectedChatId === chat.id}
                    onClick={() => onChatSelect(chat.id)}
                  />
                ))}
              </div>
            )}
          </>
        )}
 
        {activeTab !== 'all' && (
          <>
            {finalChats.map((chat) => (
              <ChatItem
                key={chat.id}
                chat={chat}
                isSelected={selectedChatId === chat.id}
                onClick={() => onChatSelect(chat.id)}
              />
            ))}
          </>
        )}

         
        {finalChats.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <Search className="w-12 h-12 text-gray-300 dark:text-gray-600 mb-3" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
              Чаты не найдены
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Попробуйте изменить поисковый запрос
            </p>
          </div>
        )}
      </div>
    </div>
  );
};