<template>
  <q-page-builder v-model:sections="currenSections"
                  v-model:options="pageConfig"
                  :editable="pageBuilderEditable"
                  :loading="pageBuilderLoading" />
</template>

<script>
import { mixinPageOptions } from 'src/mixin/Mixins.js'

export default {
  name: 'AdminPanel.Package.Show',
  mixins: [mixinPageOptions],
  data: () => {
    return {
      sections: [{ data: { rows: [{ cols: [{ widgets: [{ name: 'AdminPostCategoryCreate' }], options: { colNumber: 'col', style: { paddingTop: '124px' }, boxShadows: [], backgrounds: { xs: { size: null, color: null, image: null, repeat: null, position: null, attachment: null }, sm: { size: null, color: null, image: null, repeat: null, position: null, attachment: null }, md: { size: null, color: null, image: null, repeat: null, position: null, attachment: null }, lg: { size: null, color: null, image: null, repeat: null, position: null, attachment: null }, xl: { size: null, color: null, image: null, repeat: null, position: null, attachment: null } }, responsiveOrder: { xs: null, sm: null, md: null, lg: null, xl: null }, borderStyle: { borderCssString: '', borderRadiusCssString: '' }, cssHoverEffects: { boxShadows: [], borderStyle: { borderCssString: '', borderRadiusCssString: '' }, transition: { time: 0 }, transform: { rotate: null, scaleX: null, scaleY: null, skewX: null, skewY: null, translateX: null, translateY: null } }, responsiveShow: { xl: true, lg: true, md: true, sm: true, xs: true }, className: '' } }], options: {} }] } }]
    }
  },
  created() {
    this.currenSections = this.sections
  }
}
</script>
