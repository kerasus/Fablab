<template>
  <q-card class="Reservation"
          :style="localOptions.style">
    <q-tab-panels v-model="step"
                  animated>
      <q-tab-panel name="step1">
        <step1 :basket="basket"
               @onNextStep="onStep1Complete"
               @onIncrease="onIncrease"
               @onDecrease="onDecrease" />
      </q-tab-panel>
      <q-tab-panel name="step2">
        <step2 @onPrevStep="setStep('step1')"
               @onAccept="onAccept" />
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
</template>

<script>
import { Basket } from 'src/models/Basket.js'
import { Invoice } from 'src/models/Invoice.js'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'
import Step1 from 'src/components/Widgets/Shop/Components/Step1.vue'
import Step2 from 'src/components/Widgets/Shop/Components/Step2.vue'

export default {
  name: 'Reservation',
  components: {
    Step1,
    Step2
  },
  mixins: [mixinWidget],
  data: () => {
    return {
      mounted: false,
      payMessage: '',
      invoice: new Invoice(),
      basket: new Basket(),
      step: 'step1'
    }
  },
  computed: {
    shopServiceName () {
      return this.$store.getters['Shop/selectedProducts']
    },
    selectedProducts () {
      return this.$store.getters['Shop/selectedProducts']
    }
  },
  mounted () {
    this.setStore()
    this.checkoutReview()
    this.mounted = true
  },
  methods: {
    onIncrease (product) {
      this.basket.loading = true
      APIGateway.basketRegistration.addToBasket({
        shopServiceName: this.$route.params.shopServiceName,
        item: product.id
      })
        .then(() => {
          this.checkoutReview()
        })
        .catch(() => {
          this.checkoutReview()
        })
    },
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
    onDecrease (product) {
      this.basket.loading = true
      APIGateway.basketRegistration.decrement({
        shopServiceName: this.$route.params.shopServiceName,
        item: product.id
      })
        .then(() => {
          this.checkoutReview()
        })
        .catch(() => {
          this.checkoutReview()
        })
    },
    setStore () {
      if (this.$route.params.shopServiceName === this.shopServiceName) {
        return
      }

      this.$store.commit('Shop/updateShopServiceName', this.$route.params.shopServiceName)
      this.$store.commit('Shop/updateSelectedProducts', [])
    },
    setStep (step) {
      this.step = step
    },
    onStep1Complete () {
      this.createBasket()
    },
    createBasket () {
      this.setStep('step2')
      // const type = this.$route.params.shopServiceName.toUpperCase()
      // const products = this.selectedProducts.list.map(item => {
      //   return {
      //     product_type: this.$route.params.shopServiceName + '_basket',
      //     product_id: item.id,
      //     count: item.count
      //   }
      // })
      // this.invoice.loading = true
      // APIGateway.invoice.create(type, products)
      //   .then((invoice) => {
      //     this.invoice = new Invoice(invoice)
      //     this.invoice.loading = false
      //     this.setStep('step2')
      //   })
      //   .catch(() => {
      //     this.invoice.loading = false
      //   })
    },

    onAccept () {
      this.createInvoice()
    },
    createInvoice () {
      this.basket.loading = true
      this.invoice.loading = true
      APIGateway.invoice.createBasket(this.$route.params.shopServiceName, this.basket.id)
        .then((invoice) => {
          this.invoice = new Invoice(invoice)
          this.invoice.loading = false
          this.basket.loading = false
          this.$router.push({ name: 'UserPanel.Invoice.Show', params: { id: this.invoice.id } })
        })
        .catch(() => {
          this.invoice.loading = false
          this.basket.loading = false
        })
    },
    payInvoice () {
      this.invoice.loading = true
      APIGateway.invoice.pay(this.invoice.id)
        .then((message) => {
          this.payMessage = message
          this.invoice.loading = false
          this.setStep('step4')
        })
        .catch(() => {
          this.invoice.loading = false
        })
    }
  }
}
</script>

<style scoped lang="scss">
.Reservation {
  padding: 24px;
  .q-tab-panels {
    background: transparent;
  }
}
</style>
