<script setup>
import CardComponent from '@/components/composition/CardComposition.vue';
import PageComposition from '@/components/composition/PageComposition.vue';
import TitleComponent from '@/components/core/TitleComponent.vue';
import ButtonComponent from '@/components/core/ButtonComponent.vue';
import InputComponent from '@/components/core/form/InputComponent.vue';
import PokemonDetailsModalComposition from '@/components/composition/pokemon/PokemonDetailsModalComposition.vue';
import PokemonImageComposition from '@/components/composition/pokemon/PokemonImageComposition.vue';
import axios from '@/util/request';
import content from '@/config/content.json';
import {
  addPokemonToLocalStorage,
} from '@/util/pokedexLocalStorage';
</script>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      id: this.$route.params.id,
      entities: {},
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
      axios.get(
        'type/[id]'.replace('[id]', this.id),
      ).then((responseAll) => {
        this.entities = responseAll.data;
        this.isLoaded = true;
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
        this.$emit('refreshPokemonCount');
        this.$notify({
          title: content.notifications.pokedex,
          text: content.notifications.capturedPokemon,
          type: 'success',
        });
      } else {
        this.$notify({
          title: content.notifications.pokedex,
          text: content.notifications.pokemonAlreadyCaptured,
          type: 'error',
        });
      }
    },
  },
  computed: {
    searchPokemon() {
      let entities = this.entities.pokemon;

      if (this.searchQuery === '') return entities;

      entities = entities.filter(
        (pokemon) => pokemon.pokemon.name.toLowerCase().includes(this.searchQuery.toLowerCase()),
      );
      return entities;
    },
  },
  components: {
    CardComponent,
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
    :title="content.views.pokemonByType.title+': '+id"
    :description="content.views.pokemonByType.description"
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

    <div class="row">
      <CardComponent
        v-for="(entity) in searchPokemon"
        :key="entity"
        collum="col-12 col-md-6 col-lg-4"
      >
        <PokemonImageComposition
          :pokemonId="getPokemonIdByUrl(entity.pokemon.url)"
        />

        <TitleComponent>{{entity.pokemon.name}}</TitleComponent>
        <ButtonComponent
          @click="addPokemonToPokedex(getPokemonIdByUrl(entity.pokemon.url))"
          style="margin-right: 16px;"
          styleType="success"
        >
          {{content.generic.buttons.capture}}
        </ButtonComponent>
        <ButtonComponent
          dataBsToggle="modal"
          styleType="success"
          :dataBsTarget="'#pokemonDetails'"
          @click="loadPokemonOnModal(getPokemonIdByUrl(entity.pokemon.url))"
        >
          {{content.generic.buttons.details}}
        </ButtonComponent>
      </CardComponent>
    </div>

    <PokemonDetailsModalComposition
      modalId="pokemonDetails"
      :pokemonOnModal="pokemonOnModal"
      :isModalLoaded="isModalLoaded"
      :GoToType="false"
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
