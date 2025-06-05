 import type { Chat, Message, User } from '../types';

export const currentUser: User = {
  id: 'current-user',
  name: 'Вы',
  avatar: '👤',
  isOnline: true,
};

export const mockChats: Chat[] = [
  {
    id: 'ai-assistant',
    name: 'AI Помощник',
    avatar: '🤖',
    unreadCount: 0,
    isAI: true,
    isOnline: true,
    type: 'ai',
    description: 'Умный ассистент для решения ваших задач',
    lastMessage: {
      id: '1',
      text: 'Привет! Я ваш AI помощник. Чем могу помочь?',
      timestamp: new Date(Date.now() - 60000),
      isFromUser: false,
      status: 'read',
    },
  },
  {
    id: 'john-doe',
    name: 'Джон Доу',
    avatar: '👨‍💼',
    unreadCount: 2,
    isAI: false,
    isOnline: true,
    type: 'personal',
    lastMessage: {
      id: '2',
      text: 'Привет! Как дела с проектом?',
      timestamp: new Date(Date.now() - 45000),
      isFromUser: false,
      status: 'delivered',
    },
  },
];

export const mockMessages: Record<string, Message[]> = {
  'ai-assistant': [
    {
      id: '1',
      text: 'Привет! Я ваш AI помощник. Чем могу помочь сегодня?',
      timestamp: new Date(Date.now() - 120000),
      isFromUser: false,
      status: 'read',
    },
  ],
  'john-doe': [
    {
      id: '2',
      text: 'Привет! Как продвигается наш проект?',
      timestamp: new Date(Date.now() - 180000),
      isFromUser: false,
      status: 'read',
    },
  ],
};