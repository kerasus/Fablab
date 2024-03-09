<template>
  <option-panel-tabs v-model:options="localOptions">
    <template #main-tab>
      <div class="option-panel-container">
        <div class="row q-mt-sm">
          <div class="col-md-12">
            <div>
              comment:
            </div>
            <editor v-model:value="localOptions.comment" />
          </div>
          <div class="col-md-12">
            <q-input v-model="localOptions.user.thumbnail"
                     label="user.thumbnail" />
          </div>
          <div class="col-md-12">
            <q-input v-model="localOptions.user.fullname"
                     label="user.fullname" />
          </div>
          <div class="col-md-12">
            <q-input v-model="localOptions.user.title"
                     label="user.title" />
          </div>
        </div>
      </div>
    </template>
  </option-panel-tabs>
</template>
<script>
import { defineComponent } from 'vue'
import Editor from 'components/Utils/Editor.vue'
import { mixinOptionPanel } from 'quasar-ui-q-page-builder'
import OptionPanelTabs from 'quasar-ui-q-page-builder/src/components/OptionPanelComponents/OptionPanelTabs.vue'

export default defineComponent({
  name: 'OptionPanel',
  components: { Editor, OptionPanelTabs },
  mixins: [mixinOptionPanel],
  props: {
    options: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      defaultOptions: {
        comment: '',
        user: {
          fullname: '',
          title: '',
          thumbnail: ''
        }
      }
    }
  }
})
</script>
