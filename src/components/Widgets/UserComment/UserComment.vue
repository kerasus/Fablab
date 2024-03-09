<template>
  <q-card class="UserComment"
          :style="localOptions.style"
          :class="localOptions.className">
    <div class="image" />
    <div class="comment"
         v-html="localOptions.comment" />
    <div class="user">
      <div class="thumbnail">
        <q-avatar>
          <q-img :src="localOptions.user.thumbnail" />
        </q-avatar>
      </div>
      <div class="info">
        <div class="fullname">
          {{ localOptions.user.fullname }}
        </div>
        <div class="title">
          {{ localOptions.user.title }}
        </div>
      </div>
    </div>
  </q-card>
</template>

<script>
import { mixinWidget } from 'src/mixin/Mixins.js'

export default {
  name: 'TextWidget',
  mixins: [mixinWidget],
  data () {
    return {
      defaultOptions: {
        comment: '',
        user: {
          fullname: '',
          title: '',
          thumbnail: ''
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.UserComment {
  padding: 43px 94px;
  .image {
    height: 60px;
    margin-bottom: 40px;
    position: relative;
    &:before {
      content: '“';
      color: #D9D9D9;
      text-align: center;
      font-size: 96px;
      font-weight: 600;
      position: absolute;
      width: 100%;
      left: 0;
      top: 0;
    }
  }
  .comment {
    color: #808080;
    text-align: center;
    font-size: 16px;
    line-height: 30px;
    margin-bottom: 40px;
  }
  .user {
    display: flex;
    flex-flow: row;
    justify-content: center;
    .thumbnail {
      width: 56px;
    }
    .info {
      margin-left: 7px;
      .fullname {
        color: #484848;
        font-size: 16px;
        font-weight: 700;
      }
      .title {
        color: #808080;
        font-size: 12px;
      }
    }
  }
}
</style>
