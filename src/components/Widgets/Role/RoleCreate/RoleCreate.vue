<template>
  <div class="RoleList"
       :style="localOptions.style">
    <div class="header">
      <div class="title">
        نقش جدید
      </div>
      <div class="action">
        <q-btn @click="$router.back()">
          بازگشت
        </q-btn>
      </div>
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
          ایجاد نقش
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
  name: 'RoleList',
  components: { EntityCreate },
  mixins: [mixinWidget],
  data: () => ({
    showEntity: false,
    api: APIGateway.role.APIAdresses.base,
    entityIdKeyInResponse: 'id',
    showRouteParamKey: 'id',
    showRouteName: 'Public.Role',
    indexRouteName: 'Public.Role',
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
        name: 'side',
        label: 'دسته',
        placeholder: ' ',
        options: [
          {
            label: 'مافیا',
            value: 'MAFIA'
          },
          {
            label: 'مافیا ۲',
            value: 'LEVEL2'
          },
          {
            label: 'مافیا ۳',
            value: 'LEVEL3'
          },
          {
            label: 'مافیا ۴',
            value: 'LEVEL4'
          },
          {
            label: 'مافیا ۵',
            value: 'LEVEL5'
          },
          {
            label: 'مافیا ۶',
            value: 'LEVEL6'
          },
          {
            label: 'مافیا ۷',
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
      this.$refs.entityRole.createEntity()
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
