<template>
  <div class="AdminServiceShow"
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
          {{ serviceTitle }}
        </template>
      </div>
      <div class="back-action">
        <q-btn flat
               :to="{name: 'AdminPanel.Service.List'}"
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
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'

export default {
  name: 'AdminServiceShow',
  components: {
    EntityEdit
  },
  mixins: [mixinWidget],
  data: () => {
    return {
      mounted: false,
      entityLoading: true,
      serviceTitle: '',
      services: [],
      api: APIGateway.service.APIAdresses.base,
      entityIdKey: 'id',
      entityParamKey: 'id',
      showRouteName: 'AdminPanel.Service.Show',
      indexRouteName: 'AdminPanel.Service.List',
      inputs: [

        {
          type: 'input',
          name: 'title',
          responseKey: 'title',
          label: 'نام خدمت',
          placeholder: ' ',
          col: 'col-md-6 col-12'
        },
        {
          type: 'select',
          name: 'unit',
          label: 'واحد',
          responseKey: 'unit',
          placeholder: ' ',
          options: [
            {
              label: 'ساعت',
              value: 'HOUR'
            },
            {
              label: 'دقیقه',
              value: 'MINUTE'
            }
          ],
          col: 'col-md-6 col-12'
        },
        {
          type: 'input',
          name: 'minimum_order',
          responseKey: 'minimum_order',
          label: 'حداقل خدمت',
          placeholder: ' ',
          col: 'col-md-6 col-12'
        },
        {
          type: 'checkbox',
          name: 'order_verification_required',
          responseKey: 'order_verification_required',
          label: 'نیاز به تایید',
          placeholder: ' ',
          value: false,
          col: 'col-md-6 col-12'
        },
        {
          type: 'file',
          name: 'thumbnail',
          responseKey: 'thumbnail',
          label: 'تصویر رویداد',
          placeholder: 'تصویر مورد نظر را آپلود کنید',
          col: 'col-md-6 col-12'
        },
        {
          type: 'input',
          name: 'unit_price',
          responseKey: 'unit_price',
          label: 'قیمت به ازای هر واحد',
          placeholder: ' ',
          col: 'col-md-6 col-12'
        },
        {
          type: 'checkbox',
          name: 'standalone',
          responseKey: 'standalone',
          label: 'انتشار به عنوان خدمت تکی',
          placeholder: ' ',
          value: false,
          col: 'col-md-12 col-12'
        },
        {
          type: 'hidden',
          name: 'description',
          responseKey: 'description',
          value: '...'
        }
      ]
    }
  },
  created() {
    this.api = this.api + '/' + this.$route.params.id
  },
  mounted() {
    this.mounted = true
  },
  methods: {
    onUpdateServices () {
      this.$refs.entityEdit.getData()
    },
    afterLoadInputData (response) {
      this.serviceTitle = response.title
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
    }
  }
}
</script>

<style scoped lang="scss">
.AdminServiceShow {
  .title {
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 140%;
    color: #424242;
    margin-bottom: 27px;
    display: flex;
    flex-flow: row;
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
