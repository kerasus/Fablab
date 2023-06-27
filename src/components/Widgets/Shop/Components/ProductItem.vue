<template>
  <q-card class="ProductItem">
    <div class="thumbnail">
      <q-img :src="productData.thumbnail" />
    </div>
    <div class="title ellipsis-2-lines">
      {{ productData.title }}
    </div>
    <div class="price">
      <div class="price-value">
        <div class="price-title">
          تومان
        </div>
        {{ productData.unit_price.toLocaleString('fa') }}
      </div>
    </div>
    <div class="action">
      <!--      count-->
      <q-btn unelevated>
        افزودن
      </q-btn>
    </div>
  </q-card>
</template>

<script>
import { Product } from 'src/models/Product.js'

export default {
  name: 'ProductItem',
  props: {
    productData: {
      type: Product,
      default: new Product()
    }
  }
}
</script>

<style scoped lang="scss">
.ProductItem {
  background: #F6F6F6;
  padding: 8px;
  box-shadow: none;
  .thumbnail {
    .q-img {
      border-radius: 16px 16px 0 16px;
      margin-bottom: 12px;
    }
  }
  .title {
    color: #393939;
    font-size: 16px;
    font-weight: 500;
    line-height: 140%;
    margin-bottom: 8px;
  }
  .price {
    display: flex;
    flex-flow: row;
    justify-content: center;
    align-items: center;
    .price-value {
      position: relative;
      padding-top: 14px;
      color: #393939;
      font-size: 24px;
      font-weight: 700;
      line-height: 140%;
      margin-bottom: 8px;
      .price-title {
        position: absolute;
        right: 0;
        top: 0;
        color: #393939;
        font-size: 10px;
        font-weight: 500;
        line-height: 140%;
      }
    }
  }
  .action {
    .q-btn {
      border-radius: 0 16px 16px 16px;
      background: var(--green-20, #D6E7D2);
      color: #2FA84A;
      font-size: 14px;
      font-weight: 500;
      line-height: 140%;
      width: 100%;
      height: 44px;
    }
  }
}
</style>
