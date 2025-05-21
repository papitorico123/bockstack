<template>
  <div class="relative">
    <!-- Navbar -->
    <div
      :class="{
        'bg-white': !isDarkMode,
        'bg-gray-800': isDarkMode,
        'text-gray-800': !isDarkMode,
        'text-white': isDarkMode,
      }"
      class="fixed top-0 left-0 h-full w-16 hover:w-64 transition-all duration-300 overflow-hidden shadow-md z-50 flex flex-col justify-between"
    >
      <div class="flex flex-col items-center space-y-6 py-4">
        <!-- Botón de modo oscuro/claro -->
        <button
          @click="$emit('toggle-dark-mode')"
          class="bg-secondary hover:bg-secondary-dark text-white font-semibold py-2 px-4 rounded-md transition-colors w-full text-center"
        >
          {{ isDarkMode ? "Modo Claro" : "Modo Oscuro" }}
        </button>

        <!-- Opciones del navbar -->
        <nav class="flex flex-col items-start space-y-4 w-full px-4">
          <a href="/" class="hover:text-secondary transition-colors">
            Inicio
          </a>
          <a href="/chat" class="hover:text-secondary transition-colors">
            <h7> Chat </h7> 
          </a>
          <a href="/FilterTest" class="hover:text-secondary transition-colors">
            Test
          </a>
        </nav>
      </div>
      <!-- Imagen al fondo del navbar -->
      <img src="public/images/logo.png"  class="w-full object-cover" />
    </div>

    <!-- Contenido principal (que cambia según la página) -->
    <div
      :class="{
        'bg-gray-200': !isDarkMode,
        'bg-gray-900': isDarkMode,
        'text-gray-900': !isDarkMode,
        'text-white': isDarkMode,
      }"
      class="ml-16 transition-colors duration-300 p-4"
    >
      <slot></slot> <!-- Aquí se inyectará el contenido de cada página -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  props: {
    isDarkMode: Boolean
  },
  emits: ['toggle-dark-mode']
};
</script>

<style>
/* Colores secundarios para los botones y links */
.bg-secondary {
  background-color: #2563eb; /* Azul */
}
.bg-secondary-dark {
  background-color: #1d4ed8; /* Azul oscuro */
}
.hover\:text-secondary:hover {
  color: #2563eb;
}
</style>