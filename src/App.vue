<script setup>
import NavBarComposition from '@/components/composition/NavBarComposition.vue';
</script>

<template>
  <NavBarComposition>
    <template v-slot:right>
      <li class="nav-item">
        <RouterLink class="nav-link" to="/">Pokémons</RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink class="nav-link" to="/pokedex">Minha pokédex</RouterLink>
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
  --main-color: #CB0C0B;
  --hover-color: #a2a2a2;
  --text-color: #fff;
  --navbar-color:  #78ADD3;
  --border-color: #fff;
  --card-background-color: #C84442;
  --background-primary: #C1CAFF;
  --background-secondary: #b3b3b3;
  --background-tertiary: #6f6f6f;
}

//bootstrap color config
$primary: #79AFD5;
$danger: #CB0C0B;
$warning: #b3a400;
$success: #469D2C;

$body-bg: #1d4112;

@import "bootstrap";
</style>

<style lang="scss" scoped>
.content {
  margin-top: 70px;
}
</style>
