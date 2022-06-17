<script setup>
import PageComposition from '@/components/composition/PageComposition.vue';
import TitleComponent from '@/components/core/TitleComponent.vue';
import ButtonComponent from '@/components/core/ButtonComponent.vue';
import CardComposition from '@/components/composition/CardComposition.vue';
import InputComponent from '@/components/core/form/InputComponent.vue';
import PokemonDetailsModalComposition from '@/components/composition/pokemon/PokemonDetailsModalComposition.vue';
import { getPokemonList, removePokemon } from '@/util/pokedex';
import axios from '@/util/request';
import content from '@/config/content.json';
import config from '@/config/config.json';
</script>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      entities: [],
      pokemonOnModal: {},
      searchQuery: '',
      isModalLoaded: false,
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
            .replace('[offset]', 0)
            .replace('[limit]', response.data.count),
        ).then((responseAll) => {
          this.entities = responseAll.data.results;
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
    removePokemonFromPokedex(id, index) {
      this.pokemonOnPokedex.splice(index, 1);
      removePokemon(id);
      this.loadPage();
    },
  },
  computed: {
    searchPokemon() {
      let entities = this.pokemonOnPokedex;

      if (this.searchQuery === '') return entities;

      entities = entities.filter(
        (pokemon) => pokemon.name.toLowerCase().includes(this.searchQuery.toLowerCase()),
      );

      return entities;
    },
    pokemonOnPokedex() {
      const pokemonListIdArray = getPokemonList().split(', ');
      const pokemonList = [];

      console.log(pokemonListIdArray);

      this.entities.forEach((pokemon) => {
        for (let i = 0; i < pokemonListIdArray.length; i += 1) {
          if (this.getPokemonIdByUrl(pokemon.url) === pokemonListIdArray[i]) {
            pokemonList.push(pokemon);
          }
        }
      });

      console.log(pokemonList);

      return pokemonList;
    },
  },
  components: {
    CardComposition,
    TitleComponent,
    PageComposition,
    InputComponent,
  },
};
</script>

<template>
  <PageComposition
    :title="content.views.pokedex.title"
    :description="content.views.pokedex.description"
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
      <CardComposition
        v-for="(entity, index) in searchPokemon"
        :key="entity"
        :imgUrl="`${config.spriteBaseUrl}${getPokemonIdByUrl(entity.url)}.png`"
        collum="col-12 col-md-6 col-lg-4"
      >
        <TitleComponent>{{entity.name}}</TitleComponent>
        <ButtonComponent
          @click="removePokemonFromPokedex(getPokemonIdByUrl(entity.url), index)"
          style="margin-right: 16px;"
          styleType="warning"
        >
          {{content.generic.buttons.remove}}
        </ButtonComponent>

        <ButtonComponent
          dataBsToggle="modal"
          :dataBsTarget="'#pokemonDetails'"
          styleType="success"
          @click="loadPokemonOnModal(getPokemonIdByUrl(entity.url))"
        >
          {{content.generic.buttons.details}}
        </ButtonComponent>
      </CardComposition>
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
