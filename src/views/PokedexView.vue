<script setup>
import PageComposition from '@/components/composition/PageComposition.vue';
import TitleComponent from '@/components/core/TitleComponent.vue';
import ButtonComponent from '@/components/core/ButtonComponent.vue';
import CardComposition from '@/components/composition/CardComposition.vue';
import InputComponent from '@/components/core/form/InputComponent.vue';
import PokemonDetailsModalComposition from '@/components/composition/pokemon/PokemonDetailsModalComposition.vue';
import PokemonImageComposition from '@/components/composition/pokemon/PokemonImageComposition.vue';
import { getPokemonList, removePokemon, isPokedexEmpty } from '@/util/pokedexLocalStorage';
import axios from '@/util/request';
import content from '@/config/content.json';
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
    this.loadPage();
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
      this.$emit('refreshPokemonCount');
      this.$notify({
        title: content.notifications.pokedex,
        text: content.notifications.removedPokemon,
        type: 'error',
      });
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

      this.entities.forEach((pokemon) => {
        for (let i = 0; i < pokemonListIdArray.length; i += 1) {
          if (this.getPokemonIdByUrl(pokemon.url) === pokemonListIdArray[i]) {
            pokemonList.push(pokemon);
          }
        }
      });

      return pokemonList;
    },
  },
  components: {
    CardComposition,
    TitleComponent,
    PageComposition,
    ButtonComponent,
    InputComponent,
    PokemonDetailsModalComposition,
    PokemonImageComposition,
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
      v-bind:value='searchQuery' v-on:input='searchQuery = $event.target.value'
      :placeholder="content.searchPokemon.placeholder"
      :label="content.searchPokemon.label"
      type="search"
      name="seach"
      col="col-12"
    />

    <TitleComponent type="h3" v-if="isPokedexEmpty()">
      {{ content.views.pokedex.empty }}
    </TitleComponent>
    <div v-else class="row">
      <CardComposition
        v-for="(entity, index) in searchPokemon"
        :key="entity"
        collum="col-12 col-md-6 col-lg-4"
      >
        <PokemonImageComposition
          :pokemonId="getPokemonIdByUrl(entity.url)"
        />

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
      @imageChanged="loadPage()"
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
