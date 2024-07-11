<template>
  <option-panel-tabs v-model:options="localOptions">
    <template #main-tab>
      <q-input v-model="localOptions.homeRouteNameTitle"
               label="home Route name title" />
      <q-input v-model="localOptions.homeRouteName"
               label="home Route name" />
      <q-input v-model="localOptions.postCategoryShowRouteName"
               label="post category show Route name" />
      <q-input v-model="localOptions.postShowRouteName"
               label="post show Route name" />
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
  data () {
    return {
      defaultOptions: {
        postShowRouteName: 'Public.Post.Show',
        homeRouteNameTitle: 'فب لب',
        homeRouteName: 'Public.Home',
        postCategoryShowRouteName: 'Public.PostCategory.Show'
      }
    }
  }
})
</script>
