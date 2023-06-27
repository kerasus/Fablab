<template>
  <div class="AdminProductShow"
       :style="localOptions.style">
    <div class="title">
      <div class="static-title">
        ویرایش
      </div>
      <div class="dynamic-title">
        <template v-if="entityLoading">
          <q-skeleton type="text"
                      class="q-ml-lg"
                      width="100px" />
        </template>
        <template v-else>
          {{ packageTitle }}
        </template>
      </div>
      <div class="back-action">
        <q-btn flat
               :to="{name: 'AdminPanel.Product.List', params: {shopServiceName: $route.params.shopServiceName}}"
               color="grey">
          بازگشت
          >
        </q-btn>
      </div>
    </div>
    <q-card class="form"
            flat>
      <entity-edit v-if="mounted"
                   ref="entityEdit"
                   :key="entityEditKey"
                   v-model:value="inputs"
                   :api="api"
                   :entity-id-key="entityIdKey"
                   :entity-param-key="entityParamKey"
                   :show-route-name="showRouteName"
                   :show-close-button="false"
                   :show-edit-button="false"
                   :show-expand-button="false"
                   :show-save-button="false"
                   :show-reload-button="false"
                   :default-layout="false"
                   :redirect-after-edit="false"
                   :after-load-input-data="afterLoadInputData" />
      <div class="action">
        <div class="row q-mt-lg justify-end">
          <div class="col-md-4 col-12">
            <q-btn color="primary"
                   class="full-width"
                   :loading="entityLoading"
                   @click="edit">
              ثبت تغییرات
            </q-btn>
          </div>
        </div>
      </div>
    </q-card>
  </div>
</template>

<script>
import { EntityEdit } from 'quasar-crud'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'

export default {
  name: 'AdminProductShow',
  components: {
    EntityEdit
  },
  mixins: [mixinWidget],
  data: () => {
    return {
      mounted: false,
      entityEditKey: Date.now(),
      entityLoading: true,
      packageTitle: '',
      services: [],
      api: '',
      entityIdKey: 'id',
      entityParamKey: 'id',
      showRouteName: 'AdminPanel.Product.Show',
      indexRouteName: 'AdminPanel.Product.List',
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
          options: [],
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
        },
        {
          type: 'hidden',
          name: 'id',
          responseKey: 'id'
        }
      ]
    }
  },
  created() {
    this.api = APIGateway.product.APIAdresses.base(this.$route.params.shopServiceName) + '/' + this.$route.params.id
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
      this.$refs.entityEdit.setInputAttributeByName(name, 'options', options)
      this.entityEditKey = Date.now()
    },
    onUpdateServices () {
      this.$refs.entityEdit.getData()
    },
    afterLoadInputData (response) {
      this.packageTitle = response.title
      this.services = response.services_relation_info
      this.entityLoading = false
    },
    edit() {
      this.entityLoading = true
      this.$refs.entityEdit.editEntity()
        .then(() => {
          this.$refs.entityEdit.getData()
          this.entityLoading = false
        })
        .catch(() => {
          this.$refs.entityEdit.getData()
          this.entityLoading = false
        })
    }
  }
}
</script>

<style scoped lang="scss">
.AdminProductShow {
  .title {
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 140%;
    color: #424242;
    margin-bottom: 27px;
    display: flex;
    flex-flow: row;
    position: relative;
    .static-title {

    }
    .dynamic-title {

    }
    .back-action {
      position: absolute;
      right: 0;
      top: 0;
    }
  }
  :deep(.form) {
    padding: 24px;
  }
}
</style>
