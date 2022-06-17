import { createApp } from 'vue';
import '@popperjs/core';
import 'bootstrap';
import 'phosphor-icons';
import Notifications from '@kyvg/vue3-notification';

import App from './App.vue';
import router from './router';

createApp(App)
  .use(router)
  .use(Notifications).mount('#app');
