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
      <q-inner-loading :showing="basket.loading">
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
        <div v-for="item in basket.registrations_info.list"
             :key="item.id"
             class="selectedProductsList-row">
          <div class="selectedProductsList-title">
            {{ item.item_info.title }}
          </div>
          <div class="selectedProductsList-price">
            {{ (item.count * item.item_info.unit_price).toLocaleString('fa') }}
            تومان
          </div>
        </div>
        <div class="selectedProductsList-row footer">
          <div class="selectedProductsList-title">
            قابل پرداخت
          </div>
          <div class="selectedProductsList-price">
            {{ (basket.amount) ? basket.amount.toLocaleString('fa') : 0 }}
            تومان
          </div>
        </div>
        <div class="action">
          <q-btn color="primary"
                 :loading="basket.loading"
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
import { Basket } from 'src/models/Basket.js'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'

export default {
  name: 'Step2',
  mixins: [mixinWidget],
  data: () => {
    return {
      basket: new Basket(),
      entityLoading: true
    }
  },
  computed: {
    selectedProducts() {
      return this.$store.getters['Shop/selectedProducts']
    }
  },
  mounted() {
    this.checkoutReview()
  },
  methods: {
    checkoutReview () {
      this.basket.loading = true
      APIGateway.basket.checkoutReview(this.$route.params.shopServiceName)
        .then((basket) => {
          this.basket = new Basket(basket)
          this.basket.loading = false
        })
        .catch(() => {
          this.basket.loading = false
        })
    },
    onAccept () {
      this.$emit('onAccept')
    },
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
