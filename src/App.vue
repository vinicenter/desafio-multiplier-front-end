<script setup>
import NavBarComposition from '@/components/composition/NavBarComposition.vue';
</script>

<template>
  <NavBarComposition>
    <template v-slot:right>
      <li class="nav-item">
        <RouterLink class="nav-link" to="/">Pokemons</RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink class="nav-link" to="/pokedex">Minha pokedex</RouterLink>
      </li>
    </template>
  </NavBarComposition>

  <div class="content">
    <router-view/>
  </div>
</template>

<style lang="scss">
//global theme colors
:root {
  --main-color: #eeeeee;
  --hover-color: #a2a2a2;
  --text-color: #000;
  --background-primary: #e6e6e6;
  --background-secondary: #b3b3b3;
  --background-tertiary: #6f6f6f;
}
//bootstrap color config
$primary: #eeeeee;

@import "bootstrap";
</style>

<style lang="scss" scoped>
.content {
  margin-top: 70px;
}
</style>
