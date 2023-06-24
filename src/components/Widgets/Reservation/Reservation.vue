<template>
  <div class="Reservation"
       :style="localOptions.style">
    <q-tab-panels v-model="step"
                  animated>
      <q-tab-panel name="step1">
        <step1 />
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
import { mixinWidget } from 'src/mixin/Mixins.js'
import Step1 from 'src/components/Widgets/Reservation/Components/Step1.vue'

export default {
  name: 'Reservation',
  components: {
    Step1
  },
  mixins: [mixinWidget],
  data: () => {
    return {
      mounted: false,
      step: 'step1'
    }
  },
  mounted() {
    this.mounted = true
  },
  methods: {

  }
}
</script>

<style scoped lang="scss">
.Reservation {
  .q-tab-panels {
    background: transparent;
  }
}
</style>
