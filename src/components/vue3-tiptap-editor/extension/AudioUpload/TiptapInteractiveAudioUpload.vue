<template>
  <node-view-wrapper :class="{ 'vue-component': true, 'inline': true, 'uploading': !node.attrs.url }"
                     data-drag-handle>
    <!--    <div v-if="!node.attrs.url"-->
    <!--               instant-upload="false"-->
    <!--               :style="{ maxWidth: '600px', margin: '0 auto' }"-->
    <!--               name="file"-->
    <!--               label-idle="Drop files here..."-->
    <!--               accepted-file-types="video/mp4,video/x-m4v,video/*"-->
    <!--               chunk-uploads="true"-->
    <!--               :server="editor.editorOptions.uploadServer"-->
    <!--               :files="files"-->
    <!--               @processfile="onFileUpload" />-->
    <div v-if="!node.attrs.url">
      <input type="file"
             accept="audio/*"
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
      <audio controls
             :src="node.attrs.url" />
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
      if (typeof this.editor.editorOptions.uploadAudio !== 'function') {
        return
      }

      this.uploading = true
      this.editor.editorOptions.uploadAudio(this.files, this.updateUploadingProgressBar, this.onFileUpload, this.onError)
    },
    updateUploadingProgressBar (percent) {
      this.uploadPercent = percent
    },
    onFileUpload (audioSrc) {
      this.uploading = false
      this.updateAttributes({
        url: audioSrc
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
