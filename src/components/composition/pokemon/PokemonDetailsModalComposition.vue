<script setup>
import BadgeComponent from '@/components/core/BadgeComponent.vue';
import ModalComposition from '@/components/composition/ModalComposition.vue';
import TextComponent from '@/components/core/TextComponent.vue';
import PokemonImageComposition from '@/components/composition/pokemon/PokemonImageComposition.vue';
import content from '@/config/content.json';
</script>

<script>
export default {
  props: {
    pokemonOnModal: {
      type: Object,
      required: true,
    },
    modalId: {
      type: String,
      required: true,
    },
    isModalLoaded: {
      type: Boolean,
      required: true,
    },
    loadingHasError: {
      type: Boolean,
      required: false,
    },
    GoToType: {
      type: Boolean,
      default: true,
      required: false,
    },
  },
  methods: {
    getPokemonStatsBadge(stats) {
      const badges = [];
      stats.forEach((element) => {
        badges.push([
          'danger', `${element.stat.name}: ${element.base_stat}`,
        ]);
      });
      return badges;
    },
    getPokemonTypesBadge(type) {
      const badges = [];
      type.forEach((element) => {
        badges.push([
          'success', `${element.type.name}`,
        ]);
      });
      return badges;
    },
    getPokemonMovesBadge(moves) {
      const badges = [];
      moves.forEach((element) => {
        badges.push([
          'warning', `${element.move.name}`,
        ]);
      });
      return badges;
    },
    getPokemonAbilitiesBadge(abilities) {
      const badges = [];
      abilities.forEach((element) => {
        badges.push([
          'warning', `${element.ability.name}`,
        ]);
      });
      return badges;
    },
  },
  components: {
    TextComponent,
    ModalComposition,
    BadgeComponent,
    PokemonImageComposition,
  },
};
</script>

<template>
  <ModalComposition
    :id="modalId"
    :title="pokemonOnModal.name"
  >
    <div v-if="isModalLoaded">
      <PokemonImageComposition
        :showChange="true"
        :pokemonId="pokemonOnModal.id"
        @imageChanged="$emit('imageChanged')"
      />
      <div class="section">
        <TextComponent>{{content.pokemons.types}}</TextComponent>
        <BadgeComponent
          :GoToType="GoToType"
          :badges="getPokemonTypesBadge(pokemonOnModal.types)"
        />
      </div>
      <div class="section">
        <TextComponent>{{content.pokemons.physiognomy}}</TextComponent>
        <BadgeComponent :badges="
          [
            ['primary',
              `${content.pokemons.weight}:
              ${(pokemonOnModal.weight * 0.453592).toFixed(2)} kg`
            ],
            ['primary', `${content.pokemons.height}: ${pokemonOnModal.height * 2.54} cm`],
          ]
        " />
      </div>
      <div class="section">
        <TextComponent>{{content.pokemons.abilitys}}</TextComponent>
        <BadgeComponent :badges="getPokemonAbilitiesBadge(pokemonOnModal.abilities)" />
      </div>
      <div class="section">
        <TextComponent>{{content.pokemons.stats}}</TextComponent>
        <BadgeComponent :badges="getPokemonStatsBadge(pokemonOnModal.stats)" />
      </div>
      <div class="section">
        <TextComponent>{{content.pokemons.moves}}</TextComponent>
        <BadgeComponent :badges="getPokemonMovesBadge(pokemonOnModal.moves)" />
      </div>
    </div>
    <div v-else class="spinner">
      <div v-if="!loadingHasError" class="spinner-border" role="status">
        <span class="visually-hidden">{{ content.generic.load.loadingMessage }}</span>
      </div>
      <div v-if="loadingHasError">
        <TextComponent>{{ content.generic.load.error }}</TextComponent>
      </div>
      <div>
        <TextComponent>{{ content.generic.load.fewSecondsLeft }}</TextComponent>
      </div>
    </div>
  </ModalComposition>
</template>

<style lang="scss">
.section {
  border: 1px solid var(--border-color);
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
}

.spinner {
  display: flex;
  height: 70vh;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  color: var(--text-color);
}
</style>
