<script setup>
import BadgeComponent from '@/components/core/BadgeComponent.vue';
import ModalComposition from '@/components/composition/ModalComposition.vue';
import TextComponent from '@/components/core/TextComponent.vue';
import config from '@/config/config.json';
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
  },
  components: {
    TextComponent,
    ModalComposition,
    BadgeComponent,
  },
};
</script>

<template>
  <ModalComposition
    :id="modalId"
    :title="pokemonOnModal.name"
  >
    <div v-if="isModalLoaded">
      <div>
        <img
          :src="`${config.spriteBaseUrl}/${pokemonOnModal.id}.png`"
          alt="pokemon image"
          style="width: 100%"
        />
      </div>
      <div class="section">
        <div>
          <TextComponent>{{content.pokemons.types}}</TextComponent>
        </div>
        <BadgeComponent :badges="getPokemonTypesBadge(pokemonOnModal.types)" />
      </div>
      <div class="section">
        <div>
          <TextComponent>
            {{content.pokemons.physiognomy}}
          </TextComponent>
        </div>
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
        <div>
          <TextComponent>{{content.pokemons.stats}}</TextComponent>
        </div>
        <BadgeComponent :badges="getPokemonStatsBadge(pokemonOnModal.stats)" />
      </div>
      <div class="section">
        <TextComponent>{{content.pokemons.moves}}</TextComponent>
        <div v-for="move in pokemonOnModal.moves" :key="move">
          <div class="col-12" v-if="!(move.move.name === undefined)">
            <TextComponent>{{move.move.name}}</TextComponent>
          </div>
        </div>
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
}
</style>
