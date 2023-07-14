<template>
  <div class="BlogItem">
    <image-widget :options="{imageSource: media.thumbnail, action: {type: 'full-view'}}" />
    <!--    <div class="text-center">-->
    <!--      {{ media.title }}-->
    <!--      <br>-->
    <!--      {{ miladiToShamsi(media.creation_time) }}-->
    <!--    </div>-->
  </div>
</template>

<script>
import { Media } from 'src/models/Media.js'
import Assist from 'src/assets/js/Assist.js'
import ImageWidget from 'src/components/Widgets/ImageWidget/ImageWidget.vue'

export default {
  name: 'BlogItem',
  components: { ImageWidget },
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
  flex-flow: column;
  justify-content: center;
  align-items: center;
  border: 2px solid transparent;
  padding: 16px;
}
</style>
