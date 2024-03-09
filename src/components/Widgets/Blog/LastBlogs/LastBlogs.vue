<template>
  <div class="LastBlogs row q-col-gutter-md"
       :style="localOptions.style">
    <div v-for="media in mediaList.list"
         :key="media.id"
         class="col-md-6 col-12">
      <blog-item :media="media" />
    </div>
  </div>
</template>

<script>
import { MediaList } from 'src/models/Media.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { mixinPrefetchServerData, mixinWidget } from 'src/mixin/Mixins.js'
import BlogItem from 'src/components/Widgets/Blog/LastBlogs/BlogItem.vue'

export default {
  name: 'LastBlogs',
  components: {
    BlogItem
  },
  mixins: [mixinWidget, mixinPrefetchServerData],
  data: () => {
    return {
      mounted: false,
      mediaList: new MediaList()
    }
  },
  mounted () {
    this.mounted = true
  },
  methods: {
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

    getApiRequest () {
      this.mediaList.loading = true
      return APIGateway.media.index()
    }
  }
}
</script>

<style scoped lang="scss">
.LastBlogs {
}
</style>
