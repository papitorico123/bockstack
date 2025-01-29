<template>
  <div
    :class="{
      'bg-white': !isDarkMode,
      'bg-gray-800': isDarkMode,
      'text-gray-800': !isDarkMode,
      'text-white': isDarkMode,
    }"
    class="shadow-md rounded-md p-4 space-y-4"
  >
    <div class="flex justify-between items-center">
      <h2 :class="{ 'text-black': !isDarkMode, 'text-white': isDarkMode }">
        Chat
      </h2>
      <button
        @click="toggleDarkMode"
        class="bg-secondary hover:bg-secondary-dark text-white font-semibold py-2 px-4 rounded-md transition-colors"
      >
        {{ isDarkMode ? "Claro" : "Oscuro" }}
      </button>
    </div>
    <div class="flex flex-col space-y-4">
      <select
        v-model="selectedPrompt"
        :class="{
          'border-primary-light': !isDarkMode,
          'border-gray-600': isDarkMode,
          'bg-white': !isDarkMode,
          'bg-gray-700': isDarkMode,
        }"
        class="border rounded-md"
      >
        <option value="">Selecciona un tipo de contenido</option>
        <option value="sinopsis">Sinopsis</option>
        <option value="personaje">Personaje</option>
        <option value="escena">Escena</option>
        <option value="recomendacion">Recomendación</option>
      </select>

      <div v-if="selectedPrompt === 'sinopsis'">
        <input
          type="text"
          v-model="sinopsisGenre"
          placeholder="Género"
          :class="{
            'border-primary-light': !isDarkMode,
            'border-gray-600': isDarkMode,
            'bg-white': !isDarkMode,
            'bg-gray-700': isDarkMode,
            'text-black': !isDarkMode,
            'text-white': isDarkMode,
          }"
          class="border rounded-md px-2 py-1"
        />
        <input
          type="text"
          v-model="sinopsisTheme"
          placeholder="Tema"
          :class="{
            'border-primary-light': !isDarkMode,
            'border-gray-600': isDarkMode,
            'bg-white': !isDarkMode,
            'bg-gray-700': isDarkMode,
            'text-black': !isDarkMode,
            'text-white': isDarkMode,
          }"
          class="border rounded-md px-2 py-1"
        />
      </div>

      <div v-if="selectedPrompt === 'personaje'">
        <input
          type="text"
          v-model="personajeArchetype"
          placeholder="Arquetipo"
          :class="{
            'border-primary-light': !isDarkMode,
            'border-gray-600': isDarkMode,
            'bg-white': !isDarkMode,
            'bg-gray-700': isDarkMode,
            'text-black': !isDarkMode,
            'text-white': isDarkMode,
          }"
          class="border rounded-md px-2 py-1"
        />
      </div>

      <div v-if="selectedPrompt === 'escena'">
        <input
          type="text"
          v-model="escenaGenre"
          placeholder="Género"
          :class="{
            'border-primary-light': !isDarkMode,
            'border-gray-600': isDarkMode,
            'bg-white': !isDarkMode,
            'bg-gray-700': isDarkMode,
            'text-black': !isDarkMode,
            'text-white': isDarkMode,
          }"
          class="border rounded-md px-2 py-1"
        />
        <input
          type="text"
          v-model="escenaSetting"
          placeholder="Escenario"
          :class="{
            'border-primary-light': !isDarkMode,
            'border-gray-600': isDarkMode,
            'bg-white': !isDarkMode,
            'bg-gray-700': isDarkMode,
            'text-black': !isDarkMode,
            'text-white': isDarkMode,
          }"
          class="border rounded-md px-2 py-1"
        />
      </div>

      <div v-if="selectedPrompt === 'recomendacion'">
        <input
          type="text"
          v-model="recomendacionGenre"
          placeholder="Género"
          :class="{
            'border-primary-light': !isDarkMode,
            'border-gray-600': isDarkMode,
            'bg-white': !isDarkMode,
            'bg-gray-700': isDarkMode,
            'text-black': !isDarkMode,
            'text-white': isDarkMode,
          }"
          class="border rounded-md px-2 py-1"
        />
        <input
          type="text"
          v-model="recomendacionTheme"
          placeholder="Tema"
          :class="{
            'border-primary-light': !isDarkMode,
            'border-gray-600': isDarkMode,
            'bg-white': !isDarkMode,
            'bg-gray-700': isDarkMode,
            'text-black': !isDarkMode,
            'text-white': isDarkMode,
          }"
          class="border rounded-md px-2 py-1"
        />
        <input
          type="text"
          v-model="recomendacionAuthor"
          placeholder="Autor (opcional)"
          :class="{
            'border-primary-light': !isDarkMode,
            'border-gray-600': isDarkMode,
            'bg-white': !isDarkMode,
            'bg-gray-700': isDarkMode,
            'text-black': !isDarkMode,
            'text-white': isDarkMode,
          }"
          class="border rounded-md px-2 py-1"
        />
      </div>

      <textarea
        v-model="message"
        :class="{
          'border-primary-light': !isDarkMode,
          'border-gray-600': isDarkMode,
          'bg-white': !isDarkMode,
          'bg-gray-700': isDarkMode,
          'text-black': !isDarkMode,
          'text-white': isDarkMode,
        }"
        class="w-full px-4 py-2 border rounded-md min-h-[100px]"
        placeholder="Escribe tu mensaje..."
        disabled
      ></textarea>

      <button
        @click="sendMessage"
        :disabled="isLoading || !isFormValid"
        class="bg-secondary hover:bg-secondary-dark text-white font-semibold py-2 px-6 rounded-md transition-colors disabled:opacity-50"
      >
        {{ isLoading ? "Enviando..." : "Enviar" }}
      </button>

      <div v-if="error" class="text-red-500 bg-red-50 p-2 rounded">
        {{ error }}
      </div>

      <!-- Historial de chat -->
      <div class="chat-history overflow-y-auto max-h-[300px] space-y-3">
        <div v-for="(item, index) in chatHistory" :key="index">
          <!-- Mensaje del usuario -->
          <div v-if="item.type === 'user'" class="user-message flex justify-end">
            <div
              :class="{
                'bg-blue-100': !isDarkMode,
                'bg-blue-600': isDarkMode,
                'text-gray-800': !isDarkMode,
                'text-white': isDarkMode,
              }"
              class="p-3 rounded-md max-w-[70%]"
            >
              {{ item.message }}
            </div>
          </div>
          <!-- Mensaje del bot -->
          <div v-else class="bot-message flex justify-start">
            <div
              :class="{
                'bg-gray-100': !isDarkMode,
                'bg-gray-600': isDarkMode,
                'text-gray-800': !isDarkMode,
                'text-white': isDarkMode,
              }"
              class="p-3 rounded-md max-w-[70%]"
            >
              {{ item.message }}
            </div>
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
const chatHistory = ref([]); // Nuevo: Historial de chat

// Valida si los campos estan completos
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
  //response.value = '';
  //message.value = '';

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

    message.value = prompt; // Actualiza el campo de texto
    // Añadir un contexto o sistema de instrucciones
    const chat = model.startChat({
      history: [],
      generationConfig: {
        maxOutputTokens: 500,
      },
    });

    // Agregar mensaje del usuario al historial
    chatHistory.value.push({ type: 'user', message: prompt });

    const result = await chat.sendMessage(prompt);

    if (result) {
      response.value = result.response.text();
      // Agregar respuesta del bot al historial
      chatHistory.value.push({ type: 'bot', message: response.value });
    } else {
      throw new Error('No se pudo obtener respuesta');
    }
  } catch (err) {
    console.error('Error detallado:', err);
    error.value = `Error: ${err.message || 'Problema de conexión'}`;
  } finally {
    // Desactivar estado de carga
    isLoading.value = false;
  }
};
</script>
