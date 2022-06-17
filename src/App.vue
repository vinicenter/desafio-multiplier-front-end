<script setup>
import NavBarComposition from '@/components/composition/NavBarComposition.vue';
import { getPokemonsCount } from '@/util/pokedexLocalStorage';
</script>

<script>
export default {
  data() {
    return {
      countPokemons: getPokemonsCount(),
    };
  },
  methods: {
    pokemonsCount() {
      this.countPokemons = getPokemonsCount();
    },
  },
};
</script>

<template>
  <NavBarComposition>
    <template v-slot:right>
      <li class="nav-item">
        <RouterLink class="nav-link" to="/">Pokémons</RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink class="nav-link" to="/pokedex">
          Minha pokédex ({{countPokemons}})
        </RouterLink>
      </li>
    </template>
  </NavBarComposition>

  <div class="content">
    <RouterView @refreshPokemonCount="pokemonsCount()"/>
  </div>
</template>

<style lang="scss">
//global theme colors
:root {
  --hover-color: #a2a2a2;
  --text-color: #fff;
  --navbar-text-color: #000;
  --navbar-hover-color: #444;
  --navbar-color:  #fff;
  --border-color: #fff;
  --card-background-color: #313131;
}

//bootstrap color config
$primary: #E3350D;
$danger: #CB0C0B;
$warning: #EE6B2F;
$success: #4DAD5B;

$body-bg: #616161;

@import "bootstrap";
</style>

<style lang="scss" scoped>
.content {
  margin-top: 70px;
}
</style>
