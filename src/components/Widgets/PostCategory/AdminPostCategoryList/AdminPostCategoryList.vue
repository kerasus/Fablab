<template>
  <div class="AdminPostCategoryList"
       :style="localOptions.style">
    <div class="title">
      لیست بخش ها
      <div class="back-action">
        <q-btn label="بخش جدید"
               color="primary"
               :to="{name: 'AdminPanel.PostCategory.Create'}" />
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
                    :default-layout="false"
                    :show-search-button="false"
                    :show-expand-button="false"
                    :show-reload-button="false">
        <template #entity-index-table-cell="{inputData}">
          <template v-if="inputData.col.name === 'number'">
            {{ inputData.rowNumber }}
          </template>
          <template v-else-if="inputData.col.name === 'thumbnail'">
            <q-img :src="inputData.col.value"
                   width="100px" />
          </template>
          <template v-else-if="inputData.col.name === 'action'">
            <q-btn color="primary"
                   :to="{name: 'AdminPanel.PostCategory.Show', params: {id: inputData.props.row.id}}">
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
import { FormBuilderAssist } from 'quasar-form-builder'

export default {
  name: 'AdminPostCategoryList',
  components: { EntityIndex },
  mixins: [mixinWidget],
  props: {
    title: {
      type: String,
      default: 'لیست دسته بندی های کلی'
    },
    parent: {
      type: Number,
      default: null
    }
  },
  data: () => {
    return {
      api: APIGateway.postCategory.APIAdresses.base,
      tableKeys: {
        data: 'results',
        total: 'count',
        currentPage: 'current',
        perPage: 'per_page',
        pageKey: 'page'
      },
      inputs: [
        { type: 'hidden', name: 'parent', value: null },
        { type: 'hidden', name: 'parent__isnull', value: null }
      ],
      table: {
        columns: [
          {
            name: 'number',
            required: true,
            label: 'شماره',
            align: 'left',
            field: () => ''
          },
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
            label: 'بخش',
            align: 'left',
            field: row => row.title
          },
          {
            name: 'creation_time',
            required: true,
            label: 'تاریخ ایجاد',
            align: 'left',
            field: row => Assist.miladiToShamsi(row.creation_time)
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
    FormBuilderAssist.setAttributeByName(this.inputs, 'parent', 'value', this.parent)
    if (!this.parent) {
      FormBuilderAssist.setAttributeByName(this.inputs, 'parent__isnull', 'value', 'true')
    }
  },
  mounted() {
    this.mounted = true
  }
}
</script>

<style scoped lang="scss">
.AdminPostCategoryList {
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
