import { ref } from 'vue';

const isDarkMode = ref(false);

export const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
};

export const useDarkMode = () => {
  return {
    isDarkMode,
    toggleDarkMode
  };
};
