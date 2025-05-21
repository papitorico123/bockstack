
import { ref, computed } from 'vue';
import { bookPrompts } from '@/utils/bookPrompts';
import useGeminiChat from '@/composables/useGeminiChat'; // Import the new composable

// Variables para el tema
const { isDarkMode, toggleDarkMode } = useDarkMode();

// Variables para los prompts
const selectedPrompt = ref('');
const sinopsisGenre = ref('');
const sinopsisTheme = ref('');
const personajeArchetype = ref('');
const escenaGenre = ref('');
const escenaSetting = ref('');
const recomendacionGenre = ref('');
const recomendacionTheme = ref('');
const recomendacionAuthor = ref('');

// Chat state
const message = ref('');
const response = ref('');
const isLoading = ref(false);
const chatHistory = ref([]);

// Function to validate the form
const validateForm = () => {
  if (selectedPrompt.value === 'sinopsis') {
    return sinopsisGenre.value.trim() !== '' && sinopsisTheme.value.trim() !== '';
  } else if (selectedPrompt.value === 'personaje') {
    return personajeArchetype.value.trim() !== '';
  } else if (selectedPrompt.value === 'escena') {
    return escenaGenre.value.trim() !== '' && escenaSetting.value.trim() !== '';
  } else if (selectedPrompt.value === 'recomendacion') {
    return recomendacionGenre.value.trim() !== '' && recomendacionTheme.value.trim() !== '';
  }
  return false; // No prompt selected
};

// Valida si los campos están completos
const isFormValid = computed(() => {
 return validateForm();
});

// Use the new composable
const { sendMessage: sendApiMessage, response: apiResponse, isLoading: apiLoading, error: apiError } = useGeminiChat();

const sendMessage = async () => {
  // Resetear estados
  apiError.value = '';
  error.value = ''; // Also reset local error state

  if (!validateForm()) {
 error.value = 'Completa todos los campos requeridos';
    return;
  }

  try {
    // Activar estado de carga
    isLoading.value = true;


    // Construir el prompt dinámicamente
    let prompt = '';
    switch (selectedPrompt.value) {
      case 'sinopsis':
        prompt = bookPrompts.sinopsis(
          sinopsisGenre.value,
          sinopsisTheme.value
        );
        break;
      case 'personaje':
        prompt = bookPrompts.personaje(personajeArchetype.value);
        break;
      case 'escena':
        prompt = bookPrompts.escena(escenaGenre.value, escenaSetting.value);
        break;
      case 'recomendacion':
        prompt = bookPrompts.recomendacion(
          recomendacionGenre.value,
          recomendacionTheme.value,
          recomendacionAuthor.value
        );
        break;
      default:
        throw new Error('Tipo de prompt no válido');
    }

    // Eliminar comillas dobles y saltos de línea del medio
    message.value = prompt.replace(/\"/g, '').replace(/\n{2,}/g, '\n');

    // Agregar mensaje del usuario al historial
    chatHistory.value.push({ type: 'user', message: prompt, timestamp: new Date().toLocaleTimeString() });

    // Send message using the composable
    await sendApiMessage(prompt);

    if (apiResponse.value) {
      response.value = apiResponse.value;
      chatHistory.value.push({ type: 'bot', message: response.value, timestamp: new Date().toLocaleTimeString() });
    }
 if (apiError.value) { // Check for API errors and update local error state
 error.value = apiError.value;
    }
  } catch (err) {
    error.value = `Error: ${err.message || 'Problema de conexión'}`;
  } finally {
    isLoading.value = false;
  }
};
