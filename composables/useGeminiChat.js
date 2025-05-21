import { ref } from 'vue';
import { GoogleGenerativeAI } from '@google/generative-ai';

export function useGeminiChat() {
  const response = ref('');
  const error = ref('');
  const isLoading = ref(false);

  const sendMessage = async (prompt) => {
    isLoading.value = true;
    error.value = '';
    response.value = '';

    try {
      const genAI = new GoogleGenerativeAI(useRuntimeConfig().public.geminiApiKey);
      const model = genAI.getGenerativeModel({
        model: 'gemini-pro',
      });

      const chat = model.startChat({
        history: [],
        generationConfig: {
          maxOutputTokens: 500,
        },
      });

      const result = await chat.sendMessage(prompt);

      if (result) {
        response.value = result.response.text();
      } else {
        throw new Error('No se pudo obtener respuesta');
      }
    } catch (err) {
      console.error('Error detailed:', err);
      error.value = `Error: ${err.message || 'Connection problem'}`;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    response,
    error,
    isLoading,
    sendMessage,
  };
}