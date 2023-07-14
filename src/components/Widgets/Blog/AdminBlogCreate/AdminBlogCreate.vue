<template>
  <div class="AdminBlogCreate"
       :style="localOptions.style">
    <div class="title">
      نوشته جدید
      <div class="back-action">
        <q-btn flat
               :to="{name: 'AdminPanel.Blog.List'}"
               color="grey">
          بازگشت
          >
        </q-btn>
      </div>
    </div>
    <q-card class="form"
            flat>
      <entity-create v-if="mounted"
                     ref="entityCreate"
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
              انتشار
            </q-btn>
          </div>
        </div>
      </div>
    </q-card>
  </div>
</template>

<script>
import { Media } from 'src/models/Media.js'
import { EntityCreate } from 'quasar-crud'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'

export default {
  name: 'AdminBlogCreate',
  components: { EntityCreate },
  mixins: [mixinWidget],
  data: () => {
    return {
      mounted: false,
      entityLoading: false,
      api: APIGateway.media.APIAdresses.base,
      entityIdKeyInResponse: 'id',
      showRouteParamKey: 'id',
      showRouteName: 'AdminPanel.Blog.Show',
      indexRouteName: 'AdminPanel.Blog.List',
      inputs: [
        { type: 'input', name: 'title', responseKey: 'title', label: 'تیتر', col: 'col-md-12 col-12' },
        {
          type: 'formBuilder',
          name: 'formBuilderCol',
          col: 'col-md-6 col-12',
          gutterSize: 'lg',
          value: [
            { type: 'select', name: 'category', responseKey: 'category', options: [], label: 'دسته', col: 'col-md-12 col-12' },
            { type: 'select', name: 'type', responseKey: 'type', options: (new Media()).typeEnums, label: 'نوع', col: 'col-md-12 col-12' }
          ]
        },
        {
          type: 'formBuilder',
          name: 'formBuilderCol',
          col: 'col-md-6 col-12',
          gutterSize: 'lg',
          value: [
            { type: 'file', name: 'thumbnail', responseKey: 'thumbnail', label: 'تصویر', size: '250px', col: 'col-md-12 col-12' },
            { type: 'checkbox', name: 'is_active', responseKey: 'is_active', value: false, label: 'فعال', col: 'col-md-6 col-12' },
            { type: 'checkbox', name: 'is_deleted', responseKey: 'is_deleted', value: false, label: 'آرشیو', col: 'col-md-6 col-12' }
            // { type: 'checkbox', name: 'is_live_streaming', responseKey: 'is_live_streaming', value: false, label: 'لایو', col: 'col-md-6 col-12' },
          ]
        },
        { type: 'select', name: 'hashtags', responseKey: 'hashtags', options: [], multiple: true, label: 'تگ های مناسبت', col: 'col-md-12 col-12' },
        { type: 'tiptap-editor', name: 'description', responseKey: 'description', label: 'متن', col: 'col-md-12 col-12' },
        // {
        //   type: 'tiptap-editor',
        //   name: 'description',
        //   responseKey: 'description',
        //   label: 'متن',
        //   options: {
        //     bubbleMenu: false,
        //     floatingMenu: false,
        //     poem: false,
        //     reading: false,
        //     persianKeyboard: true,
        //     mathliveOptions: { smartFence: false },
        //     uploadServer: {
        //       url: 'API_ADDRESS.media.upload',
        //       instantUpload: true,
        //       responseKey: 'file',
        //       headers: { Authorization: 'Bearer ' + 'Auth/accessToken' }
        //     }
        //   },
        //   col: 'col-md-12 col-12'
        // },
        { type: 'input', name: 'iframe_code', responseKey: 'iframe_code', label: 'iframe', col: 'col-md-12 col-12' },
        { type: 'input', name: 'script_code', responseKey: 'script_code', label: 'script', col: 'col-md-12 col-12' },
        { type: 'input', name: 'url', responseKey: 'url', label: 'url', col: 'col-md-12 col-12' },
        { type: 'file', name: 'file', responseKey: 'file', label: 'صوت', col: 'col-md-12 col-12' },
        { type: 'hidden', name: 'id', responseKey: 'id', label: 'شناسه', col: 'col-md-12 col-12' }
      ]
    }
  },
  mounted() {
    this.loadOptions()
    this.$nextTick(() => {
      this.mounted = true
    })
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
    },
    loadOptions () {
      this.loadCategories()
      this.loadHashtags()
    },
    loadCategories () {
      APIGateway.mediaCategory.index()
        .then(({ list }) => {
          const mediaCategoryList = list
          this.setInputOptions('category', mediaCategoryList.list.map(item => {
            return {
              value: item.id,
              label: item.title
            }
          }))
        })
    },
    loadHashtags () {
      APIGateway.mediaHashtag.index()
        .then(({ list }) => {
          const mediaHashtagList = list
          this.setInputOptions('hashtags', mediaHashtagList.list.map(item => {
            return {
              value: item.id,
              label: item.title
            }
          }))
        })
    },
    setInputOptions (name, options) {
      this.$refs.entityCreate.setInputAttributeByName(name, 'options', options)
    }
  }
}
</script>

<style scoped lang="scss">
.AdminBlogCreate {
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
  :deep(.form) {
    padding: 24px;
  }
}
</style>
