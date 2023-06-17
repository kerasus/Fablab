<template>
  <div class="AdminBlogCategoryCreate"
       :style="localOptions.style">
    <div class="title">
      دسته جدید
    </div>
    <q-card class="form"
            flat>
      <entity-create ref="entityCreate"
                     v-model:value="inputs"
                     title="نقش جدید"
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
                   :loading="entityLoading"
                   @click="create">
              ایجاد دسته
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
  name: 'AdminBlogCategoryCreate',
  components: { EntityCreate },
  mixins: [mixinWidget],
  data: () => {
    return {
      entityLoading: false,
      api: APIGateway.mediaCategory.APIAdresses.base,
      entityIdKeyInResponse: 'id',
      showRouteParamKey: 'id',
      showRouteName: 'AdminPanel.BlogCategory.Show',
      indexRouteName: 'AdminPanel.Blog.List',
      inputs: [
        {
          type: 'input',
          name: 'title',
          label: 'نام دسته',
          placeholder: ' ',
          col: 'col-md-12 col-12'
        }
      ]
    }
  },
  methods: {
    create() {
      this.entityLoading = true
      this.$refs.entityCreate.createEntity()
        .then(() => {
          this.entityLoading = false
        })
        .catch(() => {
          this.entityLoading = false
        })
    }
  }
}
</script>

<style scoped lang="scss">
.AdminBlogCategoryCreate {
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
