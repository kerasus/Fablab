<template>
  <div class="form-builder-vueTiptaKatex"
       :class="customClass">
    <p v-text="label" />
    <tiptap-editor v-if="!disable && !readonly"
                   ref="tiptap"
                   v-model="inputData"
                   :name="name"
                   :options="options"
                   :class="customClass"
                   @update:model-value="change($event)"
                   @click="onClick" />
    <div v-else
         v-html="inputData" />
  </div>
</template>

<script>
import { inputMixin } from 'quasar-form-builder'
import { APIGateway } from 'src/api/APIGateway.js'
import TiptapEditor from 'src/components/vue3-tiptap-editor/editor.vue'

export default {
  name: 'FormBuilderTiptapEditor',
  components: { TiptapEditor },
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
        const uploadVideo = this.uploadVideo
        const uploadPhoto = this.uploadPhoto
        const uploadAudio = this.uploadAudio
        return {
          persianKeyboard: false,
          loadBareHtml: true,
          uploadPhoto,
          uploadVideo,
          uploadAudio
        }
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
      } else {
        this.setNewContent(newValue)
      }
    }
  },
  mounted () {
    if (this.inputData === false) {
      this.inputData = ''
    }
  },
  methods: {
    uploadAudio (files, updateUploadingProgressBar, onFileUpload, onError) {
      const formData = new FormData()
      formData.append('file', files[0])
      formData.append('type', 'SOUND')
      this.$axios.post(APIGateway.media.APIAdresses.base, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: progressEvent => {
          const { loaded, total } = progressEvent
          const percentage = Math.floor((loaded * 100) / total)
          updateUploadingProgressBar(percentage + '%')
        }
      })
        .then((response) => {
          onFileUpload(response.data.file)
        })
        .catch(() => {
          onError()
        })
    },
    uploadPhoto (files, updateUploadingProgressBar, onFileUpload, onError) {
      const formData = new FormData()
      formData.append('file', files[0])
      formData.append('type', 'IMAGE')
      this.$axios.post(APIGateway.media.APIAdresses.base, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: progressEvent => {
          const { loaded, total } = progressEvent
          const percentage = Math.floor((loaded * 100) / total)
          updateUploadingProgressBar(percentage + '%')
        }
      })
        .then((response) => {
          onFileUpload(response.data.file)
        })
        .catch(() => {
          onError()
        })
    },
    uploadVideo (files, updateUploadingProgressBar, onFileUpload, onError) {
      const formData = new FormData()
      formData.append('file', files[0])
      formData.append('type', 'VIDEO')
      this.$axios.post(APIGateway.media.APIAdresses.base, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: progressEvent => {
          const { loaded, total } = progressEvent
          const percentage = Math.floor((loaded * 100) / total)
          updateUploadingProgressBar(percentage + '%')
        }
      })
        .then((response) => {
          onFileUpload(response.data.file)
        })
        .catch(() => {
          onError()
        })
    },
    setNewContent(val) {
      this.$refs.tiptap.setContent(val)
    }
  }
}
</script>
