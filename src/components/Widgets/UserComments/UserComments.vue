<template>
  <div class="user-comments"
       dir="ltr"
       :style="localOptions.style">
    <carousel v-if="mounted"
              :items-to-show="1.3"
              :snap-align="'center'"
              wrapAround
              dir="rtl">
      <slide v-for="(comment, commentIndex) in localOptions.comments"
             :key="commentIndex">
        <user-comment :options="comment" />
      </slide>

      <template #addons="{ slidesCount }">
        <!--        <navigation v-if="slidesCount > 1" />-->
        <pagination v-if="slidesCount > 1" />
      </template>
    </carousel>
  </div>
</template>

<script>
import 'vue3-carousel/dist/carousel.css'
import UserComment from 'src/components/Widgets/UserComment/UserComment.vue'
import {
  Carousel, Slide, Pagination
  /* Navigation */
} from 'vue3-carousel/dist/carousel'
import { mixinWidget } from 'src/mixin/Mixins.js'

export default {
  name: 'BlogsByCategory',
  components: {
    Slide,
    Carousel,
    Pagination,
    UserComment
    // Navigation
  },
  mixins: [mixinWidget],
  data: () => {
    return {
      mounted: false,
      defaultOptions: {
        comments: []
      }
    }
  },
  mounted() {
    this.mounted = true
  }
}
</script>

<style scoped lang="scss">
.q-card{
  //border-radius: 16px 0 16px 16px !important;
  border-radius: 0 !important;
}
.user-comments {
  direction: ltr;
  :deep(.carousel) {
    .carousel__viewport {
      padding-top: 25px;
      padding-bottom: 25px;
      .carousel__track {
        .carousel__slide {
          transition: all 0.5s;
          &.carousel__slide--active {
            transform: scale(1.1);
            z-index: 9;
          }
        }
      }
    }
  }
}
</style>
