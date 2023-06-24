<template>
  <div class="Step3"
       :style="localOptions.style">
    <div class="title">
      <div class="static-title">
        پیش‌نمایش صورت‌حساب
      </div>
      <div class="back-action">
        <q-btn flat
               color="grey"
               @click="onPrevStep">
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
        <q-btn color="primary"
               :loading="loading"
               class="q-px-xl"
               @click="onAccept">
          تایید
        </q-btn>
      </div>
    </q-card>
  </div>
</template>

<script>
import { EntityShow } from 'quasar-crud'
import { Invoice } from 'src/models/Invoice.js'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'

export default {
  name: 'Step3',
  components: {
    EntityShow
  },
  mixins: [mixinWidget],
  props: {
    invoiceId: {
      type: Number,
      default: 0
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data: () => {
    return {
      mounted: false,
      entityLoading: true,
      entityId: '',
      api: APIGateway.invoice.APIAdresses.base,
      entityIdKey: 'id',
      entityParamKey: 'id',
      showRouteName: 'UserPanel.Invoice.Show',
      indexRouteName: 'UserPanel.Invoice.List',
      inputs: [
        {
          type: 'date',
          name: 'creation_time',
          responseKey: 'creation_time',
          label: 'تاریخ صورت‌حساب',
          placeholder: ' ',
          col: 'col-md-6 col-12'
        },
        {
          type: 'date',
          name: 'creation_time',
          responseKey: 'creation_time',
          label: 'تاریخ سررسید',
          placeholder: ' ',
          col: 'col-md-6 col-12'
        },
        {
          type: 'input',
          name: 'amount',
          responseKey: 'amount',
          label: 'مبلغ کل',
          placeholder: ' ',
          col: 'col-md-6 col-12'
        },
        {
          type: 'select',
          name: 'status',
          responseKey: 'status',
          label: 'وضعیت',
          placeholder: ' ',
          options: (new Invoice()).statusEnums,
          col: 'col-md-6 col-12'
        },
        {
          type: 'formBuilder',
          name: 'formBuilderCol',
          col: 'col-md-6',
          gutterSize: 'lg',
          value: [
            {
              type: 'input',
              name: 'creator_info.firstname',
              responseKey: 'creator_info.firstname',
              label: 'نام فروشنده',
              placeholder: ' ',
              col: 'col-md-4 col-12'
            },
            {
              type: 'input',
              name: 'creator_info.lastname',
              responseKey: 'creator_info.lastname',
              label: 'نام خانوادگی فروشنده',
              placeholder: ' ',
              col: 'col-md-4 col-12'
            }
          ]
        },
        {
          type: 'formBuilder',
          name: 'formBuilderCol',
          col: 'col-md-6',
          gutterSize: 'lg',
          value: [
            {
              type: 'input',
              name: 'owner_info.firstname',
              responseKey: 'owner_info.firstname',
              label: 'نام خریداد',
              placeholder: ' ',
              col: 'col-md-4 col-12'
            },
            {
              type: 'input',
              name: 'owner_info.lastname',
              responseKey: 'owner_info.lastname',
              label: 'نام خانوادگی خریداد',
              placeholder: ' ',
              col: 'col-md-4 col-12'
            }
          ]
        },
        {
          type: 'hidden',
          name: 'id',
          responseKey: 'id'
        }
      ]
    }
  },
  created() {
    this.api = this.api + '/' + this.invoiceId
  },
  mounted() {
    this.mounted = true
  },
  methods: {
    onPrevStep () {
      this.$emit('onPrevStep')
    },
    onAccept () {
      this.$emit('onAccept')
    },
    onUpdateServices () {
      this.$refs.entityEdit.getData()
    },
    afterLoadInputData (response) {
      this.entityId = response.id
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
.Step3 {
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
    .action {
      display: flex;
      flex-flow: row;
      justify-content: flex-end;
      margin-top: 32px;
    }
  }
}
</style>
