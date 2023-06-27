<template>
  <div class="AdminProductList"
       :style="localOptions.style">
    <div class="title">
      محصولات
    </div>
    <q-card class="list"
            flat>
      <entity-index v-if="mounted"
                    v-model:value="inputs"
                    :api="api"
                    :table="table"
                    :table-keys="tableKeys"
                    :create-route-name="createRouteName"
                    :show-search-button="false"
                    :show-expand-button="false"
                    :show-reload-button="false"
                    :default-layout="false">
        <template #entity-index-table-cell="{inputData}">
          <template v-if="inputData.col.name === 'thumbnail'">
            <q-img :src="inputData.col.value"
                   width="32px" />
          </template>
          <template v-else-if="inputData.col.name === 'action'">
            <q-btn flat
                   color="primary"
                   :to="{name: 'AdminPanel.Product.Show', params: {id: inputData.props.row.id, shopServiceName: $route.params.shopServiceName}}">
              مشاهده جزییات
            </q-btn>
          </template>
          <template v-else>
            {{ inputData.col.value }}
          </template>
        </template>
      </entity-index>
    </q-card>
  </div>
</template>

<script>
import { EntityIndex } from 'quasar-crud'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'

export default {
  name: 'AdminProductList',
  components: { EntityIndex },
  mixins: [mixinWidget],
  data: () => {
    return {
      api: '',
      tableKeys: {
        data: 'results',
        total: 'count',
        currentPage: 'current',
        perPage: 'per_page',
        pageKey: 'page'
      },
      inputs: [],
      table: {
        columns: [
          {
            name: 'thumbnail',
            required: true,
            label: 'تصویر',
            align: 'left',
            field: row => row.thumbnail
          },
          {
            name: 'title',
            required: true,
            label: 'عنوان',
            align: 'left',
            field: row => row.title
          },
          {
            name: 'unit_price',
            required: true,
            label: 'قیمت',
            align: 'left',
            field: row => row.unit_price
          },
          {
            name: 'action',
            required: true,
            label: 'جزییات',
            align: 'left',
            field: row => ''
          }
        ]
      },
      mounted: false,
      createRouteName: ''
    }
  },
  created() {
    this.api = APIGateway.product.APIAdresses.base(this.$route.params.shopServiceName)
  },
  mounted() {
    this.mounted = true
  }
}
</script>

<style scoped lang="scss">
.AdminProductList {
  .title {
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 140%;
    color: #424242;
    margin-bottom: 27px;
  }
  :deep(.list) {
    .quasar-crud-index-table {
      padding: 0;
      .q-table__container {
        background-color: transparent;
        box-shadow: none;
        border: none;
        .q-table__top {
          display: none;
        }
      }
    }
  }
}
</style>
