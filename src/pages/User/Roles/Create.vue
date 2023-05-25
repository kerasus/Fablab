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
      sections: [{ data: { rows: [{ cols: [{ widgets: [{ name: 'RoleCreate' }], options: { style: { paddingTop: '32px', paddingBottom: '317px' } } }], options: { className: '', height: 'auto', boxed: true, boxedWidth: 1200, gutterXSize: 'md', gutterYSize: 'md', absolute: 'none', paddingOfBoxedInFullWidth: '30px', style: { maxWidth: '1200px', width: '1200px' } } }] } }]
    }
  },
  created() {
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
