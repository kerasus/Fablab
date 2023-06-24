<template>
  <div class="AdminInvoiceShow"
       :style="localOptions.style">
    <div class="title">
      <div class="static-title">
        سفارش
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
               :to="{name: 'AdminPanel.Invoice.List'}"
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
import { Invoice } from 'src/models/Invoice'

export default {
  name: 'AdminInvoiceShow',
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
      api: APIGateway.invoice.APIAdresses.base,
      entityIdKey: 'id',
      entityParamKey: 'id',
      showRouteName: 'AdminPanel.Invoice.Show',
      indexRouteName: 'AdminPanel.Invoice.List',
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
          disable: true,
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
              disable: true,
              col: 'col-md-4 col-12'
            },
            {
              type: 'input',
              name: 'creator_info.lastname',
              responseKey: 'creator_info.lastname',
              label: 'نام خانوادگی فروشنده',
              placeholder: ' ',
              disable: true,
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
              disable: true,
              col: 'col-md-4 col-12'
            },
            {
              type: 'input',
              name: 'owner_info.lastname',
              responseKey: 'owner_info.lastname',
              label: 'نام خانوادگی خریداد',
              placeholder: ' ',
              disable: true,
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
      this.$refs.entityEdit.editEntity(false)
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
.AdminInvoiceShow {
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
