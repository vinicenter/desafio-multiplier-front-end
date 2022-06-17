<script setup>
import TitleComponent from '@/components/core/TitleComponent.vue';
</script>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
    },
  },
  components: { TitleComponent },
};
</script>

<template>
<div class="modal fade" :id="id" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <TitleComponent :type="'h3'">{{ title }}</TitleComponent>
        <button
          type="button"
          class="btn-close btn-close-white"
          data-bs-dismiss="modal"
          aria-label="Close"
        />
      </div>
      <div class="modal-body">
        <slot></slot>
      </div>
    </div>
  </div>
</div>
</template>

<style lang="scss" scope>
.modal-header {
  border-bottom: none !important;
}

.modal-body {
  padding: 1rem 1rem 1rem 1rem;
  border-radius: 18px !important;
}

.modal-content {
  background-color: var(--card-background-color) !important;
  -webkit-box-shadow: 0 0 27px 0 rgb(0 0 0 / 10%) !important;
  -moz-box-shadow: 0 0 27px 0 rgba(0,0,0,.10) !important;
  box-shadow: 0 0 27px 0 rgb(0 0 0 / 10%) !important;
  border-radius: 5px !important;
  -webkit-transition: color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  transition: color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  &:hover {
    -webkit-box-shadow: 0 0 27px 0 rgb(0 0 0 / 51%) !important;
    -moz-box-shadow: 0 0 27px 0 rgba(0,0,0,.51) !important;
    box-shadow: 0 0 27px 0 rgb(0 0 0 / 51%) !important;
    -webkit-transition: color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    transition: color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }
}
</style>
