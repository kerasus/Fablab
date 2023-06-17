<template>
  <q-page-builder v-model:sections="currenSections"
                  v-model:options="pageConfig"
                  :editable="pageBuilderEditable"
                  :loading="pageBuilderLoading" />
</template>

<script>
import { mixinPageOptions } from 'src/mixin/Mixins.js'

export default {
  name: 'Dashboard',
  mixins: [mixinPageOptions],
  data: () => {
    return {
      sections: [{ data: { rows: [{ cols: [{ widgets: [{ name: 'LogoCard' }], options: { style: {}, colNumber: 'col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3' } }, { widgets: [{ name: 'AccountInfo' }], options: { style: {}, colNumber: 'col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8' } }, { widgets: [{ name: 'NotifAction' }, { name: 'NightModeAction', options: { style: { marginTop: '16px' } } }], options: { style: {}, colNumber: 'col-xs-1 col-sm-1 col-md-1 col-lg-1 col-xl-1' } }], options: { className: '', height: 'auto', boxed: false, boxedWidth: 1200, gutterXSize: 'lg', gutterYSize: 'md', absolute: 'none', paddingOfBoxedInFullWidth: '30px', style: { width: null, maxWidth: null } } }] } }]
    }
  },
  created() {
    this.currenSections = this.sections
  }
}
</script>
