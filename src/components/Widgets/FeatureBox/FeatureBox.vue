<template>
  <div :style="localOptions.style"
       class="feature-card"
       :class="localOptions.className">
    <div class="feature-image-div">
      <q-img class="feature-image"
             :src="localOptions.image" />
    </div>
    <div class="feature-title ellipsis">
      {{ localOptions.title }}
    </div>
  </div>
</template>

<script>
import { mixinWidget } from 'src/mixin/Mixins.js'

export default {
  name: 'FeatureBox',
  mixins: [mixinWidget],
  data() {
    return {
      defaultOptions: {
        title: null,
        description: null,
        image: null,
        horizontal: true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.feature-card {
  width: 100%;
  max-width: 100%;
  box-shadow: none;
  .feature-image-div {
    width: 100%;
    text-align: center;
    margin-bottom: 16px;
    .feature-image {
      width: 100px;
      height: 100px;
    }
  }

  .feature-title {
    width: 100%;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 25px;
    text-align: center;
    color: #3774B7;
  }
}
</style>
