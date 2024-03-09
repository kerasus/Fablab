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
    <q-card class="form q-mt-lg"
            flat>
      <q-inner-loading :showing="invoice.loading">
        <q-spinner-gears size="50px"
                         color="primary" />
      </q-inner-loading>
      <div class="selectedProductsList">
        <div class="selectedProductsList-row head">
          <div class="selectedProductsList-title">
            شرح خدمات
          </div>
          <div class="selectedProductsList-price">
            مبلغ
          </div>
        </div>
        <div v-for="item in invoice.products_info.list"
             :key="item.id"
             class="selectedProductsList-row">
          <div class="selectedProductsList-title">
            {{ item.title }}
          </div>
          <div class="selectedProductsList-price">
            {{ (item.unit_price).toLocaleString('fa') }}
            تومان
          </div>
        </div>
        <div class="selectedProductsList-row footer">
          <div class="selectedProductsList-title">
            قابل پرداخت
          </div>
          <div class="selectedProductsList-price">
            {{ (invoice.amount) ? invoice.amount.toLocaleString('fa') : 0 }}
            تومان
          </div>
        </div>
        <div class="action">
          <q-btn color="primary"
                 :loading="loading"
                 class="q-px-xl"
                 @click="onAccept">
            تایید
          </q-btn>
        </div>
      </div>
    </q-card>
  </div>
</template>

<script>
import { Invoice } from 'src/models/Invoice.js'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'

export default {
  name: 'Step3',
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
      invoice: new Invoice(),
      entityLoading: true
    }
  },
  created () {
    this.loadInvoice()
  },
  mounted () {
  },
  methods: {
    loadInvoice () {
      this.invoice.loading = true
      APIGateway.invoice.get({ data: { id: this.invoiceId } })
        .then((invoice) => {
          this.invoice = new Invoice(invoice)
          this.invoice.loading = false
        })
        .catch(() => {
          this.invoice.loading = false
        })
    },
    onPrevStep () {
      this.$emit('onPrevStep')
    },
    onAccept () {
      this.$emit('onAccept')
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

    .selectedProductsList {
      width: 100%;

      .selectedProductsList-row {
        display: flex;
        flex-flow: row;
        justify-content: flex-start;
        align-items: center;
        padding: 16px 0;
        border-bottom: solid 1px #F6F6F6;

        &.head {
          .selectedProductsList-title {
            color: #6589C3;
            font-size: 16px;
            font-weight: 700;
            line-height: 140%;
          }

          .selectedProductsList-price {
            color: #6589C3;
            font-size: 16px;
            font-weight: 700;
            line-height: 140%;
          }
        }

        &.footer {
          .selectedProductsList-title {
            color: #2FA84A;
            font-size: 16px;
            font-weight: 700;
            line-height: 140%;
          }

          .selectedProductsList-price {
            color: #2FA84A;
            font-size: 16px;
            font-weight: 700;
            line-height: 140%;
          }
        }

        .selectedProductsList-title {
          width: calc(100% - 150px);
          color: #272727;
          font-size: 16px;
          font-weight: 500;
          line-height: 140%;
        }

        .selectedProductsList-price {
          width: 150px;
          color: #272727;
          font-size: 16px;
          line-height: 140%;
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

    .action {
      display: flex;
      flex-flow: row;
      justify-content: flex-end;
      margin-top: 32px;
    }
  }
}
</style>
