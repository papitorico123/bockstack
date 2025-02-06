<template>
  <div class="text-center space-y-8 p-8">
    <!-- Título y descripción -->
    <div class="space-y-4">
      <h1 class="text-4xl font-bold text-primary-dark">bockstack</h1>
      <p class="text-lg text-gray-600">
        Tu recomendador de libros inteligente. ¡Encuentra tu próxima lectura favorita!
      </p>
    </div>

    <!-- Navbar -->
    <Navbar />

    <!-- Contenido principal -->
    <div class="mt-8">
      <h2 class="text-xl font-semibold">Bienvenido a Bockstack</h2>
      <p>Aquí podrás encontrar las mejores recomendaciones de libros.</p>
    </div>
  </div>
</template>

<script>
import Navbar from '~/components/Navbar.vue';
import '@fortawesome/fontawesome-free/css/all.css';

export default {
  components: {
    Navbar,
  },
};
</script>
