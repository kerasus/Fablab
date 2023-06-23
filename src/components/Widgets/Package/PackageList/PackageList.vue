<template>
  <div class="PackageList"
       :style="localOptions.style">
    <div class="row q-col-gutter-md">
      <div v-for="packageItem in packages.list"
           :key="packageItem.id"
           class="col-md-3 col-sm-6 col-12">
        <package-item :package-data="packageItem" />
      </div>
    </div>
  </div>
</template>

<script>
import { APIGateway } from 'src/api/APIGateway.js'
import { PackageList } from 'src/models/Package.js'
import { mixinPrefetchServerData, mixinWidget } from 'src/mixin/Mixins.js'
import PackageItem from 'src/components/Widgets/Package/PackageList/PackageItem.vue'

export default {
  name: 'PackageList',
  components: { PackageItem },
  mixins: [mixinWidget, mixinPrefetchServerData],
  data: () => {
    return {
      packages: new PackageList()
    }
  },
  methods: {
    prefetchServerDataPromise () {
      return this.getApiRequest()
    },
    prefetchServerDataPromiseThen ({ list }) {
      this.packages = new PackageList(list)
      this.packages.loading = false
    },
    prefetchServerDataPromiseCatch () {
      this.packages.loading = false
    },

    getApiRequest() {
      this.packages.loading = true
      return APIGateway.package.index()
    }
  }
}
</script>

<style scoped lang="scss">
.PackageList {

}
</style>
