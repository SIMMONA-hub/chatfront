import React, { useState } from 'react';
import { ChatHeader } from './ChatHeader';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';
import { mockChats, mockMessages } from '../../utils/mockData';
import { getAIResponse } from '../../services/aiService';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import type { Message } from '../../types';

interface ChatAreaProps {
  chatId: string;
  onBack?: () => void;
}

export const ChatArea: React.FC<ChatAreaProps> = ({ chatId, onBack }) => {
  const [messages, setMessages] = useLocalStorage<Record<string, Message[]>>('chatMessages', mockMessages);
  const [isTyping, setIsTyping] = useState(false);
  
  const chat = mockChats.find(c => c.id === chatId);
  const chatMessages = messages[chatId] || [];

  if (!chat) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-400">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-xl font-medium">Чат не найден</h2>
          <p className="mt-2">Выберите чат из списка</p>
        </div>
      </div>
    );
  }

  const handleSendMessage = async (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      timestamp: new Date(),
      isFromUser: true,
      status: 'sending',
    };

 
    setMessages(prev => ({
      ...prev,
      [chatId]: [...(prev[chatId] || []), userMessage],
    }));

    
    setTimeout(() => {
      setMessages(prev => ({
        ...prev,
        [chatId]: prev[chatId].map(msg => 
          msg.id === userMessage.id 
            ? { ...msg, status: 'sent' as const }
            : msg
        ),
      }));
    }, 500);

   
    setTimeout(() => {
      setMessages(prev => ({
        ...prev,
        [chatId]: prev[chatId].map(msg => 
          msg.id === userMessage.id 
            ? { ...msg, status: 'delivered' as const }
            : msg
        ),
      }));
    }, 1000);
 
    if (chat.isAI) {
      setIsTyping(true);
      
      try {
        
        const aiResponse = await getAIResponse(text);
        
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: aiResponse,
          timestamp: new Date(),
          isFromUser: false,
          status: 'read',
        };

        setMessages(prev => ({
          ...prev,
          [chatId]: [...(prev[chatId] || []), aiMessage],
        }));
 
        setMessages(prev => ({
          ...prev,
          [chatId]: prev[chatId].map(msg => 
            msg.id === userMessage.id 
              ? { ...msg, status: 'read' as const }
              : msg
          ),
        }));
      } catch (error) {
        console.error('Ошибка AI ответа:', error);
        
        
        const errorMessage: Message = {
          id: (Date.now() + 2).toString(),
          text: 'Извините, произошла ошибка при получении ответа от AI. Попробуйте еще раз.',
          timestamp: new Date(),
          isFromUser: false,
          status: 'read',
        };

        setMessages(prev => ({
          ...prev,
          [chatId]: [...(prev[chatId] || []), errorMessage],
        }));
      } finally {
        setIsTyping(false);
      }
    } else {
      
      setTimeout(() => {
        setMessages(prev => ({
          ...prev,
          [chatId]: prev[chatId].map(msg => 
            msg.id === userMessage.id 
              ? { ...msg, status: 'read' as const }
              : msg
          ),
        }));
      }, 2000);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-800">
      <ChatHeader chat={chat} onBack={onBack} />
      <MessageList messages={chatMessages} isTyping={isTyping} chat={chat} />
      <MessageInput 
        onSendMessage={handleSendMessage} 
        disabled={isTyping}
        placeholder={chat.isAI ? "Задайте вопрос AI..." : "Введите сообщение..."}
      />
    </div>
  );
};