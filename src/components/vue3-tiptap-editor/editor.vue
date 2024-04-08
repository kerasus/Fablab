<template>
  <div>
    <div v-if="editor"
         class="tiptap-container">
      <div class="tiptap-header">
        <toolbar ref="toolbar"
                 :editor="editor"
                 :editor-options="editorOptions" />
      </div>
      <div class="editor-content">
        <editor-content :editor="editor" />
      </div>
    </div>
  </div>
</template>

<script>
import toolbar from './toolbar.vue'
import Link from '@tiptap/extension-link'
import Focus from '@tiptap/extension-focus'
import Table from '@tiptap/extension-table'
import StarterKit from '@tiptap/starter-kit'
import { Color } from '@tiptap/extension-color'
import TableRow from '@tiptap/extension-table-row'
import Highlight from '@tiptap/extension-highlight'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import TextStyle from '@tiptap/extension-text-style'
import { Editor, EditorContent } from '@tiptap/vue-3'
import * as VueTiptapKatexAssist from './assist.js'

import ExtensionTableCell from './extension/table.js'
import TiptapInteractiveImageUploadInline from './extension/ImageUpload/extensionImageInline.mjs'
import TiptapInteractiveVideoUploadInline from './extension/VideoUpload/extensionVideoInline.mjs'
import TiptapInteractiveAudioUploadInline from './extension/AudioUpload/extensionAudioUploadInline.mjs'
import TiptapInteractiveInsertScriptInline from './extension/InsertScript/extensionInsertScriptInline.mjs'

export default {
  name: 'EditorComp',
  components: { toolbar, EditorContent },
  props: {
    loading: {
      type: Boolean,
      required: false,
      default: false
    },
    options: {
      type: Object,
      required: false,
      default() {
        return {}
      }
    },
    modelValue: {
      type: String,
      required: false,
      default: ''
    }
  },
  data() {
    return {
      editor: null,
      newModelValue: null
    }
  },
  computed: {
    editorOptions() {
      const options = {
        loadBareHtml: false,
        persianKeyboard: false
      }
      Object.assign(options, this.options)
      return options
    },
    localModelValue: {
      get () {
        return this.modelValue
      },
      set (newValue) {
        if (this.newModelValue === newValue) {
          return
        }
        this.$emit('update:modelValue', newValue)
      }
    }
  },
  beforeMount () {
    this.newModelValue = VueTiptapKatexAssist.convertToTiptap(this.localModelValue)
    this.localModelValue = VueTiptapKatexAssist.convertToTiptap(this.modelValue)
  },
  mounted() {
    const vueTiptapKatexInstance = this
    this.localModelValue = this.editorOptions.loadBareHtml ? VueTiptapKatexAssist.convertBareHtml(this.localModelValue) : this.localModelValue
    this.editor = new Editor({
      content: this.localModelValue,
      extensions: [
        Link.configure({ openOnClick: false }),
        Focus.configure({
          className: 'has-focus',
          mode: 'all'
        }),
        StarterKit.configure({
          paragraph: {
            HTMLAttributes: { dir: 'auto' }
          }
        }),
        TextAlign.configure({
          types: ['heading', 'paragraph'],
          defaultAlignment: ''
        }),
        Color.configure({
          types: ['textStyle']
        }),
        TextStyle,
        // Document,
        // Text,
        Highlight.configure({
          multicolor: true
        }),
        Underline,
        Table.configure({
          resizable: true,
          HTMLAttributes: {
            class: 'tiptap-table',
            style: 'border-collapse: collapse !important'
          }
        }),
        TableRow.extend({
          content: 'tableCell*'
        }),
        ExtensionTableCell,
        TiptapInteractiveImageUploadInline,
        TiptapInteractiveVideoUploadInline,
        TiptapInteractiveAudioUploadInline,
        TiptapInteractiveInsertScriptInline
      ],
      // triggered on every change
      onUpdate({ editor }) {
        const htmlContent = vueTiptapKatexInstance.editorOptions.loadBareHtml ? VueTiptapKatexAssist.convertBareHtml(editor.getHTML()) : editor.getHTML()
        vueTiptapKatexInstance.localModelValue = htmlContent
        vueTiptapKatexInstance.newModelValue = VueTiptapKatexAssist.convertToTiptap(htmlContent)
      }
    })

    this.editor.editorOptions = this.editorOptions
  },
  beforeUnmount() {
    this.editor.destroy()
  },
  methods: {
    setContent(pureHTML) {
      const htmlContent = this.editorOptions.loadBareHtml ? VueTiptapKatexAssist.convertBareHtml(pureHTML) : pureHTML
      const string = VueTiptapKatexAssist.convertToTiptap(htmlContent)
      // const oldanchor = this.editor.state.tr.selection.anchor
      if (string.length) {
        this.editor.commands.setContent(string)
      }
      // this.editor.commands.focus(oldanchor)
    },
    getContent() {
      return this.editor.getHTML()
    }
  }
}
</script>

<style lang="scss" scoped>

.tiptap-container {
  width: 100%;
  margin: 0;
  border-radius: 10px;
  position: relative;
  background: white;
  border: solid 1px #e9ecf4;

  .tiptap-header {
    background-color: #e9ecf4;
    padding: 8px;
  }

  :deep(.ProseMirror) {
    overflow: auto;
    &:focus-visible {
      outline: none;
    }
  }

  .tableWrapper {
    overflow-x: auto;

    table {
      float: left;
    }
  }

  .resize-cursor {
    cursor: ew-resize;
    cursor: col-resize;
  }
}
table {
  border-collapse: collapse;
  table-layout: fixed;
  width: 100%;
  margin: 0;
  overflow: hidden;
  td,
  th {
    min-width: 1em;
    border: 2px solid #ced4da;
    padding: 3px 5px;
    vertical-align: top;
    box-sizing: border-box;
    position: static;
    > * {
      margin-bottom: 0;
    }
  }
  th {
    font-weight: bold;
    text-align: left;
    background-color: #f1f3f5;
  }
  .selectedCell:after {
    z-index: 2;
    position: absolute;
    content: "";
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(200, 200, 255, 0.4);
    pointer-events: none;
  }
  .column-resize-handle {
    position: absolute;
    right: -2px;
    top: 0;
    bottom: -2px;
    width: 4px;
    background-color: #adf;
    pointer-events: none;
  }
}
</style>
