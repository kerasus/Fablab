<template>
  <div :style="localOptions.style"
       class="feature-card"
       :class="localOptions.className">
    <div class="feature-image-div">
      <q-img class="feature-image"
             :src="localOptions.image"
             @click="onClickLink" />
    </div>
    <div class="feature-title ellipsis"
         @click="onClickLink">
      {{ localOptions.title }}
    </div>
    <div class="feature-description"
         @click="onClickLink">
      {{ localOptions.description }}
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
        link: null
      }
    }
  },
  methods: {
    onClickLink(event) {
      event.preventDefault()
      event.stopPropagation()
      if (this.parentComponent === 'a' || this.localOptions.link.toString().charAt(0) === '/') {
        window.location.href = this.localOptions.link
      } else if (this.parentComponent === 'router-link') {
        this.$router.push(this.localOptions.link)
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
      transition: 0.3s;
      cursor: pointer;
      width: 100px;
      height: 100px;
    }
    .feature-image:hover {
      transform: scale(1.1);
    }
  }
  .feature-title {
    cursor: pointer;
    width: 100%;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 25px;
    text-align: center;
    color: #3774B7;
  }
  .feature-description {
    padding-top: 8px;
    cursor: pointer;
    width: 100%;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 18px;
    text-align: center;
    color: #6589C3;
  }
}
</style>
