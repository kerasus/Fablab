<template>
  <div class="ProductCategory">
    <div class="title">
      {{ productCategoryData.title }}
    </div>
    <q-linear-progress v-if="products.loading"
                       indeterminate />
    <div class="list row">
      <div v-for="product in products.list"
           :key="product.id"
           :class="cols">
        <product-item :product-data="product" />
      </div>
    </div>
  </div>
</template>

<script>
import { APIGateway } from 'src/api/APIGateway.js'
import { ProductList } from 'src/models/Product.js'
import { ProductCategory } from 'src/models/ProductCategory.js'
import ProductItem from 'src/components/Widgets/Shop/Components/ProductItem.vue'

export default {
  name: 'ProductCategory',
  components: { ProductItem },
  props: {
    productCategoryData: {
      type: ProductCategory,
      default: new ProductCategory()
    },
    cols: {
      type: String,
      default: 'col-md-4 col-sm-6 col-12'
    }
  },
  data: () => {
    return {
      products: new ProductList()
    }
  },
  mounted() {
    this.getProducts()
  },
  methods: {
    getProducts () {
      this.products.loading = true
      APIGateway.product.index({ category: this.productCategoryData.id, shopServiceName: this.$route.params.shopServiceName })
        .then(({ list }) => {
          this.products = new ProductList(list)
          this.products.loading = false
        })
        .catch(() => {
          this.products.loading = false
        })
    }
  }
}
</script>

<style scoped lang="scss">
.ProductCategory {
  padding-bottom: 24px;
  margin-bottom: 24px;
  border-bottom: solid 1px #EDEDED;
  .title {
    color: #424242;
    font-size: 20px;
    font-weight: 700;
    line-height: 140%;
    margin-bottom: 24px;
  }
  .list {}
}
</style>
