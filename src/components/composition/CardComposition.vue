<script setup>
import TitleComponent from '@/components/core/TitleComponent.vue';
import TextComponent from '@/components/core/TextComponent.vue';
import BadgeComponent from '@/components/core/BadgeComponent.vue';
</script>

<script>
export default {
  props: {
    collum: {
      type: String,
      default: 'col-12 col-md-6 col-lg-4',
    },
    style: {
      type: String,
      default: '',
    },
    urlType: {
      type: String,
      default: 'router',
    },
    url: {
      type: String,
    },
    imgUrl: {
      type: String,
      default: '',
    },
    headerTitle: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    maxDescription: {
      type: Number,
    },
    badges: {
      type: Array,
    },
  },
  data() {
    return {
      descriptionProcessed: {
        type: String,
      },
    };
  },
  created() {
    if (this.description != null) {
      if (this.description.length > this.maxDescription) {
        this.descriptionProcessed = this.description.substring(0, this.maxDescription);
        this.descriptionProcessed += '...';
      } else {
        this.descriptionProcessed = this.description;
      }
    }
  },
  component: {
    TitleComponent,
    TextComponent,
    BadgeComponent,
  },
};
</script>

<template>
  <div :class="collum">
    <div class="card text-white mb-3" :style="style">
      <div v-if="!(headerTitle == '')" class="card-header">{{headerTitle}}</div>
      <div class="card-body">
        <RouterLink v-if="!(imgUrl == '') && urlType == 'router' && url !== undefined" :to="url">
          <img :src="imgUrl" loading="lazy" class="card-img-top mx-auto d-block" alt="...">
        </RouterLink>
        <a v-else-if="!(imgUrl == '')" :href="url">
          <img :src="imgUrl" loading="lazy" class="card-img-top mx-auto d-block" alt="...">
        </a>
        <div>
          <BadgeComponent :badges="badges" />
          <TitleComponent v-if="!(title == '')" type="h5">{{title}}</TitleComponent>
          <TextComponent v-if="!(description == '')">{{descriptionProcessed}}</TextComponent>
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  -webkit-box-shadow: 0 0 27px 0 rgb(0 0 0 / 10%) !important;
  -moz-box-shadow: 0 0 27px 0 rgba(0,0,0,.10) !important;
  box-shadow: 0 0 27px 0 rgb(0 0 0 / 10%) !important;
  border-radius: 5px !important;
}
.card:hover {
  border-color: var(--hover-color);
  -webkit-transition: color 1s ease, border-color 1s ease;
  transition: color 1s ease, border-color 1s ease;
  -webkit-box-shadow: 0 0 27px 0 rgb(0 0 0 / 51%) !important;

  -moz-box-shadow: 0 0 27px 0 rgba(0,0,0,.51) !important;
  box-shadow: 0 0 27px 0 rgb(0 0 0 / 51%) !important;

  -webkit-transition: color 1s ease, box-shadow 1s ease;
  transition: color 1s ease, box-shadow 1s ease;
}
.card-header {
  background-color: var(--background-tertiary);
}
.card-body {
  padding: 1rem 1rem 1rem 1rem;
  border-radius: 18px !important;
}
.card-img-top {
  height: 13rem;
  width: auto;
}
@media (max-width: 1400px) {
  .card-img-top {
    height: 10rem;
  }
}
@media (max-width: 1200px) {
  .card-img-top {
    height: 10rem;
  }
}
@media (max-width: 766px) {
  .card-img-top {
    width: 18rem;
    height: auto;
  }
}
@media (max-width: 572px) {
  .card-img-top {
    width: 15rem;
    height: auto;
  }
}
@media (max-width: 486px) {
  .card-img-top {
    width: 13rem;
    height: auto;
  }
}
@media (max-width: 326px) {
  .card-img-top {
    width: 8rem;
    height: auto;
  }
}
</style>
