<template>
  <div class="RoleList"
       :style="localOptions.style">
    <div class="header">
      <div class="title">
        ساخت بازی
      </div>
      <div class="action" />
    </div>
    <div v-if="showEntity"
         class="list">
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
        <q-btn color="grey"
               @click="create">
          ایجاد بازی
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { EntityCreate } from 'quasar-crud'
import { mixinWidget } from 'src/mixin/Mixins'
import { APIGateway } from 'src/api/APIGateway'

export default {
  name: 'EventCreate',
  components: { EntityCreate },
  mixins: [mixinWidget],
  data: () => ({
    showEntity: false,
    api: APIGateway.event.APIAdresses.base,
    entityIdKeyInResponse: 'id',
    showRouteParamKey: 'id',
    showRouteName: 'Public.Role',
    indexRouteName: 'Public.Role',
    inputs: [
      {
        type: 'input',
        name: 'slug',
        label: 'نام بازی',
        placeholder: ' ',
        col: 'col-md-12 col-12'
      },
      {
        type: 'select',
        name: 'scenario',
        label: 'سناریو',
        placeholder: ' ',
        options: [],
        col: 'col-md-6 col-12'
      },
      {
        type: 'dateTime',
        name: 'holding_time',
        label: 'زمان برگزاری',
        placeholder: ' ',
        options: [],
        col: 'col-md-6 col-12'
      },
      {
        type: 'input',
        name: 'address',
        label: 'نشانی کافه',
        placeholder: ' ',
        col: 'col-md-12 col-12'
      },
      {
        type: 'input',
        name: 'minimum_order_amount',
        label: 'حداقل سفارش (اختیاری)',
        placeholder: 'به تومان',
        col: 'col-md-6 col-12'
      },
      {
        type: 'input',
        name: 'entrance_amount',
        label: 'ورودی (اختیاری)',
        placeholder: 'به تومان',
        col: 'col-md-6 col-12'
      },
      {
        type: 'file',
        responseKey: 'data.photo',
        name: 'thumbnail',
        label: 'بنر بازی',
        placeholder: 'تصویر مورد نظر را آپلود کنید',
        col: 'col-md-12 col-12'
      },
      {
        type: 'InputEditor',
        name: 'description',
        label: 'توضیحات بازی',
        placeholder: ' ',
        col: 'col-md-12 col-12'
      }
    ],
    defaultOptions: {
      style: {}
    }
  }),
  mounted () {
    this.showEntity = true
    this.loadScenarios()
  },
  methods: {
    create () {
      this.$refs.entityRole.createEntity()
    },
    loadScenarios () {
      APIGateway.scenarios.index()
        .then(({ list }) => {
          const scenariosList = list
          this.$refs.entityRole.setInputAttributeByName('scenario', 'options', scenariosList.list.map(item => {
            return {
              label: item.slug,
              value: item.id
            }
          }))
          console.log(list)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.RoleList {
  .header {
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    .title {
      font-weight: 700;
      font-size: 32px;
      line-height: 140%;
    }
    .action {
    }
  }
  :deep(.list) {
    margin-top: 32px;
    & > div {
      padding: 30px;
      background-color: #FFFFFF;
      border: none;
      box-shadow: none;
      border-radius: 16px;
    }
    .action {
      .q-btn {
        padding-right: 66px;
        padding-left: 66px;
      }
    }
  }
}
</style>
