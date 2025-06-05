import React, { useEffect, useRef } from 'react';
import { Message } from './Message';
import { TypingIndicator } from './TypingIndicator';
import type { Message as MessageType, Chat } from '../../types';

interface MessageListProps {
  messages: MessageType[];
  isTyping?: boolean;
  chat?: Chat;
}

export const MessageList: React.FC<MessageListProps> = ({ 
  messages, 
  isTyping = false,
  chat 
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);
 
  const groupMessages = (messages: MessageType[]) => {
    const grouped: (MessageType & { isConsecutive?: boolean })[] = [];
    
    for (let i = 0; i < messages.length; i++) {
      const current = messages[i];
      const previous = messages[i - 1];
      
      const isConsecutive = previous && 
        previous.isFromUser === current.isFromUser &&
        (new Date(current.timestamp).getTime() - new Date(previous.timestamp).getTime()) < 300000; // 5 минут
      
      grouped.push({
        ...current,
        isConsecutive
      });
    }
    
    return grouped;
  };

  const groupedMessages = groupMessages(messages);

  if (messages.length === 0 && !isTyping) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-8">
        <div className="text-center">
          <div className="text-6xl mb-4">
            {chat?.isAI ? '🤖' : '💬'}
          </div>
          <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
            {chat?.isAI ? 'Начните общение с AI' : 'Начните разговор'}
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            {chat?.isAI 
              ? 'Задайте любой вопрос, и AI поможет вам!' 
              : 'Отправьте первое сообщение!'
            }
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 px-4 py-4 custom-scrollbar">
    
      {messages.length > 0 && (
        <div className="flex justify-center mb-6">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-600">
            {new Date(messages[0].timestamp).toLocaleDateString('ru', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}
          </div>
        </div>
      )}

  
      {groupedMessages.map((message) => (
        <Message 
          key={message.id} 
          message={message} 
          isConsecutive={message.isConsecutive}
        />
      ))}
      
     
      {isTyping && (
        <TypingIndicator userName={chat?.name} />
      )}
      
      <div ref={messagesEndRef} />
    </div>
  );
};