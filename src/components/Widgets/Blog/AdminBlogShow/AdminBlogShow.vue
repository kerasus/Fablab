<template>
  <div class="AdminBlogShow"
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
               :to="{name: 'AdminPanel.Blog.List'}"
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
                   title="اطلاعات کاربری"
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
import { Media } from 'src/models/Media.js'
import { MediaCategoryList } from 'src/models/MediaCategory.js'
import { MediaHashtagList } from 'src/models/MediaHashtag.js'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'

export default {
  name: 'AdminBlogShow',
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
      api: APIGateway.media.APIAdresses.base,
      mediaCategoryList: new MediaCategoryList(),
      mediaHashtagList: new MediaHashtagList(),
      entityIdKey: 'id',
      entityParamKey: 'id',
      showRouteName: 'AdminPanel.Blog.Show',
      indexRouteName: 'AdminPanel.Blog.List',
      inputs: [
        { type: 'input', name: 'title', responseKey: 'title', label: 'تیتر', col: 'col-md-12' },
        {
          type: 'formBuilder',
          name: 'formBuilderCol',
          col: 'col-md-6',
          gutterSize: 'lg',
          value: [
            { type: 'select', name: 'category', responseKey: 'category', options: [], label: 'دسته', col: 'col-md-12' },
            { type: 'select', name: 'type', responseKey: 'type', options: (new Media()).typeEnums, label: 'نوع', col: 'col-md-12' }
          ]
        },
        {
          type: 'formBuilder',
          name: 'formBuilderCol',
          col: 'col-md-6',
          gutterSize: 'lg',
          value: [
            { type: 'file', name: 'thumbnail', responseKey: 'thumbnail', label: 'تصویر', size: '250px', col: 'col-md-12' },
            { type: 'checkbox', name: 'is_active', responseKey: 'is_active', value: false, label: 'فعال', col: 'col-md-6' },
            { type: 'checkbox', name: 'is_deleted', responseKey: 'is_deleted', value: false, label: 'آرشیو', col: 'col-md-6' }
            // { type: 'checkbox', name: 'is_live_streaming', responseKey: 'is_live_streaming', value: false, label: 'لایو', col: 'col-md-6' },
          ]
        },
        { type: 'select', name: 'hashtags', responseKey: 'hashtags', options: [], multiple: true, label: 'تگ های مناسبت', col: 'col-md-12' },
        { type: 'inputEditor', name: 'description', responseKey: 'description', label: 'متن', col: 'col-md-12' },
        { type: 'input', name: 'iframe_code', responseKey: 'iframe_code', label: 'iframe', col: 'col-md-12' },
        { type: 'input', name: 'script_code', responseKey: 'script_code', label: 'script', col: 'col-md-12' },
        { type: 'input', name: 'url', responseKey: 'url', label: 'url', col: 'col-md-12' },
        { type: 'file', name: 'file', responseKey: 'file', label: 'صوت', col: 'col-md-12' },
        { type: 'hidden', name: 'id', responseKey: 'id', label: 'شناسه', col: 'col-md-12' }
      ]
    }
  },
  created() {
    this.api = this.api + '/' + this.$route.params.id
  },
  mounted() {
    this.loadOptions()
      .then(() => {
        this.mounted = true
        this.$nextTick(() => {
          this.setInputOptions('category', this.mediaCategoryList.list.map(item => {
            return {
              value: item.id,
              label: item.title
            }
          }))
          this.setInputOptions('hashtags', this.mediaHashtagList.list.map(item => {
            return {
              value: item.id,
              label: item.title
            }
          }))
        })
      })
      .catch(() => {
        this.mounted = true
      })
  },
  methods: {
    afterLoadInputData () {
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
    },
    loadOptions () {
      return new Promise((resolve, reject) => {
        Promise.all([this.loadCategories(), this.loadHashtags()])
          .then(() => {
            resolve()
          })
          .catch(() => {
            reject()
          })
      })
    },
    loadCategories () {
      return new Promise((resolve, reject) => {
        APIGateway.mediaCategory.index()
          .then(({ list }) => {
            this.mediaCategoryList = list
            resolve()
          })
          .catch(() => {
            reject()
          })
      })
    },
    loadHashtags () {
      return new Promise((resolve, reject) => {
        APIGateway.mediaHashtag.index()
          .then(({ list }) => {
            this.mediaHashtagList = list
            resolve()
          })
          .catch(() => {
            reject()
          })
      })
    },
    setInputOptions (name, options) {
      try {
        this.$refs.entityEdit.setInputAttributeByName(name, 'options', options)
      } catch (e) {
        console.log('e', e)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.AdminBlogShow {
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
