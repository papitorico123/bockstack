import { ref } from 'vue';
  

const isDarkMode = ref(false);

function toggleDarkMode() {
  isDarkMode.value = !isDarkMode.value;
  document.documentElement.classList.toggle('dark', isDarkMode.value);
}

export default function useDarkMode() {
  return { isDarkMode, toggleDarkMode };
}
