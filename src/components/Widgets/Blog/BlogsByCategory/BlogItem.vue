<template>
  <router-link class="BlogItem"
               :to="{ name: 'Public.Post.Show', params: { id: post.id } }">
    <q-card flat>
      <div class="thumbnail">
        <img :src="post.thumbnail">
      </div>
      <div class="title ellipsis-2-lines">
        {{ post.title }}
      </div>
    </q-card>
  </router-link>
</template>

<script>
import { Post } from 'src/models/Post.js'

export default {
  name: 'BlogItem',
  props: {
    post: {
      type: Post,
      default: new Post()
    }
  }
}
</script>

<style lang="scss" scoped>
.BlogItem {
  width: 100%;
  background: transparent;
  position: relative;
  .thumbnail {
    &:after {
      content: ' ';
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      box-shadow: 0px -149px 76px -124px rgba(0,0,0,0.75) inset;
      -webkit-box-shadow: 0px -149px 76px -124px rgba(0,0,0,0.75) inset;
      -moz-box-shadow: 0px -149px 76px -124px rgba(0,0,0,0.75) inset;
    }
    img {
      width: 100%;
      max-width: 100%;
    }
  }
  .title {
    position: absolute;
    left: 0;
    bottom: 24px;
    width: 100%;
    color: white;
    text-align: left;
    font-size: 20px;
    font-weight: 700;
    padding: 0 24px;

    @media screen and (max-width: 1024px){
      font-size: 12px;
    }
  }
}
</style>
