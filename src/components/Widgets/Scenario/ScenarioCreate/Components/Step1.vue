<template>
  <div class="ScenarioList">
    <div class="header">
      <div class="title">
        سناریو جدید
      </div>
      <div class="action">
        <q-btn unelevated
               @click="$router.back()">
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
               unelevated
               @click="create">
          ثبت و ادامه
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { EntityCreate } from 'quasar-crud'
import Enums from 'src/assets/js/enums/Enums.js'
import { Scenario } from 'src/models/Scenario.js'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'

export default {
  name: 'ScenarioCreateStep1',
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
        name: 'title',
        label: 'نام',
        placeholder: ' ',
        col: 'col-md-12 col-12'
      },
      {
        type: 'input',
        name: 'slug',
        label: 'slug',
        placeholder: ' ',
        col: 'col-md-12 col-12'
      },
      {
        type: 'select',
        name: 'level',
        label: 'سطح',
        placeholder: ' ',
        options: Enums.Levels.getList(),
        col: 'col-md-6 col-12'
      },
      {
        type: 'input',
        name: 'link',
        label: 'پیوند',
        placeholder: ' ',
        col: 'col-md-6 col-12'
      },
      {
        type: 'file',
        responseKey: 'data.photo',
        name: 'thumbnail',
        label: 'تصویر',
        placeholder: 'تصویر مورد نظر را آپلود کنید',
        col: 'col-md-12 col-12'
      },
      {
        type: 'InputEditor',
        name: 'description',
        label: 'توضیحات',
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
  },
  methods: {
    create () {
      this.$refs.entityScenario.createEntity(false)
        .then((response) => {
          const scenario = new Scenario(response.data)
          this.$emit('onStep1Complete', scenario)
        })
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
