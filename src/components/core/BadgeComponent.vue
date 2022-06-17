<script>
export default {
  props: {
    badges: {
      type: Array,
    },
    GoToType: {
      type: Boolean,
    },
  },
};
</script>

<template>
  <span
    v-for="badge in badges"
    :key="badge"
    :class="'badge badge-pill' + ' bg-' + badge[0]"
    data-bs-dismiss="modal"
  >
    <RouterLink
      v-if="GoToType"
      :to="'/type/' + badge[1]"
    >
      {{ badge[1] }}
    </RouterLink>
    <a v-else>
      {{ badge[1] }}
    </a>
  </span>
</template>

<style lang="scss">
a {
  text-decoration: none;
  color: var(--text-color);

  &:hover {
    color: var(--text-color-hover) !important;
  }
}
.badge {
  margin-right: 8px;
  margin-bottom: 8px;
  margin-top: 8px;
  padding: 10px;
  border-radius: 20px !important;
  cursor: default;
  transition: color 0.15s ease-in-out, opacity 0.15s ease-in-out;
  -webkit-transition: color 0.15s ease-in-out, opacity 0.15s ease-in-out;

  &:hover {
    opacity: 0.8;
    transition: color 0.15s ease-in-out, opacity 0.15s ease-in-out;
    -webkit-transition: color 0.15s ease-in-out, opacity 0.15s ease-in-out;
  }
}
</style>
