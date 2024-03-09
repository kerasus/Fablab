<template>
  <div class="PaymentList"
       :style="localOptions.style">
    <div class="title">
      تراکنش‌های مالی
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
          <template v-if="inputData.col.name === 'action'">
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
import Assist from 'assets/js/Assist.js'
import { EntityIndex } from 'quasar-crud'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { Payment } from 'src/models/Payment'

export default {
  name: 'PaymentList',
  components: { EntityIndex },
  mixins: [mixinWidget],
  data: () => {
    return {
      api: APIGateway.payment.APIAdresses.base,
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
            name: 'id',
            required: true,
            label: '#',
            align: 'left',
            field: row => row.id
          },
          {
            name: 'amount',
            required: true,
            label: 'مبلغ',
            align: 'left',
            field: row => row.amount.toLocaleString('fa')
          },
          {
            name: 'type',
            required: true,
            label: 'وضعیت',
            align: 'left',
            field: row => (new Payment(row)).type_info.label
          },
          {
            name: 'creation_time',
            required: true,
            label: 'زمان پرداخت',
            align: 'left',
            field: row => Assist.miladiToShamsi(row.creation_time)
          },
          {
            name: 'owner_info.nickname',
            required: true,
            label: 'پرداخت کننده',
            align: 'left',
            field: row => row.creator_info?.nickname ? row.creator_info.nickname : ((row.creator_info?.firstname ? row.creator_info.firstname : '') + ' ' + (row.creator_info?.lastname ? row.creator_info.lastname : ''))
          }
        ]
      },
      mounted: false,
      createRouteName: ''
    }
  },
  mounted () {
    this.mounted = true
  }
}
</script>

<style scoped lang="scss">
.PaymentList {
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
