<template>
  <q-card :style="localOptions.style">
    AdminPendingOrderList
  </q-card>
</template>

<script>
import { mixinWidget } from 'src/mixin/Mixins.js'

export default {
  name: 'AdminPendingOrderList',
  mixins: [mixinWidget]
}
</script>

<style scoped lang="scss">

</style>
