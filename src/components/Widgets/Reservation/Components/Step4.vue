<template>
  <div class="Step4">
    <q-card class="form"
            flat>
      {{ message }}
    </q-card>
  </div>
</template>

<script>
import { mixinWidget } from 'src/mixin/Mixins.js'

export default {
  name: 'Step4',
  mixins: [mixinWidget],
  props: {
    message: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped lang="scss">
.Step4 {
  padding: 69px 39px;
}
</style>
