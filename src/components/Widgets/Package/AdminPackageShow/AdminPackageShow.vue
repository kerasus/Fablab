<template>
  <div class="AdminPackageShow"
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
               :to="{name: 'AdminPanel.Package.List'}"
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
      <div class="AttachServiceSection q-mt-lg">
        <select-services-for-attach-to-package v-model:services="services"
                                               v-model:loading="entityLoading"
                                               @updated="onUpdateServices" />
      </div>
    </q-card>
  </div>
</template>

<script>
import { EntityEdit } from 'quasar-crud'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'
import SelectServicesForAttachToPackage from 'src/components/FormBuilderCustomControls/SelectServicesForAttachToPackage.vue'

export default {
  name: 'AdminPackageShow',
  components: {
    EntityEdit,
    SelectServicesForAttachToPackage
  },
  mixins: [mixinWidget],
  data: () => {
    return {
      mounted: false,
      entityLoading: true,
      packageTitle: '',
      services: [],
      api: APIGateway.package.APIAdresses.base,
      entityIdKey: 'id',
      entityParamKey: 'id',
      showRouteName: 'AdminPanel.Package.Show',
      indexRouteName: 'AdminPanel.Package.List',
      inputs: [
        {
          type: 'input',
          name: 'title',
          responseKey: 'title',
          label: 'نام پکیج',
          placeholder: ' ',
          col: 'col-md-4 col-12'
        },
        {
          type: 'input',
          name: 'capacity',
          responseKey: 'capacity',
          label: 'ظرفیت',
          placeholder: ' ',
          col: 'col-md-4 col-12'
        },
        {
          type: 'input',
          name: 'unit_price',
          responseKey: 'unit_price',
          label: 'قیمت',
          placeholder: ' ',
          col: 'col-md-4 col-12'
        },
        {
          type: 'hidden',
          name: 'description',
          responseKey: 'description'
        },
        {
          type: 'hidden',
          name: 'services_relation',
          responseKey: 'services_relation'
        },
        {
          type: 'hidden',
          name: 'services_relation_info',
          responseKey: 'services_relation'
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
      this.packageTitle = response.title
      this.services = response.services_relation_info
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
.AdminPackageShow {
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
