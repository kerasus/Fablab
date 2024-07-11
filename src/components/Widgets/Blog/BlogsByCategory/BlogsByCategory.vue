<template>
  <div class="BlogsByCategory"
       dir="ltr"
       :style="localOptions.style">
    <carousel v-if="mounted"
              :items-to-show="2"
              :snap-align="'center'"
              wrapAround
              dir="rtl">
      <slide v-for="post in postList.list"
             :key="post.id">
        <blog-item :post="post" />
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
import { PostList } from 'src/models/Post.js'
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
      defaultOptions: {
        categoryId: null,
        categoryParentId: null,
        categoryParentParentId: null
      },
      postList: new PostList()
    }
  },
  mounted() {
    this.mounted = true
    this.loadData()
  },
  methods: {
    loadData () {
      this.getApiRequest()
        .then((data) => {
          this.prefetchServerDataPromiseThen(data)
        })
        .catch(() => {
          this.prefetchServerDataPromiseCatch()
        })
    },
    prefetchServerDataPromise () {
      return this.getApiRequest()
    },
    prefetchServerDataPromiseThen ({ list }) {
      this.postList = new PostList(list)
      this.postList.loading = false
    },
    prefetchServerDataPromiseCatch () {
      this.postList.loading = false
    },

    getApiRequest() {
      this.postList.loading = true
      return APIGateway.post.index({ category__parent__parent: this.localOptions.categoryParentParentId, category__parent: this.localOptions.categoryParentId, category: this.localOptions.categoryId })
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
