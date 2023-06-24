<template>
  <div class="ServiceList"
       :style="localOptions.style">
    <div class="row q-col-gutter-md">
      <div v-for="serviceItem in services.list"
           :key="serviceItem.id"
           :class="localOptions.cols">
        <service-item :service-data="serviceItem"
                      :light="localOptions.light" />
      </div>
    </div>
  </div>
</template>

<script>
import { APIGateway } from 'src/api/APIGateway.js'
import { ServiceList } from 'src/models/Service.js'
import { mixinPrefetchServerData, mixinWidget } from 'src/mixin/Mixins.js'
import ServiceItem from 'src/components/Widgets/Service/ServiceList/ServiceItem.vue'

export default {
  name: 'ServiceList',
  components: { ServiceItem },
  mixins: [mixinWidget, mixinPrefetchServerData],
  data: () => {
    return {
      services: new ServiceList(),
      defaultOptions: {
        light: false,
        cols: 'col-md-3 col-sm-6 col-12'
      }
    }
  },
  methods: {
    prefetchServerDataPromise () {
      return this.getApiRequest()
    },
    prefetchServerDataPromiseThen ({ list }) {
      this.services = new ServiceList(list)
      this.services.loading = false
    },
    prefetchServerDataPromiseCatch () {
      this.services.loading = false
    },

    getApiRequest() {
      this.services.loading = true
      return APIGateway.service.index()
    }
  }
}
</script>

<style scoped lang="scss">
.ServiceList {

}
</style>
