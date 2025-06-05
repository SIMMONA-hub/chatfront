export interface Message {
  id: string;
  text: string;
  timestamp: Date;
  isFromUser: boolean;
  status: 'sending' | 'sent' | 'delivered' | 'read';
  replyTo?: string; // ID сообщения на которое отвечаем
}

export interface Chat {
  id: string;
  name: string;
  avatar: string;
  lastMessage?: Message;
  unreadCount: number;
  isAI: boolean;
  isOnline: boolean;
  type: 'personal' | 'ai';
  description?: string;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
}

export interface AppTheme {
  name: 'light' | 'dark';
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    messageOut: string;
    messageIn: string;
  };
}