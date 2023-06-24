<template>
  <q-page-builder v-model:sections="currenSections"
                  v-model:options="pageConfig"
                  :editable="pageBuilderEditable"
                  :loading="pageBuilderLoading" />
</template>

<script>
import { mixinPageOptions } from 'src/mixin/Mixins.js'

export default {
  name: 'Public.FabFamily',
  mixins: [mixinPageOptions],
  data: () => {
    return {
      sections: [{ data: { rows: [{ cols: [{ widgets: [{ name: 'BlogShow' }, { name: 'TextWidget', options: { fontFamily: null, color: null, fontSize: null, fontWeight: null, fontStyle: null, xs: { fontSize: null, fontWeight: null, fontStyle: null }, sm: { fontSize: null, fontWeight: null, fontStyle: null }, md: { fontSize: null, fontWeight: null, fontStyle: null }, lg: { fontSize: null, fontWeight: null, fontStyle: null }, xl: { fontSize: null, fontWeight: null, fontStyle: null }, style: {}, text: '<div style="text-align: center;"><font size="4" color="#a4a4a4">بلاگ فب‌لب</font></div>' } }, { name: 'TextWidget', options: { fontFamily: null, color: null, fontSize: null, fontWeight: null, fontStyle: null, xs: { fontSize: null, fontWeight: null, fontStyle: null }, sm: { fontSize: null, fontWeight: null, fontStyle: null }, md: { fontSize: null, fontWeight: null, fontStyle: null }, lg: { fontSize: null, fontWeight: null, fontStyle: null }, xl: { fontSize: null, fontWeight: null, fontStyle: null }, style: { marginBottom: '64px' }, text: '<div style="text-align: center;"><font color="#393939" size="5"><b>دیگر مقالات فب‌لب</b></font><br></div>' } }, { name: 'LastBlogs' }], options: {} }], options: { className: '', height: 'auto', boxed: true, boxedWidth: 1200, gutterXSize: 'md', gutterYSize: 'md', absolute: 'none', paddingOfBoxedInFullWidth: '30px', style: { maxWidth: '1200px', width: '1200px' } } }] }, options: { fullHeight: false, backgrounds: { xs: { size: null, color: null, image: null, repeat: null, position: null, attachment: null }, sm: { size: null, color: null, image: null, repeat: null, position: null, attachment: null }, md: { size: null, color: null, image: null, repeat: null, position: null, attachment: null }, lg: { size: null, color: null, image: null, repeat: null, position: null, attachment: null }, xl: { size: null, color: null, image: null, repeat: null, position: null, attachment: null } }, verticalAlign: null, style: { paddingBottom: '100px', minHeight: 'auto', paddingTop: '100px' } } }]
    }
  },
  created() {
    this.currenSections = this.sections
  }
}
</script>
