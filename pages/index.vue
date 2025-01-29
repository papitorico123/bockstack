<template>
  <div class="text-center space-y-8">
    <h1 class="text-4xl font-bold text-primary-dark">bockstack</h1>
    <Navbar />
    <Chatbox />
    
    
  </div>
</template>

<script>
import Navbar from '~/components/Navbar.vue';
import Chatbox from '~/components/Chatbox.vue';


export default {
  components: {
    Navbar,
    Chatbox,
   
  },
};
</script>
