<template>
  <div class="AdminServiceCreate"
       :style="localOptions.style">
    <div class="title">
      ایجاد خدمت جدید
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
        <div class="row">
          <div class="col-md-6 col-12">
            <q-btn color="primary"
                   class="full-width"
                   @click="create">
              ایجاد خدمت
            </q-btn>
          </div>
        </div>
      </div>
    </q-card>
  </div>
</template>

<script>
import { EntityCreate } from 'quasar-crud'
import { Service } from 'src/models/Service.js'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'

export default {
  name: 'AdminServiceCreate',
  components: { EntityCreate },
  mixins: [mixinWidget],
  data: () => {
    return {
      api: APIGateway.service.APIAdresses.base,
      entityIdKeyInResponse: 'id',
      showRouteParamKey: 'id',
      showRouteName: 'AdminPanel.Service.Show',
      indexRouteName: 'AdminPanel.Service.List',
      inputs: [
        {
          type: 'input',
          name: 'title',
          label: 'نام خدمت',
          placeholder: ' ',
          col: 'col-md-6 col-12'
        },
        {
          type: 'select',
          name: 'unit',
          label: 'واحد',
          placeholder: ' ',
          options: (new Service()).unitEnums,
          col: 'col-md-6 col-12'
        },
        {
          type: 'input',
          name: 'minimum_order',
          label: 'حداقل خدمت',
          placeholder: ' ',
          col: 'col-md-6 col-12'
        },
        {
          type: 'select',
          name: 'order_verification_required',
          label: 'نیاز به تایید',
          placeholder: ' ',
          options: [
            {
              label: 'دارد',
              value: true
            },
            {
              label: 'ندارد',
              value: false
            }
          ],
          col: 'col-md-6 col-12'
        },
        {
          type: 'file',
          name: 'thumbnail',
          label: 'تصویر',
          placeholder: 'تصویر مورد نظر را آپلود کنید',
          col: 'col-md-6 col-12'
        },
        {
          type: 'input',
          name: 'unit_price',
          label: 'قیمت به ازای هر واحد',
          placeholder: ' ',
          col: 'col-md-6 col-12'
        },
        {
          type: 'inputEditor',
          name: 'description',
          label: 'توضیحات',
          col: 'col-12'
        },
        {
          type: 'checkbox',
          name: 'standalone',
          label: 'انتشار به عنوان خدمت تکی',
          value: false,
          placeholder: ' ',
          col: 'col-md-6 col-12'
        },
        {
          type: 'checkbox',
          name: 'is_reservation_enabled',
          label: 'قابلیت رزرو شدن',
          value: false,
          placeholder: ' ',
          col: 'col-md-6 col-12'
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
.AdminServiceCreate {
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
