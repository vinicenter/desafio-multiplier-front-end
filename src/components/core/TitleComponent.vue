<script>
export default {
  props: {
    type: {
      type: String,
      default: 'h2',
    },
  },
};
</script>

<template>
<h1 v-if="type == 'h1'">
  <slot></slot>
</h1>
<h2 v-else-if="type == 'h2'">
  <slot></slot>
</h2>
<h3 v-else-if="type == 'h3'">
  <slot></slot>
</h3>
<h4 v-else-if="type == 'h4'">
  <slot></slot>
</h4>
<h5 v-else-if="type == 'h5'">
  <slot></slot>
</h5>
<h6 v-else-if="type == 'h6'">
  <slot></slot>
</h6>
</template>

<style lang="scss" scoped>
h1, h2, h3, h4, h5, h6 {
  color: var(--text-color);
}
</style>
