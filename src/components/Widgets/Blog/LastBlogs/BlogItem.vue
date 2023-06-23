<template>
  <q-card class="BlogItem"
          flat>
    <div class="thumbnail">
      <q-img :src="media.thumbnail" />
    </div>
    <div class="texts">
      <div class="category-title">
        {{ media.category_info.title }}
      </div>
      <div class="title ellipsis-2-lines">
        {{ media.title }}
      </div>
      <div class="published-date">
        تاریخ انتشار
        {{ miladiToShamsi(media.creation_time) }}
      </div>
    </div>
  </q-card>
</template>

<script>
import { Media } from 'src/models/Media.js'
import Assist from 'src/assets/js/Assist.js'

export default {
  name: 'BlogItem',
  props: {
    media: {
      type: Media,
      default: new Media()
    }
  },
  methods: {
    miladiToShamsi (date) {
      return Assist.miladiToShamsi(date, 'jDD jMMM jYYYY')
    }
  }
}
</script>

<style lang="scss" scoped>
.BlogItem {
  display: flex;
  flex-flow: row;
  justify-content: flex-start;
  border: 2px solid transparent;
  padding: 16px;
  &:hover {
    border-radius: 14px;
    border-color: #0B6AB1;
  }
  .thumbnail {
    width: 148px;
    .q-img {
      width: 100%;
    }
  }
  .texts {
    width: calc(100% - 148px);
    position: relative;
    padding-left: 14px;
    .category-title {
      width: max-content;
      border-radius: 3px;
      background: #E3E7F4;
      padding: 4px 8px;
      color: #666;
      font-size: 14px;
      font-weight: 500;
      line-height: 100%;
      margin-bottom: 8px;
    }
    .title {
      width: 100%;
      color: #000;
      text-align: left;
      font-size: 18px;
      font-weight: 700;
    }
    .published-date {
      color: #000;
      text-align: right;
      font-size: 14px;
      font-weight: 200;
      position: absolute;
      left: 14px;
      bottom: 0;
    }
  }
}
</style>
