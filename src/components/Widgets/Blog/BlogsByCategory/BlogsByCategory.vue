<template>
  <div class="BlogsByCategory"
       dir="ltr"
       :style="localOptions.style">
    <carousel v-if="mounted"
              :items-to-show="3"
              :snap-align="'center'"
              wrapAround
              dir="rtl">
      <slide v-for="media in mediaList.list"
             :key="media.id">
        <blog-item :media="media"
                   @click="toBlog(media.id)" />
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
import {
  Carousel, Slide, Pagination
/* Navigation */
} from 'vue3-carousel/dist/carousel'
import { MediaList } from 'src/models/Media.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { mixinPrefetchServerData, mixinWidget } from 'src/mixin/Mixins.js'
import BlogItem from 'src/components/Widgets/Blog/BlogsByCategory/BlogItem.vue'

export default {
  name: 'BlogsByCategory',
  components: {
    BlogItem,
    Carousel,
    Slide,
    Pagination
    // Navigation
  },
  mixins: [mixinWidget, mixinPrefetchServerData],
  data: () => {
    return {
      mounted: false,
      mediaList: new MediaList()
    }
  },
  mounted() {
    this.mounted = true
  },
  methods: {
    toBlog (mediaId) {
      this.$router.push({ name: 'Public.Blog.Show', params: { id: mediaId } })
    },
    prefetchServerDataPromise () {
      return this.getApiRequest()
    },
    prefetchServerDataPromiseThen ({ list }) {
      this.mediaList = new MediaList(list)
      this.mediaList.loading = false
    },
    prefetchServerDataPromiseCatch () {
      this.mediaList.loading = false
    },

    getApiRequest() {
      this.mediaList.loading = true
      return APIGateway.media.index()
    }
  }
}
</script>

<style scoped lang="scss">
.BlogsByCategory {
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
