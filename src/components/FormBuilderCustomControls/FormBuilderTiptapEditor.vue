<template>
  <div class="form-builder-vueTiptaKatex"
       :class="customClass">
    <p v-text="label" />
    <component :is="editorComponent"
               v-if="!disable && !readonly"
               ref="tiptap"
               v-model="inputData"
               :name="name"
               :bubble-menu="false"
               :floating-menu="false"
               :options="options"
               :class="customClass"
               @update:model-value="change($event)"
               @click="onClick" />
    <div v-else
         v-html="inputData" />
  </div>
</template>

<script>
import { shallowRef } from 'vue'
import { inputMixin } from 'quasar-form-builder'

export default {
  name: 'FormBuilderTiptapEditor',
  mixins: [inputMixin],
  props: {
    name: {
      default: '',
      type: String
    },
    value: {
      default: '',
      type: [String, Number, Boolean]
    },
    options: {
      default: () => {
        return {}
      },
      type: Object
    }
  },
  data() {
    return {
      editorComponent: null
    }
  },
  watch: {
    value(newValue) {
      if (newValue === false) {
        this.inputData = ''
      }
    }
  },
  mounted () {
    if (this.inputData === false) {
      this.inputData = ''
    }

    import('vue3-tiptap-katex')
      .then((vue3TiptapKatex) => {
        this.editorComponent = shallowRef(vue3TiptapKatex.VueTiptapKatexNoSsr)
      })
      .catch()
  },
  methods: {
    setNewContent(val) {
      this.$refs.tiptap.setContent(val)
    }
  }
}
</script>

<style scoped></style>
