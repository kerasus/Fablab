<template>
  <q-page-builder v-model:sections="currenSections"
                  v-model:options="pageConfig"
                  :editable="pageBuilderEditable"
                  :loading="pageBuilderLoading" />
</template>

<script>
import { mixinPageOptions } from 'src/mixin/Mixins.js'
// import { mixinSEO, mixinPageOptions, mixinPrefetchServerData } from 'src/mixin/Mixins.js'
// import { PageSetting } from 'src/models/PageSetting'
// import { APIGateway } from 'src/api/APIGateway'

export default {
  name: 'CreateScenario',
  mixins: [mixinPageOptions],
  data: () => {
    return {
      sections: [{ data: { rows: [{ cols: [{ widgets: [{ name: 'ScenarioCreate' }], options: { style: { paddingTop: '32px', paddingBottom: '317px' } } }], options: { className: '', height: 'auto', boxed: true, boxedWidth: '724px', gutterXSize: null, gutterYSize: null, absolute: 'none', paddingOfBoxedInFullWidth: '15px', style: { maxWidth: '724pxpx', width: '724pxpx' } } }] } }]
    }
  },
  created () {
    this.currenSections = this.sections
  }
  // mixins: [mixinPrefetchServerData, mixinPageOptions, mixinSEO]
  // mounted () {
  //   this.currenSections = this.sections
  //   const pageSetting = new PageSetting({
  //     value: { sections: this.currenSections, seo: {}, layoutConfig: {} }
  //   })
  //   const routeName = this.$route.name
  //   // const params = JSON.stringify(this.$route.params)
  //   const key = 'route_name:' + routeName /* + '-params:' + params */
  //   const value = pageSetting.getStringifyValue()
  //   APIGateway.pageSetting.create({ key, value })
  // }
}
</script>
