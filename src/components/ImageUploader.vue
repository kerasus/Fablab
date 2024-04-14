<template>
  <q-card class="ImageUploader">
    <q-btn label="x"
           size="sm"
           color="red"
           class="btn-clear-value"
           @click="clearValue" />
    <q-card-section>
      <div class="preview-value">
        ({{ value || file }})
      </div>
      <div v-if="value"
           class="preview-pic"
           :style="{backgroundImage: value, height: '150px', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center'}" />
      <div>
        <q-input v-model="localFile"
                 label="آدرس فایل عکس" />
      </div>
      <div class="entity-create-section">
        <entity-create ref="entityCreate"
                       v-model:value="inputs"
                       title="آپلود تصویر"
                       :api="api"
                       :default-layout="false"
                       :entity-id-key-in-response="entityIdKeyInResponse"
                       :show-route-param-key="showRouteParamKey"
                       :index-route-name="indexRouteName"
                       :show-route-name="showRouteName"
                       :after-send-data="afterSendData" />
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { shallowRef } from 'vue'
import { EntityCreate } from 'quasar-crud'
import { APIGateway } from 'src/api/APIGateway.js'
import BtnControl from 'src/components/Control/btn.vue'

const BtnControlComp = shallowRef(BtnControl)

export default {
  name: 'ImageUploader',
  components: { EntityCreate },
  props: {
    value: {
      type: String,
      default: null
    },
    file: {
      type: String,
      default: null
    }
  },
  emits: ['update:value', 'update:file'],
  data () {
    return {
      entityLoading: false,
      api: APIGateway.media.APIAdresses.base,
      entityIdKeyInResponse: 'id',
      showRouteParamKey: 'id',
      showRouteName: 'AdminPanel.Service.Show',
      indexRouteName: 'AdminPanel.Service.List',
      inputs: [
        { type: 'file', name: 'file', responseKey: 'file', label: 'فایل تصویر', col: 'col-md-9 col-12' },
        {
          type: BtnControlComp,
          name: 'btn',
          responseKey: 'btn',
          label: 'آپلود',
          atClick: () => {
            this.create()
          },
          col: 'col-md-3 q-mt-sm'
        },
        { type: 'hidden', name: 'source_type', value: 'SETTING' },
        { type: 'hidden', name: 'type', value: 'VIDEO' }
      ]
    }
  },
  computed: {
    localFile: {
      get () {
        return this.file
      },
      set (newValue) {
        this.$emit('update:file', newValue)
        this.$emit('update:value', "url('" + newValue + "')")
      }
    }
  },
  methods: {
    create() {
      this.entityLoading = true
      this.$refs.entityCreate.createEntity(false)
        .then(() => {
          this.entityLoading = false
        })
        .catch(() => {
          this.entityLoading = false
        })
    },
    afterSendData (response) {
      this.$emit('update:file', response.data.file)
      this.$emit('update:value', "url('" + response.data.file + "')")
    },
    clearValue () {
      this.$emit('update:file', null)
      this.$emit('update:value', null)
    }
  }
}
</script>

<style lang="scss" scoped>
.ImageUploader {
  position: relative;
  .btn-clear-value {
    position: absolute;
    right: -10px;
    top: -10px;
  }
  .preview-value {
    /* rtl:ignore */
    text-align: left;
    /* rtl:ignore */
    direction: ltr;
    white-space: nowrap;
    overflow-x: auto;
    overflow-y: hidden;
  }
  .entity-create-section {

  }
}
</style>
