<template>
  <node-view-wrapper :class="{ 'vue-component': true, 'inline': true, 'uploading': !node.attrs.url }"
                     data-drag-handle>
    <div v-if="!node.attrs.url">
      <input type="file"
             accept="image/jpeg, image/png, image/*"
             @change="previewFiles">
      <button v-if="files.length > 0"
              :disabled="uploading"
              @click="upload">
        <template v-if="!uploading">
          upload
        </template>
        <div v-else
             v-html="uploadPercent" />
      </button>
    </div>
    <div v-else
         class="resizer-container"
         :style="{
           marginBottom: node.attrs.vertical + 'px',
           marginTop: -1 * node.attrs.vertical + 'px'
         }">
      <span class="mdi mdi-drag"
            :style="{ top: node.attrs.vertical + 'px', height: node.attrs.height + 'px' }" />
      <img :src="node.attrs.url">
      <!--      <vue-drag-resize :w="naturalWidth"-->
      <!--                       :h="naturalHeight"-->
      <!--                       :aspect-ratio="true"-->
      <!--                       :sticks="['br']"-->
      <!--                       axis="y"-->
      <!--                       :y="node.attrs.vertical"-->
      <!--                       @resizestop="resizeEnd"-->
      <!--                       @dragstop="dragEnd">-->
      <!--        <img :src="node.attrs.url">-->
      <!--      </vue-drag-resize>-->
    </div>
  </node-view-wrapper>
</template>

<script>
import { NodeViewWrapper, nodeViewProps } from '@tiptap/vue-3'

export default {
  components: {
    NodeViewWrapper
  },
  props: {
    nodeViewProps,
    node: {
      type: Object,
      required: true
    },
    updateAttributes: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      files: [],
      uploading: false,
      uploadPercent: null
    }
  },
  mounted () {
    this.setNaturalSize()
  },
  methods: {
    previewFiles(event) {
      this.files = event.target.files
    },
    upload () {
      if (typeof this.editor.editorOptions.uploadPhoto !== 'function') {
        return
      }

      this.uploading = true
      this.editor.editorOptions.uploadPhoto(this.files, this.updateUploadingProgressBar, this.onFileUpload, this.onError)
    },
    updateUploadingProgressBar (percent) {
      this.uploadPercent = percent
    },
    onFileUpload (src) {
      this.uploading = false
      this.updateAttributes({
        url: src
      })
    },
    onError () {
      this.uploading = false
    },

    getValidChainedObject (object, keys) {
      if (!Array.isArray(keys) && typeof keys !== 'string') {
        console.warn('keys must be array or string')
        return false
      }

      if (keys === '') {
        return object
      }

      let keysArray = keys
      if (typeof keys === 'string') {
        keysArray = keys.split('.')
      }

      if (keysArray.length === 1) {
        if (typeof object === 'undefined' || object === null || typeof object[keysArray[0]] === 'undefined') {
          return null
        }
        return object[keysArray[0]]
      }

      if (typeof object[keysArray[0]] !== 'undefined' && object[keysArray[0]] !== null) {
        return this.getValidChainedObject(object[keysArray[0]], keysArray.splice(1))
      }

      return (typeof object[keysArray[0]] !== 'undefined' && object[keysArray[0]] !== null)
    },
    getImageKeyOfResponse () {
      const responseKey = this.editor.editorOptions.uploadServer.responseKey
      if (!responseKey) {
        return 'url'
      }

      return responseKey
    },
    getImageUrlFromResponse (response) {
      const responseKey = this.getImageKeyOfResponse()

      return this.getValidChainedObject(response, responseKey)
    },
    setNaturalSize () {
      if (this.node.attrs.url) {
        const node = this.node
        const img = new Image()
        const that = this
        img.onload = function () {
          if (node.attrs.width && node.attrs.height) {
            that.naturalHeight = node.attrs.height
            that.naturalWidth = node.attrs.width
          } else {
            that.naturalHeight = img.naturalHeight
            that.naturalWidth = img.naturalWidth
          }
        }
        img.src = this.node.attrs.url
      }
    },
    resizeEnd (event) {
      this.updateAttributes({
        width: event.width,
        height: event.height
      })
      if (this.editor.editorOptions.onResizeEnd) {
        this.updateAttributes({
          url: this.editor.editorOptions.onResizeEnd(this.node.attrs.url, event.width, event.height)
        })
      }
    },
    dragEnd (event) {
      this.updateAttributes({
        vertical: event.top
      })
    }
  }
}
</script>

<style>
.vue-component.inline {
  display: inline-block;
}

.inline.uploading {
  width: 500px;
}

.inline .resizer-container {
  margin: 0 24px;
}

.filepond--credits {
  display: none;
}

.filepond--action-revert-item-processing {
  display: none;
}

.filepond--file-status-sub {
  display: none;
}

.resizer-container {
  position: relative;
  cursor: grab;
  display: flex;
  margin-right: 32px;
}

.resizer-container .mdi-drag {
  background: #e6e6e6;
  position: absolute;
  left: -16px;
}

.resizer-container .mdi-drag::before {
  position: relative;
  top: calc(50% - 10px);
}

.vdr {
  position: relative !important;
}

.resizer-container img {
  height: 100% !important;
}

</style>
