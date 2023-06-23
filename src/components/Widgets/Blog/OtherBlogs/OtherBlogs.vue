<template>
  <div class="OtherBlogs"
       :style="localOptions.style">
    <div class="title">
      نوشته ها
      <div class="back-action">
        <q-btn :to="{name: 'AdminPanel.Blog.Create'}"
               color="primary">
          نوشتن مقاله جدید
        </q-btn>
      </div>
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
          <q-td>
            <template v-if="inputData.col.name === 'action'">
              <q-btn flat
                     color="primary"
                     :to="{name: 'AdminPanel.Blog.Show', params: {id: inputData.props.row.id}}">
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
import Assist from 'src/assets/js/Assist.js'

export default {
  name: 'OtherBlogs',
  components: { EntityIndex },
  mixins: [mixinWidget],
  data: () => {
    return {
      api: APIGateway.media.APIAdresses.base,
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
            label: 'عنوان مقاله',
            align: 'left',
            field: row => row.title
          },
          {
            name: 'unit_price',
            required: true,
            label: 'دسته',
            align: 'left',
            field: row => row.category_info.title
          },
          {
            name: 'status',
            required: true,
            label: 'تاریخ ویرایش',
            align: 'left',
            field: row => Assist.miladiToShamsi(row.last_modification_time)
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
.OtherBlogs {
  .title {
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 140%;
    color: #424242;
    margin-bottom: 27px;
    position: relative;
    .back-action {
      position: absolute;
      right: 0;
      top: 0;
    }
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
