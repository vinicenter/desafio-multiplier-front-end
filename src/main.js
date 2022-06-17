import { createApp } from 'vue';
import '@popperjs/core';
import 'bootstrap';
import 'phosphor-icons';

import VueToast from 'vue-toast-notification';
import App from './App.vue';
import router from './router';

createApp(App)
  .use(router)
  .use(VueToast).mount('#app');
