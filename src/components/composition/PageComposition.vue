<script setup>
import TextComponent from '@/components/core/TextComponent.vue';
import TitleComponent from '@/components/core/TitleComponent.vue';
import content from '@/config/content.json';
</script>

<script>
export default {
  props: {
    isLoaded: {
      type: Boolean,
      required: true,
    },
    loadingHasError: {
      type: Boolean,
      required: false,
    },
    title: {
      type: null,
    },
    description: {
      type: null,
    },
    isTitleVisible: {
      type: Boolean,
      default: true,
    },
    isDescriptionVisible: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      isLoadingSlow: false,
    };
  },
  mounted() {
    setTimeout(() => {
      this.isLoadingSlow = true;
    }, 500);
  },
  components: { TextComponent, TitleComponent },
};
</script>

<template>
  <div class="container">
    <div v-if="isTitleVisible && isLoaded">
      <TitleComponent type="h2">{{ title }}</TitleComponent>
    </div>
    <div v-if="isDescriptionVisible  && isLoaded">
      <TextComponent>{{ description }}</TextComponent>
    </div>
    <slot v-if="isLoaded"></slot>
    <div v-else class="spinner">
      <div v-if="!loadingHasError" class="spinner-border" role="status">
        <span class="visually-hidden">{{ content.generic.load.loadingMessage }}</span>
      </div>
      <div v-if="isLoadingSlow && !loadingHasError">
        <TextComponent>{{ content.generic.load.fewSecondsLeft }}</TextComponent>
      </div>
      <div v-if="loadingHasError">
        <TextComponent>{{ content.generic.load.error }}</TextComponent>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  margin-top: 80px;
  height: 83vh;
}
.spinner {
  display: flex;
  height: 70vh;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
</style>
