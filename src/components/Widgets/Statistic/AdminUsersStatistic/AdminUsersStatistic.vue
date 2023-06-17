<template>
  <q-card :style="localOptions.style">
    AdminUsersStatistic
  </q-card>
</template>

<script>
import { mixinWidget } from 'src/mixin/Mixins.js'

export default {
  name: 'AdminUsersStatistic',
  mixins: [mixinWidget]
}
</script>

<style scoped lang="scss">

</style>
