<script>
export default {
  props: {
    name: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    col: {
      type: String,
      default: 'col-12 col-md-6 mb-3',
    },
    label: {
      type: String,
      default: '',
    },
    footer: {
      type: String,
      default: '',
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
    isReadonly: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'text',
    },
  },
  methods: {
    doInput(e) {
      let ret = e.target.value;
      if (this.type === 'number') {
        ret = parseFloat(ret);
      }
      this.$emit('update:modelValue', ret);
    },
  },
};
</script>

<template>
  <div style="width: 100%;">
    <label :for="name" :class="col" class="form-label">
      {{ label }}
      <input
        class="form-control"
        :id="name"
        :name="name"
        :placeholder="placeholder"
        v-bind:readonly="isReadonly === true"
        v-bind:disable="isDisabled === true"
        ref="input"
        :value="this.$attrs.modelValue"
        :type="type"
        @input="doInput($event)"
      >
      <div class="form-text">
        {{ footer }}
      </div>
    </label>
  </div>
</template>

<style lang="scss">
input {
  border: 1px solid var(--border-color) !important;
  color: var(--text-color) !important;
}

input::placeholder {
  color: var(--hover-color) !important;
}

label {
  color: var(--text-color) !important;
}
</style>
