<template>
  <div class="RegisterEvent"
       :style="localOptions.style">
    <div class="list">
      <div class="list-title">
        رویدادها
      </div>
      <div>
        <event-list :options="{cols: 'col-md-4 col-sm-6 col-12', light:true}"
                    @onSelectEvent="onSelectEvent" />
        <q-inner-loading :showing="selectedEvent.loading">
          <q-spinner-gears size="50px"
                           color="primary" />
        </q-inner-loading>
      </div>
    </div>
  </div>
</template>

<script>
import { Event } from 'src/models/Event.js'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'
import EventList from 'src/components/Widgets/Event/EventList/EventList.vue'

export default {
  name: 'RegisterEvent',
  components: {
    EventList
  },
  mixins: [mixinWidget],
  data: () => {
    return {
      mounted: false,
      selectedEvent: new Event()
    }
  },
  mounted () {
    this.mounted = true
  },
  methods: {
    onSelectEvent (event) {
      this.selectedEvent = event
      if (this.selectedEvent.is_current_user_registered) {
        this.$q.notify({
          message: 'پیش از این در این همایش ثبت نام کرده اید',
          type: 'positive'
        })
        return
      }
      this.registerEvent()
    },
    registerEvent () {
      this.selectedEvent.loading = true
      APIGateway.event.register(this.selectedEvent.id)
        .then((event) => {
          this.selectedEvent = new Event(event)
          this.selectedEvent.loading = false
          this.$q.notify({
            message: 'ثبت نام در رویداد با موفقیت انجام شد.',
            type: 'positive'
          })
        })
        .catch(() => {
          this.selectedEvent.loading = false
        })
    }
  }
}
</script>

<style scoped lang="scss">
.RegisterEvent {
  .list {
    margin-bottom: 40px;
    .list-title {
      color: #424242;
      font-size: 24px;
      font-weight: 700;
      line-height: 140%;
      margin-bottom: 32px;
    }
  }
}
</style>
