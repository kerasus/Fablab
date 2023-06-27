<template>
  <q-page-builder v-model:sections="currenSections"
                  v-model:options="pageConfig"
                  :editable="pageBuilderEditable"
                  :loading="pageBuilderLoading" />
</template>

<script>
import { mixinPageOptions } from 'src/mixin/Mixins.js'

export default {
  name: 'AdminPanel.Package.List',
  mixins: [mixinPageOptions],
  data: () => {
    return {
      sections: [{ data: { rows: [{ cols: [{ widgets: [{ name: 'AdminEventList', options: { style: { marginBottom: '32px' } } }, { name: 'AdminEventCreate', options: { style: {} } }], options: { style: { paddingTop: '124px' } } }], options: {} }] } }]
    }
  },
  created() {
    this.currenSections = this.sections
  }
}
</script>
