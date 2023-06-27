<template>
  <div class="AdminProductCreate"
       :style="localOptions.style">
    <div class="title">
      ایجاد محصول جدید
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
              ایجاد محصول
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
  name: 'AdminProductCreate',
  components: { EntityCreate },
  mixins: [mixinWidget],
  data: () => {
    return {
      api: '',
      entityIdKeyInResponse: 'id',
      showRouteParamKey: 'id',
      showRouteName: 'AdminPanel.Product.Show',
      indexRouteName: 'AdminPanel.Product.List',
      inputs: [
        {
          type: 'input',
          name: 'title',
          responseKey: 'title',
          label: 'نام محصول',
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
          type: 'select',
          name: 'category',
          responseKey: 'category',
          label: 'دسته',
          placeholder: ' ',
          col: 'col-md-6 col-12'
        },
        {
          type: 'input',
          name: 'unit_price',
          responseKey: 'unit_price',
          label: 'قیمت',
          placeholder: ' ',
          col: 'col-md-6 col-12'
        }
      ]
    }
  },
  created() {
    this.api = APIGateway.product.APIAdresses.base(this.$route.params.shopServiceName)
  },
  mounted() {
    this.loadOptions()
    this.$nextTick(() => {
      this.mounted = true
    })
  },
  methods: {
    loadOptions () {
      this.loadCategories()
    },
    loadCategories () {
      APIGateway.productCategory.index({ shopServiceName: this.$route.params.shopServiceName })
        .then(({ list }) => {
          const productCategoryList = list
          this.setInputOptions('category', productCategoryList.list.map(item => {
            return {
              value: item.id,
              label: item.title
            }
          }))
        })
    },
    setInputOptions (name, options) {
      this.$refs.entityCreate.setInputAttributeByName(name, 'options', options)
    },
    create() {
      this.$refs.entityCreate.createEntity()
    }
  }
}
</script>

<style scoped lang="scss">
.AdminProductCreate {
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
