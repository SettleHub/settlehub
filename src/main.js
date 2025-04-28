import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const app = createApp(App)
  app.use(router)
  app.config.globalProperties.$api = "http://127.0.0.1/"
  app.mount('#app');
