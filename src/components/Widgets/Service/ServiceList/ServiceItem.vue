<template>
  <q-card class="ServiceItem"
          :class="{'light': light}"
          flat>
    <div class="ServiceItem-head">
      <div class="thumbnail">
        <q-img :src="serviceData.thumbnail" />
      </div>
      <div class="title ellipsis-2-lines">
        {{ serviceData.title }}
      </div>
    </div>
    <div class="ServiceItem-price">
      <div class="number">
        <div class="unit">
          تومان
        </div>
        {{ serviceData.unit_price.toLocaleString('fa') }}
      </div>
    </div>
  </q-card>
</template>

<script>
import { Service } from 'src/models/Service.js'

export default {
  name: 'ServiceItem',
  props: {
    serviceData: {
      type: Service,
      default: new Service()
    },
    light: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.ServiceItem {
  background: #F5F7FF;
  padding: 32px 30px;
  cursor: pointer;
  &.light {
    background: white;
  }
  &:hover {
    background: white;
    border: 2px solid $primary;
  }
  .ServiceItem-head {
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
  .ServiceItem-price {
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
