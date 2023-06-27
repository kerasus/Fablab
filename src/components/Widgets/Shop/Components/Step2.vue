<template>
  <div class="Step2">
    <div class="list">
      <div class="list-title">
        پکیج و خدمات انتخاب شده
        <div class="back-action">
          <q-btn flat
                 color="grey"
                 :loading="loading"
                 @click="onPrevStep">
            بازگشت
            >
          </q-btn>
        </div>
      </div>
      <div class="items">
        <q-card v-for="packageItem in packages.list"
                :key="packageItem.id"
                flat
                class="item">
          <div class="thumbnail">
            <q-img :src="packageItem.thumbnail" />
          </div>
          <div class="title">
            {{ packageItem.title }}
          </div>
          <div class="count-action">
            <q-btn icon="delete"
                   flat
                   size="sm"
                   round
                   @click="reducePackageCount(packageItem)" />
            <span class="count">
              {{ packageItem.count }}
            </span>
            <q-btn icon="add"
                   flat
                   size="sm"
                   round
                   @click="addPackageCount(packageItem)" />
          </div>
        </q-card>
        <q-card v-for="servicesItem in services.list"
                :key="servicesItem.id"
                flat
                class="item">
          <div class="thumbnail">
            <q-img :src="servicesItem.thumbnail" />
          </div>
          <div class="title">
            {{ servicesItem.title }}
          </div>
          <div class="count-action">
            <q-btn icon="delete"
                   flat
                   size="sm"
                   round
                   @click="reduceServiceCount(servicesItem)" />
            <span class="count">
              {{ servicesItem.count }}
            </span>
            <q-btn icon="add"
                   flat
                   size="sm"
                   round
                   @click="addServiceCount(servicesItem)" />
          </div>
        </q-card>
      </div>
    </div>
    <div class="action">
      <q-btn color="primary"
             :loading="loading"
             class="q-px-xl"
             @click="onNextStep">
        مرحله بعد
      </q-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Step2',
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    packages () {
      return this.$store.getters['Reservation/packages']
    },
    services () {
      return this.$store.getters['Reservation/services']
    },
    countOfTotalList () {
      return this.packages.list.length + this.services.list.length
    }
  },
  methods: {
    onPrevStep () {
      this.$emit('onPrevStep')
    },
    onNextStep () {
      this.$emit('onNextStep')
    },
    addPackageCount (packageItem) {
      const packages = this.packages
      const target = packages.list.findIndex(item => item.id === packageItem.id)
      if (target === -1) {
        return
      }
      packages.list[target].addCount()
      packages.removeZeroCount()
      this.$store.commit('Reservation/updatePackages', packages)
      if (this.countOfTotalList === 0) {
        this.$emit('onPrevStep')
      }
    },
    reducePackageCount (packageItem) {
      const packages = this.packages
      const target = packages.list.findIndex(item => item.id === packageItem.id)
      if (target === -1) {
        return
      }
      packages.list[target].reduceCount()
      packages.removeZeroCount()
      this.$store.commit('Reservation/updatePackages', packages)
      if (this.countOfTotalList === 0) {
        this.$emit('onPrevStep')
      }
    },
    addServiceCount (serviceItem) {
      const services = this.services
      const target = services.list.findIndex(item => item.id === serviceItem.id)
      if (target === -1) {
        return
      }
      services.list[target].addCount()
      services.removeZeroCount()
      this.$store.commit('Reservation/updateServices', services)
      if (this.countOfTotalList === 0) {
        this.$emit('onPrevStep')
      }
    },
    reduceServiceCount (serviceItem) {
      const services = this.services
      const target = services.list.findIndex(item => item.id === serviceItem.id)
      if (target === -1) {
        return
      }
      services.list[target].reduceCount()
      services.removeZeroCount()
      this.$store.commit('Reservation/updateServices', services)
      if (this.countOfTotalList === 0) {
        this.$emit('onPrevStep')
      }
    }
  }
}
</script>

<style scoped lang="scss">
.Step2 {
  .list {
    margin-bottom: 40px;
    .list-title {
      color: #424242;
      font-size: 24px;
      font-weight: 700;
      line-height: 140%;
      margin-bottom: 32px;
      .back-action {
        position: absolute;
        right: 0;
        top: 0;
      }
    }
  }
  .items {
    .item {
      padding: 26px 24px;
      display: flex;
      flex-flow: row;
      justify-content: flex-start;
      margin-bottom: 20px;
      .thumbnail {
        width: 46px;
      }
      .title {
        width: calc( 100% - 146px );
        color: #393939;
        font-size: 16px;
        font-weight: 700;
        line-height: 140%;
        display: flex;
        flex-flow: row;
        justify-content: flex-start;
        align-items: center;
        padding-left: 16px;
      }
      .count-action {
        width: 100px;
        display: flex;
        flex-flow: row;
        justify-content: space-between;
        align-items: center;
        color: #c5c5c5;
        .count {
          color: #000;
          text-align: center;
          font-size: 16px;
          line-height: 140%;
        }
      }
    }
  }
  .action {
    display: flex;
    flex-flow: row;
    justify-content: flex-end;
  }
}
</style>
