<template>
  <q-card class="BlogItem"
          flat>
    <div class="thumbnail">
      <q-img :src="media.thumbnail" />
    </div>
    <div class="title ellipsis-2-lines">
      {{ media.title }}
    </div>
  </q-card>
</template>

<script>
import { Media } from 'src/models/Media.js'

export default {
  name: 'BlogItem',
  props: {
    media: {
      type: Media,
      default: new Media()
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
  }
}
</style>
