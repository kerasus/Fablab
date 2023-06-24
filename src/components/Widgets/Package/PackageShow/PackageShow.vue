<template>
  <div class="PackageShow"
       :style="localOptions.style">
    <div class="title">
      <div class="static-title" />
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
               :to="{name: 'UserPanel.Package.RegisteredList'}"
               color="grey">
          بازگشت
          >
        </q-btn>
      </div>
    </div>
    <q-card class="form"
            flat>
      <entity-show v-if="mounted"
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
    </q-card>
  </div>
</template>

<script>
import { EntityShow } from 'quasar-crud'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { Registration } from 'src/models/Registration'

export default {
  name: 'PackageShow',
  components: {
    EntityShow
  },
  mixins: [mixinWidget],
  data: () => {
    return {
      mounted: false,
      entityLoading: true,
      packageTitle: '',
      services: [],
      api: APIGateway.registration.APIAdresses.base,
      entityIdKey: 'id',
      entityParamKey: 'id',
      showRouteName: 'UserPanel.Package.Show',
      indexRouteName: 'UserPanel.Package.List',
      inputs: [
        {
          type: 'date',
          name: 'title',
          responseKey: 'creation_time',
          label: 'تاریخ خرید پکیج',
          placeholder: ' ',
          col: 'col-md-4 col-12'
        },
        {
          type: 'date',
          name: 'title',
          responseKey: 'termination_datetime',
          label: 'تاریخ سررسید',
          placeholder: ' ',
          col: 'col-md-4 col-12'
        },
        {
          type: 'select',
          name: 'time_status',
          responseKey: 'time_status',
          label: 'وضعیت پکیج',
          placeholder: ' ',
          options: (new Registration()).timeStatusEnums,
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
      this.packageTitle = response.product_info.title
      this.entityLoading = false
    }
  }
}
</script>

<style scoped lang="scss">
.PackageShow {
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
