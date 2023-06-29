<template>
  <q-card class="EventItem"
          :class="{'light': light, isSelectedItem}"
          flat>
    <div class="EventItem-head">
      <div class="thumbnail">
        <q-img :src="eventData.thumbnail" />
      </div>
      <div class="title ellipsis-2-lines">
        {{ eventData.title }}
      </div>
    </div>
  </q-card>
</template>

<script>
import { Event } from 'src/models/Event.js'

export default {
  name: 'EventItem',
  props: {
    eventData: {
      type: Event,
      default: new Event()
    },
    light: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    isSelectedItem () {
      return this.eventData.is_current_user_registered
    }
  }
}
</script>

<style lang="scss" scoped>
.EventItem {
  background: #F5F7FF;
  padding: 32px 30px;
  cursor: pointer;
  border: 2px solid transparent;
  &.light {
    background: white;
  }
  &.isSelectedItem {
    border-color: #2FA84A;
  }
  &:hover {
    background: white;
    border-color: $primary;
  }
  .EventItem-head {
    display: flex;
    flex-flow: row;
    padding-bottom: 16px;
    .thumbnail {
      width: 32px;
    }
    .title {
      width: calc( 100% - 32px );
      padding-left: 16px;
    }
  }
  .EventItem-price {
    padding-bottom: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    .number {
      width: max-content;
      text-align: center;
      color: $primary;
      font-size: 24px;
      font-weight: 700;
      position: relative;
      .unit {
        position: absolute;
        top: -10px;
        right: 0;
        color: $primary;
        font-size: 10px;
        font-weight: 500;
      }
    }
  }
}
</style>
