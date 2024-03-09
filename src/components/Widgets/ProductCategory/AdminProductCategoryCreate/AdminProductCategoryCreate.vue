<template>
  <div class="AdminProductCategoryCreate"
       :style="localOptions.style">
    <div class="title">
      ایجاد دسته محصول جدید
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
              ایجاد دسته محصول
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

export default {
  name: 'AdminProductCategoryCreate',
  components: { EntityCreate },
  mixins: [mixinWidget],
  data: () => {
    return {
      api: '',
      entityIdKeyInResponse: 'id',
      showRouteParamKey: 'id',
      showRouteName: 'AdminPanel.ProductCategory.Show',
      indexRouteName: 'AdminPanel.ProductCategory.List',
      inputs: [
        {
          type: 'input',
          name: 'title',
          responseKey: 'title',
          label: 'نام دسته محصول',
          placeholder: ' ',
          col: 'col-md-12 col-12'
        }
      ]
    }
  },
  created () {
    this.api = APIGateway.productCategory.APIAdresses.base(this.$route.params.shopServiceName)
  },
  mounted () {
    this.mounted = true
  },
  methods: {
    create () {
      this.$refs.entityCreate.createEntity()
    }
  }
}
</script>

<style scoped lang="scss">
.AdminProductCategoryCreate {
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
