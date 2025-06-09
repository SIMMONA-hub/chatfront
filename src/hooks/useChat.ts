 // src/hooks/useChat.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai' | 'contact';
  timestamp: Date;
}

// Функции для работы с localStorage
const getStoredMessages = (): Record<string, Message[]> => {
  try {
    const savedMessages = localStorage.getItem('chatMessages');
    if (savedMessages) {
      const parsed = JSON.parse(savedMessages);
      // Преобразуем строки timestamp обратно в Date объекты
      Object.keys(parsed).forEach(chatId => {
        parsed[chatId] = parsed[chatId].map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
      });
      return parsed;
    }
  } catch (error) {
    console.error('Ошибка загрузки сообщений:', error);
  }
  
  // Возвращаем начальные сообщения, если ничего не сохранено
  return {
    'ai-assistant': [
      {
        id: '1',
        text: 'Привет! Я ваш AI помощник. Как дела?',
        sender: 'ai',
        timestamp: new Date(),
      },
    ],
    'john-doe': [
      {
        id: '1',
        text: 'Привет! Как дела?',
        sender: 'contact',
        timestamp: new Date(),
      },
    ],
  };
};

const saveMessages = (messages: Record<string, Message[]>) => {
  try {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  } catch (error) {
    console.error('Ошибка сохранения сообщений:', error);
  }
};

// Хук для получения сообщений из localStorage
export function useChatMessages() {
  return useQuery({
    queryKey: ['chatMessages'],
    queryFn: () => getStoredMessages(),
    staleTime: Infinity, // Данные всегда актуальны для localStorage
  });
}

// Хук для добавления сообщения
export function useAddMessage() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ chatId, message }: { chatId: string; message: Message }) => {
      const currentMessages = queryClient.getQueryData<Record<string, Message[]>>(['chatMessages']) || {};
      const updatedMessages = {
        ...currentMessages,
        [chatId]: [...(currentMessages[chatId] || []), message],
      };
      
      saveMessages(updatedMessages);
      return updatedMessages;
    },
    onSuccess: (updatedMessages) => {
      queryClient.setQueryData(['chatMessages'], updatedMessages);
    },
  });
}

// Хук для очистки истории чата
export function useClearChatHistory() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async () => {
      const initialMessages = {
        'ai-assistant': [
          {
            id: '1',
            text: 'Привет! Я ваш AI помощник. Как дела?',
            sender: 'ai' as const,
            timestamp: new Date(),
          },
        ],
        'john-doe': [
          {
            id: '1',
            text: 'Привет! Как дела?',
            sender: 'contact' as const,
            timestamp: new Date(),
          },
        ],
      };
      
      localStorage.removeItem('chatMessages');
      return initialMessages;
    },
    onSuccess: (initialMessages) => {
      queryClient.setQueryData(['chatMessages'], initialMessages);
    },
  });
}