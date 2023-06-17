<template>
  <q-responsive :ratio="1"
                :style="localOptions.style">
    <q-btn>
      <q-icon name="notifications" />
    </q-btn>
  </q-responsive>
</template>

<script>
import { mixinWidget } from 'src/mixin/Mixins'

export default {
  name: 'NotifAction',
  mixins: [mixinWidget]
}
</script>

<style scoped lang="scss">
@import "src/css/customVariables.scss";
.q-btn {
  height: 100%;
  background: white;
  color: $primary;
}
</style>
