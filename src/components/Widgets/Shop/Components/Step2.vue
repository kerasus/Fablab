<template>
  <div class="Step3"
       :style="localOptions.style">
    <div class="title">
      <div class="static-title">
        جزئیات صورت‌حساب
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
      <div class="selectedProductsList">
        <div class="selectedProductsList-row head">
          <div class="selectedProductsList-title">
            شرح خدمات
          </div>
          <div class="selectedProductsList-price">
            مبلغ
          </div>
        </div>
        <div v-for="product in selectedProducts.list"
             :key="product.id"
             class="selectedProductsList-row">
          <div class="selectedProductsList-title">
            {{ product.title }}
          </div>
          <div class="selectedProductsList-price">
            {{ (product.count * product.unit_price).toLocaleString('fa') }}
            تومان
          </div>
        </div>
        <div class="selectedProductsList-row footer">
          <div class="selectedProductsList-title">
            قابل پرداخت
          </div>
          <div class="selectedProductsList-price">
            {{ invoice.amount.toLocaleString('fa') }}
            تومان
          </div>
        </div>
      </div>
    </q-card>
  </div>
</template>

<script>
import { Invoice } from 'src/models/Invoice.js'
import { mixinWidget } from 'src/mixin/Mixins.js'

export default {
  name: 'Step2',
  mixins: [mixinWidget],
  props: {
    invoice: {
      type: Invoice,
      default: new Invoice()
    }
  },
  data: () => {
    return {
      entityLoading: true
    }
  },
  computed: {
    selectedProducts() {
      return this.$store.getters['Shop/selectedProducts']
    }
  },
  methods: {
    onPrevStep () {
      this.$emit('onPrevStep')
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
}
</style>
