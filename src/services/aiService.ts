 interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;

export const callGeminiAI = async (message: string): Promise<string> => {
  if (!GEMINI_API_KEY) {
    throw new Error('Gemini API ключ не найден. Добавьте VITE_GEMINI_API_KEY в файл .env');
  }

  try {
    const response = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: message
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Gemini API Error:', errorData);
      throw new Error(`Ошибка API: ${response.status} - ${errorData.error?.message || 'Неизвестная ошибка'}`);
    }

    const data: GeminiResponse = await response.json();
    
    if (!data.candidates || data.candidates.length === 0) {
      throw new Error('Нет ответа от AI');
    }

    const aiResponse = data.candidates[0]?.content?.parts[0]?.text;
    
    if (!aiResponse) {
      throw new Error('Пустой ответ от AI');
    }

    return aiResponse;
  } catch (error) {
    console.error('Ошибка вызова Gemini AI:', error);
    
    // Fallback на симуляцию если API не работает
    return simulateAIResponse(message);
  }
};

// Оставляем старую функцию как fallback
export const simulateAIResponse = async (message: string): Promise<string> => {
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
  
  const responses = [
    `Извините, у меня проблемы с подключением к AI сервису. Вы написали: "${message}"`,
    `Сейчас я работаю в автономном режиме. Ваше сообщение: "${message}"`,
    `Временно недоступен полный AI функционал. Получено: "${message}"`,
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
};

// Основная функция для использования в чате
export const getAIResponse = async (message: string): Promise<string> => {
  try {
    
    return await callGeminiAI(message);
  } catch (error) {
    console.warn('Fallback to simulation:', error);
     
    return await simulateAIResponse(message);
  }
};