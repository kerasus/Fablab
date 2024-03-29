<template>
  <div class="Breadcrumbs"
       :style="localOptions.style">
    <q-breadcrumbs v-if="mounted && breadcrumbs.visible">
      <!--      <template v-slot:separator>-->
      <!--        <q-icon name="chevron_right"-->
      <!--                color="gray" />-->
      <!--      </template>-->
      <q-breadcrumbs-el v-for="(el, elIndex) in breadcrumbs.path"
                        :key="elIndex"
                        :to="el.to"
                        :label="el.label" />
    </q-breadcrumbs>
  </div>
</template>

<script>
import { mixinWidget } from 'src/mixin/Mixins.js'

export default {
  name: 'Breadcrumbs',
  mixins: [mixinWidget],
  data () {
    return {
      mounted: false
    }
  },
  computed: {
    breadcrumbs () {
      return this.$store.getters['AppLayout/breadcrumbs']
    }
  },
  mounted() {
    this.mounted = true
  }
}
</script>

<style lang="scss" scoped>
.Breadcrumbs {

}
</style>
