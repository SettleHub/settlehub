import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index.js';
import Notifications from '@kyvg/vue3-notification'
import velocity from 'velocity-animate'

const app = createApp(App)
  app.use(router)
  app.use(Notifications, { velocity })
  app.mount('#app');
