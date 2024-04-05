<template>
  <node-view-wrapper :class="{ 'vue-component': true, 'inline': true, 'uploading': !node.attrs.url }"
                     data-drag-handle>
    <div v-if="!node.attrs.url">
      <input type="file"
             accept="video/mp4,video/x-m4v,video/*"
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
      <video :src="node.attrs.url" />
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
  methods: {
    previewFiles(event) {
      this.files = event.target.files
    },
    upload () {
      if (typeof this.editor.editorOptions.uploadVideo !== 'function') {
        return
      }

      this.uploading = true
      this.editor.editorOptions.uploadVideo(this.files, this.updateUploadingProgressBar, this.onFileUpload, this.onError)
    },
    updateUploadingProgressBar (percent) {
      this.uploadPercent = percent
    },
    onFileUpload (videoSrc) {
      this.uploading = false
      this.updateAttributes({
        url: videoSrc
      })
    },
    onError () {
      this.uploading = false
    }
  }
}
</script>

<style>
.vue-component.inline {
  display: inline-block;
}

video {
  max-width: 100%;
}

.inline.uploading {
  width: 500px;
}

.inline .resizer-container {
  margin: 0 24px;
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
