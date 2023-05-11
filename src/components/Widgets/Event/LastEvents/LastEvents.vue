<template>
  <div class="event-section">
    <div class="event-header row q-pa-md q-mb-sm">
      <div class="title">آخرین بازی‌ها</div>
      <div class="action">
        <q-btn flat>
          مشاهده همه
        </q-btn>
      </div>
    </div>
    <div class="event-container">
      <carousel v-if="events.list.length > 0"
                dir="rtl"
                class="full-width"
                :breakpoints="breakpoints">
        <slide v-for="event in events.list"
               :key="event.id"
               @click="goToEvent(event.id)">
          <event-item :options="{event, minWidth: defaultMinWidth}" />
        </slide>
      </carousel>
    </div>
  </div>
</template>

<script>
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide } from 'vue3-carousel'
import { EventList } from 'src/models/Event.js'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'
import EventItem from 'src/components/Widgets/Event/Eventtem/EventItem.vue'

export default {
  name: 'LastEvents',
  components: {
    Slide,
    Carousel,
    EventItem
  },
  mixins: [mixinWidget],
  data: () => ({
    defaultMinWidth: '318px',
    events: new EventList(),
    breakpoints: {
      // 1024 and up
      1730: {
        itemsToShow: 3.1
        // snapAlign: 'start'
      },
      // 1500px and up
      1430: {
        itemsToShow: 3.1,
        snapAlign: 'start'
      },
      // 700px and up
      1100: {
        itemsToShow: 3.5,
        snapAlign: 'center'
      },
      // 700px and up
      900: {
        itemsToShow: 3.5,
        snapAlign: 'center'
      },
      // 700px and up
      650: {
        itemsToShow: 3.5,
        snapAlign: 'center'
      },
      // 700px and up
      400: {
        itemsToShow: 2.5,
        snapAlign: 'center'
      },
      // 300px and up
      300: {
        itemsToShow: 1.5,
        snapAlign: 'center'
      }
    },
    defaultOptions: {
      style: {},
      apiName: null,
      gridView: false
    }
  }),
  computed: {
    isGridView: {
      get () {
        return false
        // return this.localOptions.gridView
      },
      set (value) {
        this.localOptions.gridView = value
      }
    }
  },
  mounted () {
    this.getBlocksByRequest()
  },
  methods: {
    goToEvent(eventId) {
      this.$router.push({ name: 'Public.Event.Show', params: { id: eventId } })
    },
    getBlocksByRequest() {
      this.events.loading = true
      APIGateway.event.index()
        .then(({ list }) => {
          this.events = list
        })
        .catch(() => {
          this.events.loading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.product-spacing {
  margin-right: 30px;
}
.set-spacing {
  margin-right: 30px;
}
.content-spacing {
  margin-right: 30px;
}

.event-section {
  margin-bottom: 30px;
  .event-header {
    border-radius: 10px;
    justify-content: space-between;
    .title {
      font-weight: 700;
      font-size: 24px;
      line-height: 140%;
      color: #272727;
    }
    .action {}
  }

  .event-container {
    display: flex;
    margin-bottom: 5px;
    .scroll-view {
      display: flex;
      width: 100%;
      overflow-x: scroll;
      /* this padding is needed due to move animation of card
      to avoid overflow behavior:
      https://stackoverflow.com/questions/6421966/css-overflow-x-visible-and-overflow-y-hidden-causing-scrollbar-issue
      */
      padding-top: 10px;
      padding-bottom: 10px;
      @media screen and (max-width: 600px){
        //height: 500px;
      }
    }
  }
}
</style>
