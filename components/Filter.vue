<template>
  <div class="text-center">
    <button
      @click="toggleFilter"
      class="bg-primary-dark text-white py-2 px-6 rounded-md hover:bg-primary-light"
    >
      Prueba de Filtro
    </button>

    <div v-if="showFilter" class="mt-4 bg-white p-6 rounded-md shadow-md">
      <h2 class="text-xl font-semibold text-primary-dark">Selecciona una categoría:</h2>
      <div class="grid grid-cols-2 gap-4 mt-4">
        <button
          v-for="category in categories"
          :key="category"
          @click="selectCategory(category)"
          :class="[
            'py-2 px-4 rounded-md font-medium',
            selectedCategory === category
              ? 'bg-secondary text-white'
              : 'bg-gray-100 text-primary-dark hover:bg-gray-200',
          ]"
        >
          {{ category }}
        </button>
      </div>
      <button
        @click="finishSelection"
        class="mt-4 bg-secondary-dark text-white py-2 px-6 rounded-md"
      >
        Finalizar
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showFilter: false,
      categories: ['Ficción', 'No Ficción', 'Fantasía', 'Romance', 'Historia', 'Ciencia'],
      selectedCategory: null,
    };
  },
  methods: {
    toggleFilter() {
      this.showFilter = !this.showFilter;
    },
    selectCategory(category) {
      this.selectedCategory = category;
    },
    finishSelection() {
      console.log('Categoría seleccionada:', this.selectedCategory);
      this.showFilter = false; // Ocultar el filtro después de finalizar
    },
  },
};
</script>
