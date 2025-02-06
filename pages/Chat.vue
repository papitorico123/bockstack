<template>
    <div class="flex justify-center items-center min-h-screen">
      <div class="max-w-4xl w-full p-4">
        <h2 class="text-2xl font-bold">Chat</h2>
        <p>Bienvenido al chat. Aquí podrás interactuar.</p>
        <!-- Aquí iría tu implementación del chat -->
        
        <!-- Chatbox -->
        <Chatbox />
      </div>
    </div>
  
    <!-- Navbar -->
    <Navbar />
  </template>
  
  <script>
  import Navbar from '~/components/Navbar.vue';
  import Chatbox from '~/components/Chatbox.vue';
  import '@fortawesome/fontawesome-free/css/all.css';
  
  export default {
    name: "Chat",
  };
  </script>
  