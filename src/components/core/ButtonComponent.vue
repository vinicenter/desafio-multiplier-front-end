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
    href: {
      type: String,
      default: '#',
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
    :to="href" :class="'btn btn-' + styleType"
    :data-bs-toggle="dataBsToggle"
    :data-bs-target="dataBsTarget"
    :data-bs-dismiss="dataBsDismiss"
    :disabled="isDisabled"
  >
      <slot />
  </RouterLink>
  <a
    v-else
    :href="href"
    :class="'btn btn-' + styleType"
    :data-bs-toggle="dataBsToggle"
    :data-bs-dismiss="dataBsDismiss"
    :data-bs-target="dataBsTarget"
    :disabled="isDisabled"
  >
      <slot />
  </a>
</template>
