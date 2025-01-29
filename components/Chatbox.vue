<template>
  <div class="bg-white shadow-md rounded-md p-4 space-y-4">
    <div class="flex flex-col space-y-4">
      <textarea
        v-model="message"
        class="w-full px-4 py-2 text-gray-900 border border-primary-light rounded-md min-h-[100px]"
        placeholder="Escribe tu mensaje..."
      ></textarea>
      
      <button 
        @click="sendMessage" 
        :disabled="isLoading"
        class="bg-secondary hover:bg-secondary-dark text-white font-semibold py-2 px-6 rounded-md transition-colors disabled:opacity-50"
      >
        {{ isLoading ? 'Enviando...' : 'Enviar' }}
      </button>
      
      <div v-if="error" class="text-red-500 bg-red-50 p-2 rounded">
        {{ error }}
      </div>
      
      <div 
        v-if="response" 
        class="bg-gray-100 p-3 rounded-md text-gray-800"
      >
        {{ response }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { GoogleGenerativeAI } from "@google/generative-ai";

const message = ref('')
const response = ref('')
const error = ref('')
const isLoading = ref(false)

const sendMessage = async () => {
  // Resetear estados
  error.value = ''
  response.value = ''
  
  // Validaciones
  if (!message.value.trim()) {
    error.value = "El mensaje no puede estar vacío"
    return
  }

  try {
    // Activar estado de carga
    isLoading.value = true

    const genAI = new GoogleGenerativeAI(
      useRuntimeConfig().public.geminiApiKey
    )
    
    const model = genAI.getGenerativeModel({ 
      model: "gemini-pro" 
    })

      
    
    // Añadir un contexto o sistema de instrucciones
    const chat = model.startChat({
      history: [],
      generationConfig: {
        maxOutputTokens: 500,
      },
    })

    const result = await chat.sendMessage(message.value)
    
    if (result) {
      response.value = result.response.text()
    } else {
      throw new Error("No se pudo obtener respuesta")
    }

  } catch (err) {
    console.error("Error detallado:", err)
    error.value = `Error: ${err.message || 'Problema de conexión'}`
  } finally {
    // Desactivar estado de carga
    isLoading.value = false
  }
}
</script>
