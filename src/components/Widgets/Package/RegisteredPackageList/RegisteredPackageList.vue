<template>
  <div class="RegisteredPackageList"
       :style="localOptions.style">
    <div class="title">
      پکیج‌ها
    </div>
    <q-card class="list"
            flat>
      <entity-index v-if="mounted"
                    v-model:value="inputs"
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
          <template v-if="inputData.col.name === 'thumbnail'">
            <q-img :src="inputData.col.value"
                   width="32px" />
          </template>
          <template v-else-if="inputData.col.name === 'action'">
            <q-btn flat
                   color="primary"
                   :to="{name: 'UserPanel.Package.Show', params: {id: inputData.props.row.id}}">
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
import Assist from 'src/assets/js/Assist.js'
import { Package } from 'src/models/Package.js'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { Registration } from 'src/models/Registration'

export default {
  name: 'RegisteredPackageList',
  components: { EntityIndex },
  mixins: [mixinWidget],
  data: () => {
    return {
      api: APIGateway.registration.APIAdresses.base,
      tableKeys: {
        data: 'results',
        total: 'count',
        currentPage: 'current',
        perPage: 'per_page',
        pageKey: 'page'
      },
      inputs: [
        { type: 'hidden', name: 'product_type', value: 'package' }
      ],
      table: {
        columns: [
          {
            name: 'thumbnail',
            required: true,
            label: '',
            align: 'left',
            field: row => (new Package(row.product_info)).thumbnail
          },
          {
            name: 'title',
            required: true,
            label: 'پکیج',
            align: 'left',
            field: row => row.product_info.title
          },
          {
            name: 'unit_price',
            required: true,
            label: 'قیمت',
            align: 'left',
            field: row => row.product_info.unit_price
          },
          {
            name: 'time_status',
            required: true,
            label: 'وضعیت',
            align: 'left',
            class: 'text-red',
            field: row => (new Registration(row)).time_status_info.label
          },
          {
            name: 'dateTime',
            required: true,
            label: 'تاریخ سررسید',
            align: 'left',
            field: row => Assist.miladiToShamsi(row.termination_datetime, 'jDD jMMM jYYYY')
          },
          {
            name: 'action',
            required: true,
            label: 'جزییات',
            align: 'left'
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
.RegisteredPackageList {
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
