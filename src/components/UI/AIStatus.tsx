import React from 'react';
import { Wifi, WifiOff, Bot } from 'lucide-react';

interface AIStatusProps {
  isOnline: boolean;
  isConnecting?: boolean;
}

export const AIStatus: React.FC<AIStatusProps> = ({ isOnline, isConnecting = false }) => {
  if (isConnecting) {
    return (
      <div className="flex items-center text-yellow-500 text-xs">
        <Bot className="w-3 h-3 mr-1 animate-pulse" />
        Подключение...
      </div>
    );
  }

  return (
    <div className={`flex items-center text-xs ${isOnline ? 'text-green-500' : 'text-red-500'}`}>
      {isOnline ? (
        <>
          <Wifi className="w-3 h-3 mr-1" />
          AI онлайн
        </>
      ) : (
        <>
          <WifiOff className="w-3 h-3 mr-1" />
          AI оффлайн
        </>
      )}
    </div>
  );
};