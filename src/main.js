import { createApp } from 'vue';
import '@popperjs/core';
import 'bootstrap';
import 'phosphor-icons';

import App from './App.vue';
import router from './router';

createApp(App).use(router).mount('#app');
