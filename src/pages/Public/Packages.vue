<template>
  <q-page-builder v-model:sections="currenSections"
                  v-model:options="pageConfig"
                  :editable="pageBuilderEditable"
                  :loading="pageBuilderLoading" />
</template>

<script>
import { mixinSEO, mixinPageOptions, mixinPrefetchServerData } from 'src/mixin/Mixins.js'

export default {
  name: 'Public.Packages',
  mixins: [mixinPrefetchServerData, mixinPageOptions, mixinSEO]
  // data: () => {
  //   return {
  //     sections: [{ data: { rows: [{ cols: [{ widgets: [{ name: 'TextWidget', options: { fontFamily: null, color: null, fontSize: null, fontWeight: null, fontStyle: null, xs: { fontSize: null, fontWeight: null, fontStyle: null }, sm: { fontSize: null, fontWeight: null, fontStyle: null }, md: { fontSize: null, fontWeight: null, fontStyle: null }, lg: { fontSize: null, fontWeight: null, fontStyle: null }, xl: { fontSize: null, fontWeight: null, fontStyle: null }, style: { paddingBottom: '16px' }, text: '<div style="text-align: center;"><font size="6"><b>پکیج‌ها</b></font></div>' } }, { name: 'TextWidget', options: { fontFamily: null, color: null, fontSize: null, fontWeight: null, fontStyle: null, xs: { fontSize: null, fontWeight: null, fontStyle: null }, sm: { fontSize: null, fontWeight: null, fontStyle: null }, md: { fontSize: null, fontWeight: null, fontStyle: null }, lg: { fontSize: null, fontWeight: null, fontStyle: null }, xl: { fontSize: null, fontWeight: null, fontStyle: null }, style: {}, text: '<div style="text-align: center;"><font color="#a4a4a4" size="5">صفحه اصلی / پکیج‌ها</font></div>' } }], options: { style: {} } }], options: {} }] }, options: { fullHeight: false, backgrounds: { xs: { size: null, color: null, image: null, repeat: null, position: null, attachment: null }, sm: { size: null, color: null, image: null, repeat: null, position: null, attachment: null }, md: { size: null, color: null, image: null, repeat: null, position: null, attachment: null }, lg: { size: null, color: null, image: null, repeat: null, position: null, attachment: null }, xl: { size: null, color: null, image: null, repeat: null, position: null, attachment: null } }, verticalAlign: null, style: { backgroundColor: 'rgba(246,246,246,1)', paddingTop: '100px', paddingBottom: '100px', minHeight: 'auto' } } }, { data: { rows: [{ cols: [{ widgets: [{ name: 'PackageList' }], options: {} }], options: { className: '', height: 'auto', boxed: true, boxedWidth: '1101', gutterXSize: 'md', gutterYSize: 'md', absolute: 'none', paddingOfBoxedInFullWidth: '30px', style: { maxWidth: '1101px', width: '1101px' } } }] }, options: { fullHeight: false, backgrounds: { xs: { size: null, color: null, image: null, repeat: null, position: null, attachment: null }, sm: { size: null, color: null, image: null, repeat: null, position: null, attachment: null }, md: { size: null, color: null, image: null, repeat: null, position: null, attachment: null }, lg: { size: null, color: null, image: null, repeat: null, position: null, attachment: null }, xl: { size: null, color: null, image: null, repeat: null, position: null, attachment: null } }, verticalAlign: null, style: { paddingTop: '100px', paddingBottom: '100px', minHeight: 'auto', backgroundColor: 'rgba(255,255,255,1)' } } }]
  //   }
  // },
  // mounted() {
  //   this.currenSections = this.sections
  // }
}
</script>
