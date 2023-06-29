<template>
  <q-card class="ProductItem"
          :class="{'selected': isSelectedProduct}">
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
      <div class="not-selected">
        <!--      count-->
        <q-btn unelevated
               @click="onAddToCart">
          افزودن
        </q-btn>
      </div>
      <div class="selected">
        <q-btn unelevated
               icon="delete"
               class="reduceCount"
               @click="onDecrease" />
        <div>
          {{ productCount }}
        </div>
        <q-btn unelevated
               class="addCount"
               @click="onIncrease">
          +
        </q-btn>
      </div>
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
  },
  computed: {
    productCount () {
      const selectedProducts = this.selectedProducts
      const targetIndex = selectedProducts.list.findIndex(item => item.id === this.productData.id)
      if (targetIndex === -1) {
        return 0
      }
      return selectedProducts.list[targetIndex].count
    },
    shopServiceName () {
      return this.$store.getters['Shop/shopServiceName']
    },
    selectedProducts () {
      return this.$store.getters['Shop/selectedProducts']
    },
    isSelectedProduct () {
      return !!this.selectedProducts.list.find(product => product.id === this.productData.id)
    }
  },
  methods: {
    onAddToCart () {
      const selectedProducts = this.selectedProducts
      if (this.isSelectedProduct) {
        const targetIndex = selectedProducts.list.findIndex(item => item.id === this.productData.id)
        if (targetIndex === -1) {
          return
        }
        selectedProducts.list[targetIndex].addCount()
      }
      selectedProducts.add(this.productData)
      this.$store.commit('Shop/updateSelectedProducts', selectedProducts)
    },
    onIncrease () {
      const selectedProducts = this.selectedProducts
      const targetIndex = selectedProducts.list.findIndex(item => item.id === this.productData.id)
      if (targetIndex === -1) {
        return
      }
      selectedProducts.list[targetIndex].addCount()
      selectedProducts.removeZeroCount()
      this.$store.commit('Shop/updateSelectedProducts', selectedProducts)
    },
    onDecrease () {
      const selectedProducts = this.selectedProducts
      const targetIndex = selectedProducts.list.findIndex(item => item.id === this.productData.id)
      if (targetIndex === -1) {
        return
      }
      selectedProducts.list[targetIndex].reduceCount()
      selectedProducts.removeZeroCount()
      this.$store.commit('Shop/updateSelectedProducts', selectedProducts)
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
    .not-selected {
      display: block;
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
    .selected {
      display: none;
      .q-btn.addCount {
        border-radius: 0 16px 16px 16px;
        background: #D6E7D2;
        color: #2FA84A;
        font-size: 14px;
        font-weight: 500;
        line-height: 140%;
        width: 48px;
        height: 44px;
      }
      .q-btn.reduceCount {
        color: #A9A9A9;
        font-size: 14px;
        font-weight: 500;
        line-height: 140%;
        width: 48px;
        height: 44px;
      }
    }
  }
  &.selected {
    .action {
      .not-selected {
        display: none;
      }
      .selected {
        display: block;
        display: flex;
        flex-flow: row;
        justify-content: space-between;
        align-items: center;
      }
    }
  }
}
</style>
