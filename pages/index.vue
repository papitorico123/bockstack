<template>
  <div :class="{ dark: isDarkMode }">
    <Navbar :isDarkMode="isDarkMode" @toggle-dark-mode="toggleDarkMode" />
    <div class="text-center space-y-8 p-8">
      <!-- Título y descripción -->
      <div class="space-y-4">
        <h1 class="text-4xl font-bold text-primary-dark">bockstack</h1>
        <p class="text-lg text-gray-600">
          Tu recomendador de libros inteligente. ¡Encuentra tu próxima lectura favorita!
        </p>
      </div>

      <!-- Contenido principal -->
      <div class="mt-8">
        <h2 class="text-xl font-semibold">Bienvenido a Bockstack</h2>
        <p>Aquí podrás encontrar las mejores recomendaciones de libros.</p>
      </div>

      <!-- Sección de noticias -->
      <div class="news-section mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <h2 class="col-span-full text-2xl font-bold mb-4">Últimas Noticias sobre Inteligencia Artificial</h2>
        <div v-for="(news, index) in newsArticles" :key="index" class="news-card bg-white p-4 rounded-md shadow-md">
          <img class="h-auto max-w-full w-full h-48 object-cover rounded-md mb-4" :src="`/images/${news.image}`" alt="news image" />
          <a :href="news.url" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:underline text-lg font-semibold">
            {{ news.title }}
          </a>
          <p class="text-gray-600">{{ news.excerpt }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '~/components/Navbar.vue';
import Chatbox from '~/components/Chatbox.vue';
import '@fortawesome/fontawesome-free/css/all.css';

export default {
  components: {
    Navbar,
    Chatbox,
  },
  data() {
    return {
      isDarkMode: false,
      newsArticles: [
        {
          title: "'Dangerous proposition': Top scientists warn of out-of-control AI",
          url: "https://www.cnbc.com/2025/02/07/dangerous-proposition-top-scientists-warn-of-out-of-control-ai.html",
          excerpt: "Yoshua Bengio and Max Tegmark, two of the world's most prominent AI scientists, warned of the dangers of uncontrollable artificial intelligence.",
          image: "news1.jpg" // Nombre de la imagen en la carpeta public/images
        },
        {
          title: "'AI Godfather' sounds the alarm on autonomous AI - TechRadar",
          url: "https://www.techradar.com/computing/artificial-intelligence/ai-godfather-sounds-the-alarm-on-autonomous-ai",
          excerpt: "More about artificial intelligence. ... Google Pixel 9a: latest news, rumors, and everything we’ve heard so far. Let’s Encrypt halts expiration alerts - but it's for a good[...]",
          image: "news2.jpg" // Nombre de la imagen en la carpeta public/images
        },
        {
          title: "OpenAI looks across US for sites to build its Trump-backed ... - Yahoo",
          url: "https://www.yahoo.com/news/openai-looks-across-us-sites-192508250.html",
          excerpt: "OpenAI is scouring the U.S. for sites to build a network of huge data centers to power its artificial intelligence technology, expanding beyond a flagship Texas location and lo[...]",
          image: "news3.jpg" // Nombre de la imagen en la carpeta public/images
        },
        {
          title: "Amazon Follows Google, Meta, and Microsoft With Plans To ... - Investopedia",
          url: "https://www.investopedia.com/amazon-follows-google-meta-and-microsoft-with-plans-to-boost-spending-on-ai-8787507",
          excerpt: "Amazon said it expects to spend over $100 billion in capital expenditures this year, making it the latest tech giant to say it's ramping up investments in artificial intelligen[...]",
          image: "news4.jpg" // Nombre de la imagen en la carpeta public/images
        },
        {
          title: "AI Agents: ITU's 2025 Summit Tackles Autonomous Rise - Mirage News",
          url: "https://www.miragenews.com/ai-agents-itus-2025-summit-tackles-autonomous-1403990/",
          excerpt: "A new wave of autonomous AI-capable of reasoning, acting independently, and scaling at unprecedented speed-is rapidly reshaping the technological landscape. The rise of 'agenti[...]",
          image: "news5.jpg" // Nombre de la imagen en la carpeta public/images
        },
        {
          title: "AI Agents: ITU's 2025 Summit Tackles Autonomous Rise - Mirage News",
          url: "https://www.miragenews.com/ai-agents-itus-2025-summit-tackles-autonomous-1403990/",
          excerpt: "A new wave of autonomous AI-capable of reasoning, acting independently, and scaling at unprecedented speed-is rapidly reshaping the technological landscape. The rise of 'agenti[...]",
          image: "news6.jpg" // Nombre de la imagen en la carpeta public/images
        }
      ]
    };
  },
  methods: {
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
      document.documentElement.classList.toggle('dark', this.isDarkMode);
    },
  },
};
</script>

<style scoped>
.news-section {
  padding: 1rem;
  border-top: 1px solid var(--border-color);
}

.news-section h2 {
  color: var(--text-primary);
}

.news-section ul {
  list-style: none;
  padding: 0;
}

.news-section li {
  display: flex;
  align-items: start;
}

.news-section a {
  color: var(--link-color);
}

.news-section p {
  margin: 0.5rem 0 0;
  color: var(--text-secondary);
}

.news-card {
  transition: transform 0.3s, box-shadow 0.3s;
  transform: scale(1);
}

.news-card:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}
</style>