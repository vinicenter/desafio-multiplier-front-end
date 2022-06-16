<script setup>
import CardComponent from '@/components/composition/CardComposition.vue';
import PageComposition from '@/components/composition/PageComposition.vue';
import TitleComponent from '@/components/core/TitleComponent.vue';
import ButtonComponent from '@/components/core/ButtonComponent.vue';
import axios from '@/util/request';
import config from '@/config/config.json';
import content from '@/config/content.json';
</script>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      entities: {
        results: [],
      },
      searchQuery: '',
      isLoaded: false,
    };
  },
  created() {
    this.loadPage('/');
  },
  methods: {
    loadPage() {
      axios.get('pokemon?offset=1&limit=1').then((response) => {
        axios.get(
          'pokemon?offset=[offset]&limit=[limit]'
            .replace('[offset]', 1)
            .replace('[limit]', response.data.count),
        ).then((responseAll) => {
          this.entities = responseAll.data;
          this.isLoaded = true;
        });
      });
    },
    getPokemonIdByUrl(url) {
      const urlSplit = url.split('/api/v2/pokemon/');
      return urlSplit[1].replace('/', '');
    },
  },
  computed: {
    searchPokemon() {
      const entities = this.entities.results.filter(
        (pokemon) => pokemon.name.toLowerCase().includes(this.searchQuery.toLowerCase()),
      );
      return entities;
    },
  },
  components: {
    CardComponent,
    TitleComponent,
    PageComposition,
  },
};
</script>

<template>
  <PageComposition
    :title="content.views.pokemons.title"
    :description="content.views.pokemons.description"
    :isLoaded="isLoaded"
  >
    <div class="mb-3">
      <label for="search" class="form-label">Email address
        <input
          type="search"
          class="form-control"
          id="search"
          v-model="searchQuery"
        >
      </label>
    </div>
    <div class="row">
      <CardComponent
        v-for="(entity) in sortPokemon"
        :key="entity"
        :imgUrl="`${config.spriteBaseUrl}/${getPokemonIdByUrl(entity.url)}.gif`"
        collum="col-12 col-md-6 col-lg-4"
      >
        <TitleComponent>{{entity.name}}</TitleComponent>
        <ButtonComponent>{{content.generic.buttons.capture}}</ButtonComponent>
        <ButtonComponent>{{content.generic.buttons.details}}</ButtonComponent>
      </CardComponent>
    </div>
  </PageComposition>
</template>

<style lang="scss">
@import 'bootstrap';

.filter {
  display: flex;
  justify-content: center;
  margin: 20px;
}
</style>
