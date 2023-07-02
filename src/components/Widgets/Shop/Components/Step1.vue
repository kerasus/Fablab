<template>
  <div className="Step1">
    <q-linear-progress v-if="productCategories.loading"
                       indeterminate />
    <product-category v-for="productCategory in productCategories.list"
                      :key="productCategory.id"
                      :basket="basket"
                      :product-category-data="productCategory"
                      @onIncrease="onIncrease"
                      @onDecrease="onDecrease" />
    <div class="action">
      <q-btn color="primary"
             :loading="basket.loading"
             class="q-px-xl"
             @click="onNextStep">
        مرحله بعد
      </q-btn>
    </div>
  </div>
</template>

<script>
import { Basket } from 'src/models/Basket.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { ProductCategoryList } from 'src/models/ProductCategory.js'
import ProductCategory from 'src/components/Widgets/Shop/Components/ProductCategory.vue'

export default {
  name: 'Step1',
  components: {
    ProductCategory
  },
  props: {
    basket: {
      type: Basket,
      default: new Basket()
    }
  },
  data: () => {
    return {
      productCategories: new ProductCategoryList()
    }
  },
  mounted() {
    this.getCategories()
  },
  methods: {
    onIncrease (product) {
      this.$emit('onIncrease', product)
    },
    onDecrease (product) {
      this.$emit('onDecrease', product)
    },
    getCategories() {
      this.productCategories.loading = true
      APIGateway.productCategory.index({ shopServiceName: this.$route.params.shopServiceName })
        .then(({ list }) => {
          this.productCategories = new ProductCategoryList(list)
          this.productCategories.loading = false
        })
        .catch(() => {
          this.productCategories.loading = false
        })
    },
    onNextStep () {
      this.$emit('onNextStep')
    }
  }
}
</script>

<style scoped lang="scss">
.Step1 {
  .list {
    margin-bottom: 40px;

    .list-title {
      color: #424242;
      font-size: 24px;
      font-weight: 700;
      line-height: 140%;
      margin-bottom: 32px;
    }
  }

  .action {
    display: flex;
    flex-flow: row;
    justify-content: flex-end;
  }
}
</style>
