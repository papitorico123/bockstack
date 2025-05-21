<template>
    <div
      :class="{
        'bg-white': !isDarkMode,
        'bg-gray-800': isDarkMode,
        'text-gray-800': !isDarkMode,
        'text-white': isDarkMode,
      }"
      class="min-h-screen"
    >
      <slot />
    </div>
  </template>
  
  <script setup>
import useDarkMode from '@/composables/useDarkMode';



  
  const { isDarkMode } = useDarkMode();
  </script>
