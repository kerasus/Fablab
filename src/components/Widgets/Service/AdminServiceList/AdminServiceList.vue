<template>
  <div class="AdminServiceList"
       :style="localOptions.style">
    <div class="title">
      خدمات
    </div>
    <q-card class="list"
            flat>
      <entity-index v-model:value="inputs"
                    title=""
                    :api="api"
                    :table="table"
                    :table-keys="tableKeys"
                    :create-route-name="createRouteName"
                    :show-search-button="false"
                    :show-expand-button="false"
                    :show-reload-button="false"
                    :default-layout="false">
        <template #entity-index-table-cell="{inputData}">
          <q-td>
            <template v-if="inputData.col.name === 'action'">
              <q-btn flat
                     color="primary"
                     :to="{name: 'AdminPanel.Service.Show', params: {id: inputData.props.row.id}}">
                مشاهده جزییات
              </q-btn>
            </template>
            <template v-else>
              {{ inputData.col.value }}
            </template>
          </q-td>
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
  name: 'AdminServiceList',
  components: { EntityIndex },
  mixins: [mixinWidget],
  data: () => {
    return {
      api: APIGateway.service.APIAdresses.base,
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
            name: 'title',
            required: true,
            label: 'نام خدمت',
            align: 'left',
            field: row => row.title
          },
          {
            name: 'unit',
            required: true,
            label: 'واحد',
            align: 'left',
            field: row => row.unit
          },
          {
            name: 'standalone',
            required: true,
            label: 'تایید',
            align: 'left',
            field: row => row.standalone
          },
          {
            name: 'minimum_order',
            required: true,
            label: 'حداقل',
            align: 'left',
            field: row => row.minimum_order
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
  mounted() {
    this.mounted = true
  }
}
</script>

<style scoped lang="scss">
.AdminServiceList {
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
