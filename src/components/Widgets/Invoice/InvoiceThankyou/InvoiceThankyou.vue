<template>
  <div class="InvoiceShow"
       :style="localOptions.style">
    <div class="row justify-center items-center">
      <div class="col-md-6 q-mt-lg">
        <q-card>
          <q-card-section class="text-center">
            <div v-if="$route.query.status === 'true'">
              پرداخت با موفقیت انجام شد
            </div>
            <div v-else>
              پرداخت نا موفق بود
            </div>
            <div>
              کد پیگیری:
              {{ $route.query.code }}
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mixinWidget } from 'src/mixin/Mixins.js'

export default {
  name: 'InvoiceShow',
  mixins: [mixinWidget]
}
</script>
