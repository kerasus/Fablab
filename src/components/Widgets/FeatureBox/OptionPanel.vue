<template>
  <option-panel-tabs v-model:options="localOptions">
    <template #main-tab>
      <div class="option-panel-container">
        <div class="input-container q-py-md">
          <div class="outsideLabel">image</div>
          <image-uploader v-model:file="localOptions.image" />
        </div>
        <div class="input-container q-py-md">
          <div class="outsideLabel">title</div>
          <q-input v-model="localOptions.title"
                   label="image" />
        </div>
        <div class="input-container q-py-md">
          <div class="outsideLabel">description</div>
          <q-input v-model="localOptions.description"
                   label="image" />
        </div>
      </div>
    </template>
  </option-panel-tabs>
</template>
<script>
import { defineComponent } from 'vue'
import { mixinOptionPanel } from 'quasar-ui-q-page-builder'
import ImageUploader from 'src/components/ImageUploader.vue'
import OptionPanelTabs from 'quasar-ui-q-page-builder/src/components/OptionPanelComponents/OptionPanelTabs.vue'

export default defineComponent({
  name: 'OptionPanel',
  components: { OptionPanelTabs, ImageUploader },
  mixins: [mixinOptionPanel],
  props: {
    options: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  watch: {
    localOptions: {
      handler(newVal) {
        this.$emit('update:options', newVal)
      },
      deep: true
    }
  }
})
</script>
