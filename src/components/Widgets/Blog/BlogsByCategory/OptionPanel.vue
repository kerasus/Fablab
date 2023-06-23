<template>
  <option-panel-tabs v-model:options="localOptions">
    <template #main-tab>
      <q-input v-model="localOptions.categoryId"
               label="category id" />
    </template>
  </option-panel-tabs>
</template>

<script>
import { defineComponent } from 'vue'
import { mixinOptionPanel } from 'quasar-ui-q-page-builder'
import OptionPanelTabs from 'quasar-ui-q-page-builder/src/components/OptionPanelComponents/OptionPanelTabs.vue'

export default defineComponent({
  name: 'OptionPanel',
  components: {
    OptionPanelTabs
  },
  mixins: [mixinOptionPanel],
  data() {
    return {
      defaultOptions: {
        categoryId: null
      }
    }
  }
})
</script>
