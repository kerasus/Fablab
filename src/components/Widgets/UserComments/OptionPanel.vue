<template>
  <option-panel-tabs v-model:options="localOptions">
    <template #main-tab>
      <div class="option-panel-container">
        <comment-item-option-panel v-for="(comment, commentIndex) in localOptions.comments"
                                   :key="commentIndex"
                                   v-model:options="localOptions.comments[commentIndex]" />
      </div>
      <q-btn class="full-width"
             color="primary"
             @click="addComment">
        افزودن نظر
      </q-btn>
    </template>
  </option-panel-tabs>
</template>
<script>
import { defineComponent } from 'vue'
import { mixinOptionPanel } from 'quasar-ui-q-page-builder'
import CommentItemOptionPanel from 'src/components/Widgets/UserComment/OptionPanel.vue'
import OptionPanelTabs from 'quasar-ui-q-page-builder/src/components/OptionPanelComponents/OptionPanelTabs.vue'

export default defineComponent({
  name: 'OptionPanel',
  components: { CommentItemOptionPanel, OptionPanelTabs },
  mixins: [mixinOptionPanel],
  props: {
    options: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      defaultOptions: {
        comments: []
      }
    }
  },
  methods: {
    addComment () {
      this.defaultOptions.comments.push({
        comment: '',
        user: {
          fullname: '',
          title: '',
          thumbnail: ''
        }
      })
    }
  }
})
</script>
