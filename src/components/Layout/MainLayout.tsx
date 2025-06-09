import React, { useState, useRef, useEffect } from 'react';
import OpenAI from 'openai';
import { useChatMessages, useAddMessage, useClearChatHistory } from '../../hooks/useChat';
interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai' | 'contact';
  timestamp: Date;
}

interface MainLayoutProps {
  selectedChatId: string | null;
  onChatSelect: (chatId: string) => void;
}

export default function MainLayout({
  selectedChatId,
  onChatSelect,
}: MainLayoutProps) {
  // Используем TanStack Query хуки
  const { data: messages = {}, isLoading: messagesLoading } = useChatMessages();
  const addMessageMutation = useAddMessage();
  const clearHistoryMutation = useClearChatHistory();

  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Инициализация OpenAI
  const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const clearChatHistory = () => {
    const confirmClear = window.confirm('Вы уверены, что хотите очистить всю историю чатов?');
    if (confirmClear) {
      clearHistoryMutation.mutate();
    }
  };

  const callAI = async (message: string): Promise<string> => {
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: message
          }
        ],
        max_tokens: 1000,
        temperature: 0.7,
      });

      return completion.choices[0]?.message?.content || 'Извините, не получил ответ.';
    } catch (error) {
      console.error('Ошибка вызова OpenAI API:', error);
      if (error instanceof Error) {
        throw new Error(`OpenAI API Error: ${error.message}`);
      }
      throw new Error('Не удалось получить ответ от AI. Проверьте API ключ и попробуйте еще раз.');
    }
  };

  const sendMessage = async () => {
    if (!inputText.trim() || !selectedChatId) return;

    const messageText = inputText;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: 'user',
      timestamp: new Date(),
    };

    // Добавляем сообщение пользователя через мутацию
    addMessageMutation.mutate({ chatId: selectedChatId, message: newMessage });
    setInputText('');

    // Если это AI чат, получаем ответ
    if (selectedChatId === 'ai-assistant') {
      setIsLoading(true);
      try {
        const aiResponse = await callAI(messageText);
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: aiResponse,
          sender: 'ai',
          timestamp: new Date(),
        };

        addMessageMutation.mutate({ chatId: selectedChatId, message: aiMessage });
      } catch (error) {
        console.error('Ошибка API:', error);
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: 'Извините, произошла ошибка при получении ответа. Проверьте API ключ.',
          sender: 'ai',
          timestamp: new Date(),
        };

        addMessageMutation.mutate({ chatId: selectedChatId, message: errorMessage });
      } finally {
        setIsLoading(false);
      }
    } else if (selectedChatId === 'john-doe') {
      setIsLoading(true);
      try {
        const johnPrompt = `Ты обычный человек по имени John Doe. Отвечай дружелюбно, коротко и по-человечески на сообщение: "${messageText}"`;
        const johnResponse = await callAI(johnPrompt);
        const johnMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: johnResponse,
          sender: 'contact',
          timestamp: new Date(),
        };

        addMessageMutation.mutate({ chatId: selectedChatId, message: johnMessage });
      } catch (error) {
        console.error('Ошибка получения ответа от John:', error);
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: 'Извините, не могу ответить прямо сейчас 😅',
          sender: 'contact',
          timestamp: new Date(),
        };

        addMessageMutation.mutate({ chatId: selectedChatId, message: errorMessage });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Показываем загрузку, если сообщения еще загружаются
  if (messagesLoading) {
    return (
      <div className="flex h-screen bg-gray-100 dark:bg-gray-900 items-center justify-center">
        <div className="text-gray-500">Загрузка чатов...</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <div className="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">ChatFront</h1>
            <button
              onClick={clearChatHistory}
              className="text-xs px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              title="Очистить историю"
              disabled={clearHistoryMutation.isPending}
            >
              {clearHistoryMutation.isPending ? '⏳' : '🗑️'}
            </button>
          </div>
          
          {/* AI Assistant */}
          <div 
            className={`p-3 mb-2 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer rounded-lg transition-colors ${
              selectedChatId === 'ai-assistant' ? 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500' : ''
            }`}
            onClick={() => onChatSelect('ai-assistant')}
          >
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white">
                🤖
              </div>
              <div className="ml-3">
                <h3 className="font-medium text-gray-900 dark:text-white">AI Assistant</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {isLoading && selectedChatId === 'ai-assistant' ? 'Печатает...' : 'Умный помощник'}
                </p>
              </div>
            </div>
          </div>

          {/* John Doe */}
          <div 
            className={`p-3 mb-2 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer rounded-lg transition-colors ${
              selectedChatId === 'john-doe' ? 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500' : ''
            }`}
            onClick={() => onChatSelect('john-doe')}
          >
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white">
                👤
              </div>
              <div className="ml-3">
                <h3 className="font-medium text-gray-900 dark:text-white">John Doe</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {isLoading && selectedChatId === 'john-doe' ? 'Печатает...' : 'В сети'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-gray-50 dark:bg-gray-900">
        {selectedChatId ? (
          <>
            {/* Chat Header */}
            <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {selectedChatId === 'ai-assistant' ? '🤖 AI Assistant' : '👤 John Doe'}
                </h2>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {selectedChatId === 'ai-assistant' ? 'Готов помочь' : 'В сети'}
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages[selectedChatId]?.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg shadow-sm ${
                      message.sender === 'user'
                        ? 'bg-blue-500 text-white rounded-br-sm'
                        : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-bl-sm'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{message.text}</p>
                    <p className={`text-xs mt-1 ${
                      message.sender === 'user' 
                        ? 'text-blue-100' 
                        : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 px-4 py-2 rounded-lg rounded-bl-sm shadow-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      <span className="text-sm text-gray-500 ml-2">
                        {selectedChatId === 'ai-assistant' ? 'AI думает...' : 'John печатает...'}
                      </span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
              <div className="flex space-x-2">
                <input 
                  type="text" 
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Введите сообщение..." 
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  disabled={isLoading || addMessageMutation.isPending}
                />
                <button 
                  onClick={sendMessage}
                  disabled={!inputText.trim() || isLoading || addMessageMutation.isPending}
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {isLoading || addMessageMutation.isPending ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Отправка...</span>
                    </>
                  ) : (
                    <>
                      <span>Отправить</span>
                      <span>📤</span>
                    </>
                  )}
                </button>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                💡 Нажмите Enter для отправки сообщения
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="text-8xl mb-6">💬</div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Добро пожаловать в ChatFront!
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Выберите чат из списка слева, чтобы начать общение
              </p>
              <div className="text-xs text-gray-500 dark:text-gray-500">
                🤖 AI Assistant - для общения с искусственным интеллектом<br/>
                👤 John Doe - для обычного чата
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}