<template>
  <div class="post printable">
    <template v-if="!post.loading">
      <div class="breadcrumbs">
        <breadcrumbs />
      </div>
      <div ref="printArea"
           class="print-area">
        <div v-if="!post.post"
             class="post-title">
          {{post.title}}
        </div>

        <q-separator class="q-mt-md" />

        <div class="post-body"
             v-html="post.text" />

        <div class="attributes">
          <!--name: 'Public.PostCategoryParentParent.Show', params: {category_id: post.category_info.parent.parent.id}          -->
          <q-btn v-if="post.category_info?.parent?.parent?.id"
                 :to="{}"
                 class="attribute-item">
            {{post.category_info.parent.parent.title}}
          </q-btn>
          <!--name: this.localOptions.postCategoryShowRouteName , params: {category_id: post.category_info.parent.id}          -->
          <q-btn v-if="post.category_info?.parent?.id"
                 :to="{}"
                 class="attribute-item">
            {{post.category_info.parent.title}}
          </q-btn>
          <q-btn v-if="post.category_info?.id"
                 :to="{name: localOptionsPostCategoryShowRouteNameComputed , params: {category_id: post.category_info.id}}"
                 class="attribute-item">
            {{post.category_info.title}}
          </q-btn>
        </div>
      </div>
    </template>

    <template v-else>
      <q-skeleton type="circle"
                  size="100px"
                  class="q-mt-md" />
      <q-skeleton width="150px"
                  class="q-mt-md" />
      <q-skeleton height="150px"
                  class="q-mt-md" />
    </template>
  </div>
</template>

<script>
import { Post } from 'src/models/Post.js'
// import ShamsiDate from 'src/assets/ShamsiDate.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { mixinPrefetchServerData, mixinWidget } from 'src/mixin/Mixins.js'
import Breadcrumbs from 'src/components/Widgets/Breadcrumbs/Breadcrumbs.vue'

export default {
  name: 'Public.PostShow',
  components: { Breadcrumbs },
  mixins: [mixinWidget, mixinPrefetchServerData],
  // emits: ['onloadn'],
  data () {
    return {
      breadcrumbs: {
        visible: true,
        loading: false,
        path: [
        ]
      },
      defaultOptions: {
        profileMode: false,
        postShowRouteName: 'Public.Post.Show',
        homeRouteNameTitle: 'فب لب',
        homeRouteName: 'Public.Home',
        postCategoryShowRouteName: 'Public.PostCategory.Show'
      },
      post: new Post()
    }
  },
  computed: {
    postId () {
      return this.$route.params.id ?? this.$route.params.post_id
    },
    localOptionsPostCategoryShowRouteNameComputed() {
      return this.localOptions.postCategoryShowRouteName
    }
  },
  methods: {
    prefetchServerDataPromise () {
      return this.getPost()
    },
    prefetchServerDataPromiseThen (post) {
      this.post = new Post(post)
      this.post.post = false
      this.breadcrumbs.path.push({
        label: this.localOptions.homeRouteNameTitle,
        to: { name: this.localOptions.homeRouteName }
      })
      this.breadcrumbs.path.push({
        label: this.post.category_info.title,
        to: { name: this.localOptions.postCategoryShowRouteName, params: { category_id: this.post.category_info.id } }
      })
      this.breadcrumbs.path.push({
        label: this.post.title,
        to: { name: this.localOptions.postShowRouteName, params: { id: this.post.id } }
      })
      this.$store.commit('AppLayout/updateBreadcrumbs', this.breadcrumbs)
      // this.$emit('onloadn', this.post)
    },
    prefetchServerDataPromiseCatch () {
      this.post.post = false
    },
    getPost () {
      this.post.post = true
      return APIGateway.post.get(this.postId)
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/css/HTMLContent.scss";
.post {
  .breadcrumbs {
    margin-top: 24px;
    margin-bottom: 32px;
  }
  .post-title {
    font-weight: 900;
    font-size: 1.4rem;
  }
  .attributes {
      display: flex;
      flex-flow: row;
      margin-bottom: 16px;
    .attribute-item {
      color: #475f4a;
      background-color: #eaeaea;
      border-radius: 8px;
      padding: 4px 8px;
      margin: 0 4px;
      font-size: 16px;
    }
  }
  .print-btn {
    width: 252px;
  }
  :deep(.post-body) {
    margin-top: 32px;
    @include HTMLContent;
  }
}
</style>
