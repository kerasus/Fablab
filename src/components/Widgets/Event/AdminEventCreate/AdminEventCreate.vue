<template>
  <div class="AdminEventCreate"
       :style="localOptions.style">
    <div class="title">
      ایجاد رویداد جدید
    </div>
    <q-card class="form"
            flat>
      <entity-create ref="entityCreate"
                     v-model:value="inputs"
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
              ایجاد رویداد
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
  name: 'AdminEventCreate',
  components: { EntityCreate },
  mixins: [mixinWidget],
  data: () => {
    return {
      api: APIGateway.event.APIAdresses.base,
      entityIdKeyInResponse: 'id',
      showRouteParamKey: 'id',
      showRouteName: 'AdminPanel.Event.Show',
      indexRouteName: 'AdminPanel.Event.List',
      inputs: [
        {
          type: 'file',
          name: 'thumbnail',
          responseKey: 'thumbnail',
          label: 'تصویر',
          placeholder: ' ',
          col: 'col-md-3 col-12'
        },
        {
          type: 'input',
          name: 'title',
          responseKey: 'title',
          label: 'عنوان',
          placeholder: ' ',
          col: 'col-md-12 col-12'
        },
        {
          type: 'inputEditor',
          name: 'description',
          responseKey: 'description',
          label: 'توضیحات',
          col: 'col-md-12 col-12'
        },
        {
          type: 'inputEditor',
          name: 'address',
          responseKey: 'address',
          label: 'آدرس',
          col: 'col-md-12 col-12'
        },
        {
          type: 'dateTime',
          name: 'holding_time',
          responseKey: 'holding_time',
          label: 'زمان برگزاری',
          placeholder: ' ',
          col: 'col-md-4 col-12'
        },
        {
          type: 'input',
          name: 'capacity',
          responseKey: 'capacity',
          label: 'ظرفیت',
          placeholder: ' ',
          col: 'col-md-4 col-12'
        },
        {
          type: 'input',
          name: 'price',
          responseKey: 'price',
          label: 'قیمت',
          placeholder: ' ',
          col: 'col-md-4 col-12'
        }
      ]
    }
  },
  methods: {
    create() {
      this.$refs.entityCreate.createEntity()
    }
  }
}
</script>

<style scoped lang="scss">
.AdminEventCreate {
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
