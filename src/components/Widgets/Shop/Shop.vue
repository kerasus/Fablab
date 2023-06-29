<template>
  <q-card class="Reservation"
          :style="localOptions.style">
    <q-tab-panels v-model="step"
                  animated>
      <q-tab-panel name="step1">
        <step1 @onNextStep="onStep1Complete" />
      </q-tab-panel>
      <q-tab-panel name="step2">
        <step2 :loading="invoice.loading"
               :invoice="invoice"
               @onPrevStep="setStep('step1')"
               @onAccept="onAccept" />
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
</template>

<script>
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
  mounted() {
    this.setStore()
    this.mounted = true
  },
  methods: {
    setStore () {
      if (this.$route.params.shopServiceName === this.shopServiceName) {
        return
      }

      this.$store.commit('Shop/updateShopServiceName', this.$route.params.shopServiceName)
      this.$store.commit('Shop/updateSelectedProducts', [])
    },
    setStep(step) {
      this.step = step
    },
    onStep1Complete () {
      this.createBasket()
    },
    createBasket () {
      const type = this.$route.params.shopServiceName.toUpperCase()
      const products = this.selectedProducts.list.map(item => {
        return {
          product_type: this.$route.params.shopServiceName + '_basket',
          product_id: item.id,
          count: item.count
        }
      })
      this.invoice.loading = true
      APIGateway.invoice.create(type, products)
        .then((invoice) => {
          this.invoice = new Invoice(invoice)
          this.invoice.loading = false
          this.setStep('step2')
        })
        .catch(() => {
          this.invoice.loading = false
        })
    },

    onAccept() {
      this.payInvoice()
    },
    createInvoice () {
      this.invoice.loading = true
      APIGateway.invoice.createService(this.products)
        .then((invoice) => {
          this.invoice = new Invoice(invoice)
          this.invoice.loading = false
          this.setStep('step3')
        })
        .catch(() => {
          this.invoice.loading = false
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
