<template>
  <q-card class="Reservation"
          :style="localOptions.style">
    <q-tab-panels v-model="step"
                  animated>
      <q-tab-panel name="step1">
        <step1 @onNextStep="setStep('step2')" />
      </q-tab-panel>
      <q-tab-panel name="step2">
        <step2 :loading="invoice.loading"
               @onPrevStep="setStep('step1')"
               @onNextStep="createInvoice" />
      </q-tab-panel>
      <q-tab-panel name="step3">
        <step3 :loading="invoice.loading"
               :invoice-id="invoice.id"
               @onPrevStep="setStep('step2')"
               @onAccept="onAccept" />
      </q-tab-panel>
      <q-tab-panel name="step4">
        <step4 :message="payMessage" />
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
import Step3 from 'src/components/Widgets/Shop/Components/Step3.vue'
import Step4 from 'src/components/Widgets/Shop/Components/Step4.vue'

export default {
  name: 'Reservation',
  components: {
    Step1,
    Step2,
    Step3,
    Step4
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
    packages () {
      return this.$store.getters['Reservation/packages']
    },
    services () {
      return this.$store.getters['Reservation/services']
    },
    products () {
      const products = []
      this.packages.list.forEach(item => {
        products.push({
          product_type: 'package',
          product_id: item.id,
          count: item.count
        })
      })
      this.services.list.forEach(item => {
        products.push({
          product_type: 'service',
          product_id: item.id,
          count: item.count
        })
      })
      return products
    }
  },
  mounted() {
    this.mounted = true
  },
  methods: {
    setStep(step) {
      this.step = step
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
