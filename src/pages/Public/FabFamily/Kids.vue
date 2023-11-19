<template>
  <q-page-builder v-model:sections="currenSections"
                  v-model:options="pageConfig"
                  :editable="pageBuilderEditable"
                  :loading="pageBuilderLoading" />
</template>

<script>
import { mixinPageOptions, mixinPrefetchServerData, mixinSEO } from 'src/mixin/Mixins.js'

export default {
  name: 'Public.FabFamily.Kids',
  mixins: [mixinPrefetchServerData, mixinPageOptions, mixinSEO]
}
</script>
