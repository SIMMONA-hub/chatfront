import React from 'react';

interface TypingIndicatorProps {
  userName?: string;
}

export const TypingIndicator: React.FC<TypingIndicatorProps> = ({ userName = "AI" }) => {
  return (
    <div className="flex justify-start mb-4">
      <div className="bg-white dark:bg-gray-700 rounded-2xl rounded-bl-md shadow-sm border border-gray-200 dark:border-gray-600 px-4 py-3 relative">
        <div className="flex items-center space-x-1">
          <span className="text-sm text-gray-600 dark:text-gray-300 mr-2">{userName} печатает</span>
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
        
         
        <div className="absolute bottom-0 left-0 transform -translate-x-1 w-4 h-4 bg-white dark:bg-gray-700 border-l border-b border-gray-200 dark:border-gray-600 rounded-br-full" />
      </div>
    </div>
  );
};
