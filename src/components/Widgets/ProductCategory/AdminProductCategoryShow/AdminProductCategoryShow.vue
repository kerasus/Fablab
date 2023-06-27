<template>
  <div class="AdminProductCategoryShow"
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
  name: 'AdminProductCategoryShow',
  components: {
    EntityEdit
  },
  mixins: [mixinWidget],
  data: () => {
    return {
      mounted: false,
      entityLoading: true,
      packageTitle: '',
      services: [],
      api: '',
      entityIdKey: 'id',
      entityParamKey: 'id',
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
    this.api = APIGateway.productCategory.APIAdresses.base(this.$route.params.shopServiceName) + '/' + this.$route.params.id
  },
  mounted() {
    this.mounted = true
  },
  methods: {
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
.AdminProductCategoryShow {
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
