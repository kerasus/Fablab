<template>
  <div class="ServiceList"
       :style="localOptions.style">
    <div class="row q-col-gutter-md">
      <div v-for="serviceItem in services.list"
           :key="serviceItem.id"
           :class="localOptions.cols">
        <service-item :service-data="serviceItem"
                      :light="localOptions.light"
                      @click="onSelectService(serviceItem)" />
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
        routeToPanel: false,
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

    getApiRequest () {
      this.services.loading = true
      return APIGateway.service.index()
    },
    onSelectService (serviceItem) {
      const services = this.$store.getters['Reservation/services']
      const target = services.list.findIndex(serviceData => serviceData.id === serviceItem.id)
      if (target === -1) {
        services.add(serviceItem)
      } else {
        services.list.splice(target, 1)
      }
      this.$store.commit('Reservation/updateServices', services)
      if (this.localOptions.routeToPanel) {
        this.$router.push({ name: 'UserPanel.Reservation' })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.ServiceList {

}
</style>
