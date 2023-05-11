<template>
  <div class="RoleList"
       :style="localOptions.style">
    <div class="header">
      <div class="title">
        نقش‌ها
      </div>
      <div class="action">
        <q-btn :to="{name: 'UserPanel.Role.Create'}">
          نقش جدید
        </q-btn>
      </div>
    </div>
    <div v-if="showEntity"
         class="list">
      <q-no-ssr>
        <entity-index v-model:value="inputs"
                      title="نقش‌ها"
                      :api="api"
                      :table="table"
                      :table-keys="tableKeys"
                      :create-route-name="createRouteName"
                      :default-layout="false" />
      </q-no-ssr>
    </div>
  </div>
</template>

<script>
import { EntityIndex } from 'quasar-crud'
import { mixinWidget } from 'src/mixin/Mixins'
import { APIGateway } from 'src/api/APIGateway'

export default {
  name: 'RoleList',
  components: { EntityIndex },
  mixins: [mixinWidget],
  data: () => ({
    api: APIGateway.role.APIAdresses.base,
    tableKeys: {
      data: 'results',
      total: 'count',
      currentPage: 'current',
      perPage: 'per_page',
      pageKey: 'page'
    },
    inputs: [],
    table: [],
    showEntity: false,
    createRouteName: '',
    defaultOptions: {
      style: {}
    }
  }),
  mounted () {
    this.showEntity = true
  },
  methods: {
    getTeacherOfProduct() {
      if (this.product.attributes.info.teacher) {
        return this.product.attributes.info.teacher[0]
      }
      return null
    },
    addToCart() {
      this.addToCartLoading = true
      this.$store.dispatch('Cart/addToCart', { product_id: this.product.id })
        .then(() => {
          this.$store.dispatch('Cart/reviewCart')
            .then(() => {
              this.addToCartLoading = false
            })
        }).catch(() => {
          this.addToCartLoading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.RoleList {
  .header {
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    .title {
      font-weight: 700;
      font-size: 32px;
      line-height: 140%;
    }
    .action {

    }
  }
  :deep(.list) {
    margin-top: 25px;
    .quasar-crud-index-table {
      .q-table__container {
        background-color: #FFFFFF;
        border: none;
        box-shadow: none;
        border-radius: 16px;
        .q-table__top {
          display: none;
        }
      }
    }
  }
}
</style>
