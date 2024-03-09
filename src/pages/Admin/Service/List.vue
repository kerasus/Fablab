<template>
  <q-page-builder v-model:sections="currenSections"
                  v-model:options="pageConfig"
                  :editable="pageBuilderEditable"
                  :loading="pageBuilderLoading" />
</template>

<script>
import { mixinPageOptions } from 'src/mixin/Mixins.js'

export default {
  name: 'AdminPanel.Service.List',
  mixins: [mixinPageOptions],
  data: () => {
    return {
      sections: [{ data: { rows: [{ cols: [{ widgets: [{ name: 'AdminServiceList', options: { style: { marginTop: '124px' } } }, { name: 'AdminServiceCreate', options: { style: { marginTop: '32px' } } }], options: {} }], options: {} }] } }]
    }
  },
  created () {
    this.currenSections = this.sections
  }
}
</script>
