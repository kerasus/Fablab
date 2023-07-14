<template>
  <div class="GalleryBlogs"
       :style="localOptions.style">
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
                  :default-layout="false"
                  :table-grid-size="true">
      <template v-slot:no-entity>
        <div class="flex column items-center q-pa-lg">
          <div class="q-mb-sm">
            <q-avatar size="100px"
                      font-size="52px"
                      color="grey"
                      text-color="white"
                      icon="description" />
          </div>
          <div>محتوایی وجود نداره!</div>
        </div>
      </template>
      <template #entity-index-table-item-cell="{inputData}">
        <div class="col-md-3 col-sm-4 col-12 q-pa-sm">
          <blog-item :media="inputData.props.row" />
        </div>
      </template>
    </entity-index>
  </div>
</template>

<script>
import { EntityIndex } from 'quasar-crud'
import Assist from 'src/assets/js/Assist.js'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'
import BlogItem from 'src/components/Widgets/Blog/GalleryBlogs/BlogItem.vue'

export default {
  name: 'GalleryBlogs',
  components: { BlogItem, EntityIndex },
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
      inputs: [
        {
          type: 'hidden',
          name: 'category',
          value: '1'
        }
      ],
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
            field: row => row.category_info?.title
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
.GalleryBlogs {
  :deep(.quasar-crud-index-table) {
    .q-table__container {
      .q-table__top {
        display: none;
      }
    }
  }
}
</style>
