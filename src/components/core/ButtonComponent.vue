<script>
export default {
  props: {
    styleType: {
      type: String,
      default: 'primary',
    },
    type: {
      type: String,
      default: 'link',
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
    dataBsToggle: {
      type: String,
      default: '',
    },
    dataBsTarget: {
      type: String,
      default: '',
    },
    dataBsDismiss: {
      type: String,
      default: '',
    },
  },
};
</script>

<template>
  <RouterLink
    v-if="type == 'router'"
    :class="'btn btn-' + styleType"
    :data-bs-toggle="dataBsToggle"
    :data-bs-target="dataBsTarget"
    :data-bs-dismiss="dataBsDismiss"
    :disabled="isDisabled"
  >
      <slot />
  </RouterLink>
  <a
    v-else
    :class="'btn btn-' + styleType"
    :data-bs-toggle="dataBsToggle"
    :data-bs-dismiss="dataBsDismiss"
    :data-bs-target="dataBsTarget"
    :disabled="isDisabled"
  >
      <slot />
  </a>
</template>

<style lang="scss">
.btn {
  color: var(--text-color) !important;
}
</style>
