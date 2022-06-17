<script setup>
import {
  getPokemonImageOnLocalStorage,
  addPokemonImageToLocalStorage,
  removePokemonImageFromLocalStorage,
} from '@/util/imageLocalStorage';
import config from '@/config/config.json';
import content from '@/config/content.json';
import ButtonComponent from '@/components/core/ButtonComponent.vue';
</script>

<script>
export default {
  props: {
    pokemonId: {
      required: true,
    },
    showChange: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      pokemonImage: this.getPokemonImage(),
    };
  },
  methods: {
    changePokemonImage() {
      const file = document.querySelector('input[type=file]').files[0];
      const reader = new FileReader();

      let rawImg;
      reader.onloadend = () => {
        rawImg = reader.result;
        addPokemonImageToLocalStorage(this.pokemonId, rawImg);
        this.pokemonImage = this.getPokemonImage();
        this.$emit('imageChanged');
      };

      reader.readAsDataURL(file);

      this.$notify({
        title: content.notifications.pokemonImage,
        text: content.notifications.updatedImage,
        type: 'success',
      });
    },
    getPokemonImage() {
      const image = getPokemonImageOnLocalStorage(this.pokemonId);

      if (image === '') return `${config.spriteBaseUrl}/${this.pokemonId}.png`;

      return image;
    },
    removePokemonImage() {
      removePokemonImageFromLocalStorage(this.pokemonId);
      this.pokemonImage = this.getPokemonImage();
      this.$emit('imageChanged');
      this.$notify({
        title: content.notifications.pokemonImage,
        text: content.notifications.removedImage,
        type: 'error',
      });
    },
  },
};
</script>

<template>
  <div>
    <img
      :src="pokemonImage"
      alt="pokemon image"
      style="width: 100%; margin-bottom: 10px;"
    />
    <div class="section" v-if="showChange">
      <label for="changeImage">
        {{content.pokemons.image}}
        <input
          type="file"
          id="changeImage"
          accept="image/jpeg/*"
          @change="changePokemonImage()"
        />
      </label>
      <ButtonComponent styleType="warning" style="margin-top: 10px;" @click="removePokemonImage()">
        {{content.generic.buttons.removeImage}}
      </ButtonComponent>
    </div>
  </div>
</template>
