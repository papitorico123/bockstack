<template>
  <div class="bg-white shadow-md rounded-md p-4 space-y-4">
    <textarea
      class="w-full px-4 py-2 text-gray-900 border border-primary-light rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-light"
      v-model="message"
      placeholder="Escribe tu mensaje..."
    ></textarea>
    <button
      type="submit"
      @click="sendMessage"
      class="bg-secondary hover:bg-secondary-dark text-white font-semibold py-2 px-6 rounded-md"
    >
      Enviar
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: '',
    };
  },
  methods: {
    sendMessage() {
      console.log(this.message);
    },
  },
};
</script>
