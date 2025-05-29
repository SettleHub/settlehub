import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import Notifications from '@kyvg/vue3-notification'
import velocity from 'velocity-animate'

const app = createApp(App)
  app.use(router)
  app.config.globalProperties.$api = "http://127.0.0.1:8081/api"
  app.use(Notifications, { velocity })
  app.mount('#app');
