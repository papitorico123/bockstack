<template>
  <div
    :class="{
      'bg-white': !isDarkMode,
      'bg-gray-900': isDarkMode,
      'text-gray-800': !isDarkMode,
      'text-white': isDarkMode,
    }"
    class="shadow-lg rounded-lg p-6 space-y-6 overflow-hidden transition-all duration-300"
  >
    <!-- Título del chatbox -->
    <h2 class="text-3xl font-bold mb-6">Chatbox</h2>

    <!-- Selector de tipo de contenido -->
    <select
      v-model="selectedPrompt"
      :class="{
        'border-primary-light': !isDarkMode,
        'border-gray-600': isDarkMode,
        'bg-white': !isDarkMode,
        'bg-gray-800': isDarkMode,
        'text-gray-800': !isDarkMode,
        'text-white': isDarkMode,
      }"
      class="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-primary-light transition-all"
    >
      <option value="">Selecciona un tipo de contenido</option>
      <option value="sinopsis">Sinopsis</option>
      <option value="personaje">Personaje</option>
      <option value="escena">Escena</option>
      <option value="recomendacion">Recomendación</option>
    </select>

    <!-- Campos dinámicos según el tipo de contenido -->
    <div v-if="selectedPrompt" class="space-y-4">
      <div v-if="selectedPrompt === 'sinopsis'" class="space-y-2">
        <input
          type="text"
          v-model="sinopsisGenre"
          placeholder="Género"
          :class="{
            'border-primary-light': !isDarkMode,
            'border-gray-600': isDarkMode,
            'bg-white': !isDarkMode,
            'bg-gray-800': isDarkMode,
            'text-gray-800': !isDarkMode,
            'text-white': isDarkMode,
          }"
          class="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-primary-light transition-all"
        />
        <input
          type="text"
          v-model="sinopsisTheme"
          placeholder="Tema"
          :class="{
            'border-primary-light': !isDarkMode,
            'border-gray-600': isDarkMode,
            'bg-white': !isDarkMode,
            'bg-gray-800': isDarkMode,
            'text-gray-800': !isDarkMode,
            'text-white': isDarkMode,
          }"
          class="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-primary-light transition-all"
        />
      </div>

      <div v-if="selectedPrompt === 'personaje'" class="space-y-2">
        <input
          type="text"
          v-model="personajeArchetype"
          placeholder="Arquetipo"
          :class="{
            'border-primary-light': !isDarkMode,
            'border-gray-600': isDarkMode,
            'bg-white': !isDarkMode,
            'bg-gray-800': isDarkMode,
            'text-gray-800': !isDarkMode,
            'text-white': isDarkMode,
          }"
          class="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-primary-light transition-all"
        />
      </div>

      <div v-if="selectedPrompt === 'escena'" class="space-y-2">
        <input
          type="text"
          v-model="escenaGenre"
          placeholder="Género"
          :class="{
            'border-primary-light': !isDarkMode,
            'border-gray-600': isDarkMode,
            'bg-white': !isDarkMode,
            'bg-gray-800': isDarkMode,
            'text-gray-800': !isDarkMode,
            'text-white': isDarkMode,
          }"
          class="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-primary-light transition-all"
        />
        <input
          type="text"
          v-model="escenaSetting"
          placeholder="Escenario"
          :class="{
            'border-primary-light': !isDarkMode,
            'border-gray-600': isDarkMode,
            'bg-white': !isDarkMode,
            'bg-gray-800': isDarkMode,
            'text-gray-800': !isDarkMode,
            'text-white': isDarkMode,
          }"
          class="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-primary-light transition-all"
        />
      </div>

      <div v-if="selectedPrompt === 'recomendacion'" class="space-y-2">
        <input
          type="text"
          v-model="recomendacionGenre"
          placeholder="Género"
          :class="{
            'border-primary-light': !isDarkMode,
            'border-gray-600': isDarkMode,
            'bg-white': !isDarkMode,
            'bg-gray-800': isDarkMode,
            'text-gray-800': !isDarkMode,
            'text-white': isDarkMode,
          }"
          class="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-primary-light transition-all"
        />
        <input
          type="text"
          v-model="recomendacionTheme"
          placeholder="Tema"
          :class="{
            'border-primary-light': !isDarkMode,
            'border-gray-600': isDarkMode,
            'bg-white': !isDarkMode,
            'bg-gray-800': isDarkMode,
            'text-gray-800': !isDarkMode,
            'text-white': isDarkMode,
          }"
          class="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-primary-light transition-all"
        />
        <input
          type="text"
          v-model="recomendacionAuthor"
          placeholder="Autor (opcional)"
          :class="{
            'border-primary-light': !isDarkMode,
            'border-gray-600': isDarkMode,
            'bg-white': !isDarkMode,
            'bg-gray-800': isDarkMode,
            'text-gray-800': !isDarkMode,
            'text-white': isDarkMode,
          }"
          class="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-primary-light transition-all"
        />
      </div>
    </div>

    <!-- Contenedor para el textarea y el botón -->
    <div class="relative mt-6">
      <textarea
        v-model="message"
        :class="{
          'border-primary-light': !isDarkMode,
          'border-gray-600': isDarkMode,
          'bg-white': !isDarkMode,
          'bg-gray-800': isDarkMode,
          'text-gray-800': !isDarkMode,
          'text-white': isDarkMode,
        }"
        class="w-full px-4 py-3 border rounded-lg min-h-[150px] pr-16 focus:outline-none focus:ring-2 focus:ring-primary-light transition-all"
        placeholder="Escribe tu mensaje..."
        disabled
      ></textarea>
      <!-- Botón de enviar dentro del textarea -->
      <button
        @click="sendMessage"
        :disabled="isLoading || !isFormValid"
        class="absolute right-3 bottom-3 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold py-2 px-4 rounded-lg hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center shadow-md"
      >
        {{ isLoading ? "Enviando..." : "Enviar" }}
        <i v-if="!isLoading" class="fa-solid fa-arrow-right ml-2"></i>
      </button>
    </div>

    <!-- Mensaje de error -->
    <div
      v-if="error"
      :class="{
        'bg-red-50': !isDarkMode,
        'bg-red-900': isDarkMode,
        'text-red-600': !isDarkMode,
        'text-red-200': isDarkMode,
      }"
      class="p-3 rounded-lg mt-4"
    >
      {{ error }}
    </div>

    <!-- Historial de chat -->
    <div class="chat-history overflow-y-auto max-h-[400px] space-y-4 mt-6">
      <div v-for="(item, index) in chatHistory" :key="index" class="flex space-x-2">
        <!-- Mensaje del usuario -->
        <div v-if="item.type === 'user'" class="user-message self-end">
          <div
            :class="{
              'bg-blue-100': !isDarkMode,
              'bg-blue-600': isDarkMode,
              'text-gray-800': !isDarkMode,
              'text-white': isDarkMode,
            }"
            class="p-3 rounded-lg max-w-[70%] shadow-sm"
          >
            {{ item.message }}
            <div class="text-xs text-gray-500 mt-1">{{ item.timestamp }}</div>
          </div>
        </div>
        <!-- Mensaje del bot -->
        <div v-else class="bot-message self-start">
          <div
            :class="{
              'bg-gray-100': !isDarkMode,
              'bg-gray-700': isDarkMode,
              'text-gray-800': !isDarkMode,
              'text-white': isDarkMode,
            }"
            class="p-3 rounded-lg max-w-[70%] shadow-sm"
          >
            {{ item.message }}
            <div class="text-xs text-gray-500 mt-1">{{ item.timestamp }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { bookPrompts } from '@/utils/bookPrompts';
import { useDarkMode } from '@/composables/useDarkMode';

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

const message = ref('');
const response = ref('');
const error = ref('');
const isLoading = ref(false);
const chatHistory = ref([]);

// Valida si los campos están completos
const isFormValid = computed(() => {
  if (selectedPrompt.value === 'sinopsis') {
    return sinopsisGenre.value.trim() !== '' && sinopsisTheme.value.trim() !== '';
  } else if (selectedPrompt.value === 'personaje') {
    return personajeArchetype.value.trim() !== '';
  } else if (selectedPrompt.value === 'escena') {
    return escenaGenre.value.trim() !== '' && escenaSetting.value.trim() !== '';
  } else if (selectedPrompt.value === 'recomendacion') {
    return recomendacionGenre.value.trim() !== '' && recomendacionTheme.value.trim() !== '';
  }
  return false;
});

const sendMessage = async () => {
  // Resetear estados
  error.value = '';

  // Validación general
  if (!isFormValid.value) {
    error.value = 'Completa todos los campos requeridos';
    return;
  }

  try {
    // Activar estado de carga
    isLoading.value = true;

    const genAI = new GoogleGenerativeAI(useRuntimeConfig().public.geminiApiKey);

    const model = genAI.getGenerativeModel({
      model: 'gemini-pro',
    });

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

    const chat = model.startChat({
      history: [],
      generationConfig: {
        maxOutputTokens: 500,
      },
    });

    // Agregar mensaje del usuario al historial
    chatHistory.value.push({ type: 'user', message: prompt, timestamp: new Date().toLocaleTimeString() });

    const result = await chat.sendMessage(prompt);

    if (result) {
      response.value = result.response.text();
      chatHistory.value.push({ type: 'bot', message: response.value, timestamp: new Date().toLocaleTimeString() });
    } else {
      throw new Error('No se pudo obtener respuesta');
    }
  } catch (err) {
    console.error('Error detallado:', err);
    error.value = `Error: ${err.message || 'Problema de conexión'}`;
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.chat-history {
  scrollbar-width: thin;
  scrollbar-color: #ccc transparent;
}

.chat-history::-webkit-scrollbar {
  width: 8px;
}

.chat-history::-webkit-scrollbar-thumb {
  background-color: #ccc;
  border-radius: 4px;
}

.chat-history::-webkit-scrollbar-track {
  background-color: transparent;
}

.user-message div,
.bot-message div {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.user-message div:hover,
.bot-message div:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>