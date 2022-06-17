import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import PokedexView from '../views/PokedexView.vue';
import PokemonByType from '../views/PokemonByType.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/type/:id',
    name: 'pokemon list by type',
    component: PokemonByType,
  },
  {
    path: '/pokedex',
    name: 'pokedex',
    component: PokedexView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
