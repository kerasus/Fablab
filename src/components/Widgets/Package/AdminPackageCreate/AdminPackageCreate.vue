<template>
  <div class="AdminPackageCreate"
       :style="localOptions.style">
    <div class="title">
      ایجاد پکیج جدید
    </div>
    <q-card class="form"
            flat>
      <entity-create ref="entityRole"
                     v-model:value="inputs"
                     title="نقش جدید"
                     :api="api"
                     :default-layout="false"
                     :entity-id-key-in-response="entityIdKeyInResponse"
                     :show-route-param-key="showRouteParamKey"
                     :index-route-name="indexRouteName"
                     :show-route-name="showRouteName" />
      <div class="action">
        <div class="row q-mt-lg justify-end">
          <div class="col-md-4 col-12">
            <q-btn color="primary"
                   class="full-width"
                   @click="create">
              ایجاد پکیج
            </q-btn>
          </div>
        </div>
      </div>
    </q-card>
  </div>
</template>

<script>
import { EntityCreate } from 'quasar-crud'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'
// import { shallowRef } from 'vue'
// import SelectServicesForAttachToPackage from 'src/components/FormBuilderCustomControls/SelectServicesForAttachToPackage.vue'
// const SelectServicesForAttachToPackageComp = shallowRef(SelectServicesForAttachToPackage)

export default {
  name: 'AdminPackageCreate',
  components: { EntityCreate },
  mixins: [mixinWidget],
  data: () => {
    return {
      api: APIGateway.package.APIAdresses.base,
      entityIdKeyInResponse: 'id',
      showRouteParamKey: 'id',
      showRouteName: 'AdminPanel.Package.Show',
      indexRouteName: 'AdminPanel.Package.List',
      inputs: [
        {
          type: 'input',
          name: 'title',
          label: 'نام پکیج',
          placeholder: ' ',
          col: 'col-md-4 col-12'
        },
        {
          type: 'input',
          name: 'capacity',
          label: 'ظرفیت',
          placeholder: ' ',
          col: 'col-md-4 col-12'
        },
        {
          type: 'input',
          name: 'unit_price',
          label: 'قیمت',
          placeholder: ' ',
          col: 'col-md-4 col-12'
        },
        {
          type: 'hidden',
          name: 'description',
          value: '...',
          col: 'col-12'
        },
        {
          type: 'hidden',
          name: 'services_relation',
          value: [],
          col: 'col-12'
        }
      ]
    }
  },
  methods: {
    create () {
      this.$refs.entityRole.createEntity()
    }
  }
}
</script>

<style scoped lang="scss">
.AdminPackageCreate {
  .title {
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 140%;
    color: #424242;
    margin-bottom: 27px;
  }
  :deep(.form) {
    padding: 24px;
  }
}
</style>
