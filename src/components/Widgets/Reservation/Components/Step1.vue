<template>
  <div class="Step1">
    <div class="list">
      <div class="list-title">
        پکیج‌ها
      </div>
      <package-list :options="{cols: 'col-md-4 col-sm-6 col-12', light:true}" />
    </div>
    <div class="list">
      <div class="list-title">
        خدمات
      </div>
      <service-list :options="{cols: 'col-md-4 col-sm-6 col-12', light:true}" />
    </div>
    <div class="action">
      <q-btn color="primary"
             class="q-px-xl"
             @click="onNextStep">
        مرحله بعد
      </q-btn>
    </div>
  </div>
</template>

<script>
import PackageList from 'src/components/Widgets/Package/PackageList/PackageList.vue'
import ServiceList from 'src/components/Widgets/Service/ServiceList/ServiceList.vue'

export default {
  name: 'Step1',
  components: {
    PackageList,
    ServiceList
  },
  methods: {
    onNextStep () {
      this.$emit('onNextStep')
    }
  }
}
</script>

<style scoped lang="scss">
.Step1 {
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
  .action {
    display: flex;
    flex-flow: row;
    justify-content: flex-end;
  }
}
</style>
