<template>
  <div class="w-full">
    <textarea class="w-full px-3 py-2 text-gray-800 leading-tight border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" v-model="message"></textarea>
    <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Enviar</button>
  </div>
</template>

  
  <script>
  export default {
    data() {
      return {
        message: ''
      }
    },
    methods: {
      sendMessage() {
        
      }
    }
  }
  </script>
  