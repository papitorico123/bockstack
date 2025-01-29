<template>
  <div class="bg-white shadow-md rounded-md p-4 space-y-4">
    <textarea
      v-model="message"
      class="w-full px-4 py-2 text-gray-900 border border-primary-light rounded-md"
      placeholder="Escribe tu mensaje..."
    ></textarea>
    <button 
      @click="sendMessage" 
      class="bg-secondary hover:bg-secondary-dark text-white font-semibold py-2 px-6 rounded-md"
    >
      Enviar
    </button>
    <div v-if="error" class="text-red-500">{{ error }}</div>
    <div v-if="response">{{ response }}</div>
  </div>
</template>

<script setup>
import { GoogleGenerativeAI } from "@google/generative-ai";

const message = ref('')
const response = ref('')
const error = ref('')

const sendMessage = async () => {
  try {
    // Validación básica
    if (!message.value.trim()) {
      error.value = "El mensaje no puede estar vacío"
      return
    }

    const genAI = new GoogleGenerativeAI(useRuntimeConfig().public.geminiApiKey)
    
    // Log para verificar configuración
    console.log("API Key:", useRuntimeConfig().public.geminiApiKey)
    
    const model = genAI.getGenerativeModel({ model: "gemini-pro" })
    
    const result = await model.generateContent(message.value)
    
    // Verificación adicional de respuesta
    if (result && result.response) {
      response.value = result.response.text()
      error.value = '' // Limpiar cualquier error previo
    } else {
      throw new Error("Respuesta inválida de la API")
    }
  } catch (err) {
    console.error("Error detallado:", err)
    error.value = `Error: ${err.message}`
    response.value = ''
  }
}
</script>
