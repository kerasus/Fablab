<template>
  <q-card class="PackageItem"
          flat>
    <div class="PackageItem-head">
      <div class="thumbnail">
        <q-img :src="packageData.thumbnail" />
      </div>
      <div class="title ellipsis-2-lines">
        {{ packageData.title }}
      </div>
    </div>
    <div class="PackageItem-price">
      <div class="number">
        <div class="unit">
          تومان
        </div>
        {{ packageData.unit_price.toLocaleString('fa') }}
      </div>
    </div>
    <div class="PackageItem-services">
      <div v-for="service in packageData.services_relation_info"
           :key="service.id"
           class="PackageItem-services-item">
        {{ service.service_info.title }}
      </div>
    </div>
  </q-card>
</template>

<script>
import { Package } from 'src/models/Package.js'

export default {
  name: 'PackageItem',
  props: {
    packageData: {
      type: Package,
      default: new Package()
    }
  }
}
</script>

<style lang="scss" scoped>
.PackageItem {
  background: #F5F7FF;
  padding: 32px 30px;
  cursor: pointer;
  &:hover {
    background: white;
    border: 2px solid $primary;
  }
  .PackageItem-head {
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
  .PackageItem-price {
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
  .PackageItem-services {
    .PackageItem-services-item {
      color: #2E2E2E;
      font-size: 14px;
      margin-bottom: 8px;
      position: relative;
      padding-left: 12px;
      &:before {
        position: absolute;
        left: 0;
        top: 6px;
        content: ' ';
        background: #2E2E2E;
        width: 5px;
        height: 5px;
        border-radius: 100%;
      }
    }
  }
}

</style>
