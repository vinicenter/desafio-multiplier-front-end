<script setup>
import CardComponent from '@/components/composition/CardComposition.vue';
import PageComposition from '@/components/composition/PageComposition.vue';
import TitleComponent from '@/components/core/TitleComponent.vue';
import ButtonComponent from '@/components/core/ButtonComponent.vue';
import InputComponent from '@/components/core/form/InputComponent.vue';
import PokemonDetailsModalComposition from '@/components/composition/pokemon/PokemonDetailsModalComposition.vue';
import axios from '@/util/request';
import config from '@/config/config.json';
import content from '@/config/content.json';
import {
  addPokemonToLocalStorage,
} from '@/util/pokedex';
</script>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      entities: {
        results: [],
      },
      pokemonOnModal: {},
      pokemonEvolutionOnModal: {},
      pokemonSpeciesOnModal: {},
      searchQuery: '',
      isModalLoaded: false,
      isLoaded: false,
    };
  },
  created() {
    this.loadPage();
  },
  methods: {
    loadPage() {
      axios.get('pokemon?offset=1&limit=1').then((response) => {
        let count;
        if (response.data.count >= 500) {
          count = 500;
        } else count = response.data.count;

        axios.get(
          'pokemon?offset=[offset]&limit=[limit]'
            .replace('[offset]', 0)
            .replace('[limit]', count),
        ).then((responseAll) => {
          this.entities = responseAll.data;
          this.isLoaded = true;
        });
      });
    },
    loadPokemonOnModal(id) {
      this.isModalLoaded = false;
      axios.get(`pokemon/${id}`).then((response) => {
        this.pokemonOnModal = response.data;
        this.isModalLoaded = true;
      });
    },
    getPokemonIdByUrl(url) {
      const urlSplit = url.split('/api/v2/pokemon/');
      return urlSplit[1].replace('/', '');
    },
    addPokemonToPokedex(pokemon) {
      if (addPokemonToLocalStorage(pokemon)) {
        alert('pokemon added to your pokedex');
      } else {
        alert('pokemon already in your pokedex');
      }
    },
  },
  computed: {
    searchPokemon() {
      let entities = this.entities.results;

      if (this.searchQuery === '') return entities;

      entities = entities.filter(
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
    <hr />

    <InputComponent
      v-model="searchQuery"
      :placeholder="content.searchPokemon.placeholder"
      :label="content.searchPokemon.label"
      type="search"
      name="seach"
      col="col-12"
    />

    <div class="row">
      <CardComponent
        v-for="(entity) in searchPokemon"
        :key="entity"
        :imgUrl="`${config.spriteBaseUrl}/${getPokemonIdByUrl(entity.url)}.png`"
        collum="col-12 col-md-6 col-lg-4"
      >
        <TitleComponent>{{entity.name}}</TitleComponent>
        <ButtonComponent
          @click="addPokemonToPokedex(getPokemonIdByUrl(entity.url))"
          style="margin-right: 16px;"
          styleType="success"
        >
          {{content.generic.buttons.capture}}
        </ButtonComponent>
        <ButtonComponent
          dataBsToggle="modal"
          styleType="success"
          :dataBsTarget="'#pokemonDetails'"
          @click="loadPokemonOnModal(getPokemonIdByUrl(entity.url))"
        >
          {{content.generic.buttons.details}}
        </ButtonComponent>
      </CardComponent>
    </div>

    <PokemonDetailsModalComposition
      modalId="pokemonDetails"
      :pokemonOnModal="pokemonOnModal"
      :isModalLoaded="isModalLoaded"
    />
  </PageComposition>
</template>

<style lang="scss">
.filter {
  display: flex;
  justify-content: center;
  margin: 20px;
}
</style>
