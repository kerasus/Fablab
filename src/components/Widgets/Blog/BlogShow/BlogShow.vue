<template>
  <div class="BlogShow"
       :style="localOptions.style">
    <div class="title">
      <template v-if="media.loading">
        <q-skeleton type="text"
                    class="q-ml-lg"
                    width="100px" />
      </template>
      <template v-else>
        {{ media.title }}
      </template>
    </div>
    <div class="thumbnail">
      <q-img :src="media.thumbnail" />
    </div>
    <div class="description"
         v-html="media.description" />
    <div v-if="media.hashtags_info.list.length > 0"
         class="hashtags">
      <q-btn flat
             class="hashtag-item-title">
        برچسب‌ها
      </q-btn>
      <q-btn v-for="hashtag in media.hashtags_info.list"
             :key="hashtag.id"
             unelevated
             class="hashtag-item">
        {{ hashtag.title }}
      </q-btn>
    </div>
  </div>
</template>

<script>
import { Media } from 'src/models/Media.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { mixinPrefetchServerData, mixinWidget } from 'src/mixin/Mixins.js'

export default {
  name: 'BlogShow',
  mixins: [mixinWidget, mixinPrefetchServerData],
  data: () => {
    return {
      media: new Media()
    }
  },
  methods: {
    prefetchServerDataPromise () {
      return this.getApiRequest()
    },
    prefetchServerDataPromiseThen (media) {
      this.media = new Media(media)
      this.media.loading = false
    },
    prefetchServerDataPromiseCatch () {
      this.media.loading = false
    },
    getApiRequest() {
      this.media.loading = true
      return APIGateway.media.get({ data: { id: this.$route.params.id } })
    }
  }
}
</script>

<style scoped lang="scss">
.BlogShow {
  .title {
    color: #2E2E2E;
    text-align: center;
    font-size: 28px;
    font-weight: 1000;
    margin-bottom: 58px;
  }
  .thumbnail {
    width: 100%;
    max-width: 300px;
    margin: 0 auto 72px auto;
    .q-img {
      width: 100%;
      //border-radius: 24px;
      //box-shadow: 0 8px 44px 0 rgba(0, 0, 0, 0.25);
    }
  }
  .description {
    color: #272727;
    font-size: 20px;
    margin-bottom: 32px;
  }
  .hashtags {
    display: flex;
    flex-flow: row;
    justify-content: flex-start;
    .hashtag-item-title {
      margin-right: 26px;
    }
    .hashtag-item {
      margin-right: 26px;
      background: #E3E7F4;
      color: #0B6AB1;
    }
  }
}
</style>
