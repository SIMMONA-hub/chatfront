import React from 'react';
import type { Message as MessageType } from '../../types';
import { Check, CheckCheck, Clock } from 'lucide-react';

interface MessageProps {
  message: MessageType;
  isConsecutive?: boolean;  
}

export const Message: React.FC<MessageProps> = ({ message, isConsecutive = false }) => {
  const isFromUser = message.isFromUser;
  
  const getStatusIcon = () => {
    switch (message.status) {
      case 'sending':
        return <Clock className="w-3 h-3 text-gray-400" />;
      case 'sent':
        return <Check className="w-3 h-3 text-blue-400" />;
      case 'delivered':
        return <CheckCheck className="w-3 h-3 text-blue-400" />;
      case 'read':
        return <CheckCheck className="w-3 h-3 text-blue-500" />;
      default:
        return null;
    }
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('ru', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  return (
    <div className={`flex ${isFromUser ? 'justify-end' : 'justify-start'} ${isConsecutive ? 'mb-1' : 'mb-4'} group`}>
      <div
        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl relative ${
          isFromUser
            ? 'bg-blue-500 text-white rounded-br-md'
            : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-md shadow-sm border border-gray-200 dark:border-gray-600'
        } ${isConsecutive ? 'rounded-t-lg' : ''}`}
      >
       
        <p className="text-sm whitespace-pre-wrap break-words leading-relaxed">
          {message.text}
        </p>
        
         
        <div className={`flex items-center justify-end mt-1 space-x-1 ${isFromUser ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'}`}>
          <span className="text-xs opacity-75">
            {formatTime(message.timestamp)}
          </span>
          
          {isFromUser && (
            <div className="flex items-center">
              {getStatusIcon()}
            </div>
          )}
        </div>
 
        {!isConsecutive && (
          <div
            className={`absolute bottom-0 w-4 h-4 ${
              isFromUser
                ? 'right-0 transform translate-x-1 bg-blue-500'
                : 'left-0 transform -translate-x-1 bg-white dark:bg-gray-700 border-l border-b border-gray-200 dark:border-gray-600'
            } ${isFromUser ? 'rounded-bl-full' : 'rounded-br-full'}`}
          />
        )}
      </div>
    </div>
  );
};