<script>
export default {
  props: {
    badges: {
      type: Array,
    },
  },
};
</script>

<template>
  <span
    v-for="badge in badges"
    :key="badge"
    :class="'badge badge-pill' + ' bg-' + badge[0]"
  >
    {{badge[1]}}
  </span>
</template>

<style lang="scss">
.badge {
  margin-right: 8px;
  margin-bottom: 8px;
  margin-top: 8px;
}
</style>
