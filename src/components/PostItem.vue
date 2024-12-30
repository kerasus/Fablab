<template>
  <div class="col-md-4 col-sm-6 col-12">
    <q-card flat
            class="PostItem">
      <div class="thumbnail">
        <router-link :to="{name: postShowRouteName, params: {id: post.id, post_id: post.id}}">
          <q-img :src="post.thumbnail" />
        </router-link>
      </div>
      <div class="title ellipsis-2-lines">
        <router-link :to="{name: postShowRouteName, params: {id: post.id, post_id: post.id}}">
          {{post.title}}
        </router-link>
      </div>
      <div class="child-category ellipsis-2-lines">
        <router-link v-if="post.category_info?.id"
                     :to="{name: 'Public.PostCategory.Show', params: {category_id: post.category_info?.id}}">
          <q-icon name="account_tree" />
          دسته:
          {{post.category_info?.title}}
        </router-link>
      </div>
      <q-card-actions class="action-section">
        <q-btn color="primary"
               class="btn-show-post"
               :class="btnShowPostClassName"
               :to="{name: postShowRouteName, params: {id: post.id, post_id: post.id}}">
          مشاهده جزئیات
        </q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { Post } from 'src/models/Post.js'

export default defineComponent({
  name: 'PostItem',
  props: {
    post: {
      type: Post,
      default: new Post()
    },
    postShowRouteName: {
      type: String,
      default: 'Public.Post.Show'
    },
    btnShowPostClassName: {
      type: String
    }
  }
  // mounted() {
  //   const bodyStyles = document.body.style
  //   bodyStyles.setProperty('--q-primary', '#b10b6a!important')
  // }
})
</script>

<style lang="scss" scoped>
.PostItem {
  background-color: #f6f6f6;
  border-radius: 0 0 54px 0;
  padding: 20px 20px 30px;
  margin: 8px;
  .thumbnail {
    margin-bottom: 43px;
    .q-img {
      border-radius: 0 0 54px 0;
    }
  }
  .title {
    font-size: 17px;
    letter-spacing: 0;
    padding-right: 26px;
    padding-left: 26px;
    margin-bottom: 16px;
    a {
      color: #475F4A;
    }
  }
  .child-category {
    font-size: 17px;
    letter-spacing: 0;
    padding-right: 26px;
    padding-left: 26px;
    margin-bottom: 31px;
    a {
      color: #475F4A;
    }
  }
  .action-section {
    .btn-show-post {
      width: 100%;
      height: 48px;
      max-width: 252px;
      margin: auto;
      //background-color: greenyellow!important;
      //--q-primary: red!important;
      //--q-primary: orange;
    }
    .btn-show-post-fablab {
      --q-primary: #0063AE;
    }

    .btn-show-post-fabfactory {
      --q-primary: #F8AF18;
    }

    .btn-show-post-fabcafe {
      --q-primary: #D83527;
    }

    .btn-show-post-fabkids {
      --q-primary: #25a74a;
    }
  }
}
</style>
