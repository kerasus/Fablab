<template>
  <div class="LastBlogs row q-col-gutter-md"
       :style="localOptions.style">
    <div v-for="post in postList.list"
         :key="post.id"
         class="col-md-6 col-12">
      <post-item :post="post"
                 :post-show-route-name="localOptions.postShowRouteName" />
    </div>
  </div>
</template>

<script>
import PostItem from './PostItem.vue'
import { PostList } from 'src/models/Post.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { mixinPrefetchServerData, mixinWidget } from 'src/mixin/Mixins.js'

export default {
  name: 'LastPosts',
  components: {
    PostItem
  },
  mixins: [mixinWidget, mixinPrefetchServerData],
  data () {
    return {
      mounted: false,
      defaultOptions: {
        postShowRouteName: 'Public.Post.Show',
        postItemsCount: 10,
        categoryId: null,
        categoryParentId: null,
        categoryParentParentId: 1
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
      return APIGateway.post.index({ category__parent__parent: this.localOptions.categoryParentParentId, category__parent: this.localOptions.categoryParentId, category: this.localOptions.categoryId, per_page: this.localOptions.postItemsCount })
    }
  }
}
</script>

<style scoped lang="scss">
.LastBlogs {
}
</style>
