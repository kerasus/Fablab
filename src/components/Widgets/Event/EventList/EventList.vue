<template>
  <div class="EventList"
       :style="localOptions.style">
    <div class="row q-col-gutter-md">
      <div v-for="eventItem in events.list"
           :key="eventItem.id"
           :class="localOptions.cols">
        <event-item :event-data="eventItem"
                    :light="localOptions.light"
                    @click="onSelectEvent(eventItem)" />
      </div>
    </div>
  </div>
</template>

<script>
import { EventList } from 'src/models/Event.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { mixinPrefetchServerData, mixinWidget } from 'src/mixin/Mixins.js'
import EventItem from 'src/components/Widgets/Event/Eventtem/EventItem.vue'

export default {
  name: 'EventList',
  components: { EventItem },
  mixins: [mixinWidget, mixinPrefetchServerData],
  data: () => {
    return {
      events: new EventList(),
      defaultOptions: {
        light: false,
        routeToPanel: true,
        cols: 'col-md-3 col-sm-6 col-12'
      }
    }
  },
  methods: {
    prefetchServerDataPromise () {
      return this.getApiRequest()
    },
    prefetchServerDataPromiseThen ({ list }) {
      this.events = new EventList(list)
      this.events.loading = false
    },
    prefetchServerDataPromiseCatch () {
      this.events.loading = false
    },

    getApiRequest() {
      this.events.loading = true
      return APIGateway.event.index()
    },
    onSelectEvent(eventItem) {
      this.$emit('onSelectEvent', eventItem)
    }
  }
}
</script>

<style scoped lang="scss">
.EventList {

}
</style>
