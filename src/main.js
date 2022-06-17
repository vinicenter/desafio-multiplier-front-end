import { createApp } from 'vue';
import '@popperjs/core';
import 'bootstrap';
import 'phosphor-icons';
import 'vue-toastification/dist/index.css';

import toast from 'vue-toastification';
import App from './App.vue';
import router from './router';

createApp(App)
  .use(router)
  .use(
    toast,
    {
      transition: 'Vue-Toastification__bounce',
      maxToasts: 20,
      newestOnTop: true,
    },
  ).mount('#app');
