<template>
  <div class="ScenarioList"
       :style="localOptions.style">
    <div class="header">
      <div class="title">
        سناریو جدید
      </div>
      <div class="action">
        <q-btn @click="$router.back()">
          بازگشت
        </q-btn>
      </div>
    </div>
    <div v-if="showEntity"
         class="list">
      <entity-create ref="entityScenario"
                     v-model:value="inputs"
                     title="سناریو جدید"
                     :api="api"
                     :default-layout="false"
                     :entity-id-key-in-response="entityIdKeyInResponse"
                     :show-route-param-key="showRouteParamKey"
                     :index-route-name="indexRouteName"
                     :show-route-name="showRouteName" />
      <div class="action">
        <q-btn color="grey"
               @click="create">
          ثبت و ادامه
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
  name: 'ScenarioList',
  components: { EntityCreate },
  mixins: [mixinWidget],
  data: () => ({
    showEntity: false,
    api: APIGateway.scenarios.APIAdresses.base,
    entityIdKeyInResponse: 'id',
    showRouteParamKey: 'id',
    showRouteName: 'Public.Scenario',
    indexRouteName: 'Public.Scenario',
    inputs: [
      {
        type: 'input',
        name: 'slug',
        label: 'نام',
        placeholder: ' ',
        col: 'col-md-12'
      },
      {
        type: 'select',
        name: 'level',
        label: 'سطح',
        placeholder: ' ',
        options: [
          {
            label: 'سطح ۱',
            value: 'LEVEL1'
          },
          {
            label: 'سطح ۲',
            value: 'LEVEL2'
          },
          {
            label: 'سطح ۳',
            value: 'LEVEL3'
          },
          {
            label: 'سطح ۴',
            value: 'LEVEL4'
          },
          {
            label: 'سطح ۵',
            value: 'LEVEL5'
          },
          {
            label: 'سطح ۶',
            value: 'LEVEL6'
          },
          {
            label: 'سطح ۷',
            value: 'LEVEL7'
          }
        ],
        col: 'col-md-6'
      },
      {
        type: 'input',
        name: 'link',
        label: 'پیوند',
        placeholder: ' ',
        col: 'col-md-6'
      },
      {
        type: 'file',
        responseKey: 'data.photo',
        name: 'thumbnail',
        label: 'تصویر',
        placeholder: 'تصویر مورد نظر را آپلود کنید',
        col: 'col-md-12'
      },
      {
        type: 'InputEditor',
        name: 'description',
        label: 'توضیحات',
        placeholder: ' ',
        col: 'col-md-12'
      }
    ],
    defaultOptions: {
      style: {}
    }
  }),
  mounted () {
    this.showEntity = true
  },
  methods: {
    create () {
      this.$refs.entityScenario.createEntity()
    }
  }
}
</script>

<style lang="scss" scoped>
.ScenarioList {
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
    margin-top: 25px;
    & > div {
      padding: 30px;
      background-color: #FFFFFF;
      border: none;
      box-shadow: none;
      border-radius: 16px;
    }
  }
}
</style>
