<template>
  <div v-if="editor"
       class="tiptap-toolbar">
    <!--        IMPORTANT : EACH TOOLBAR ITEM'S ID SHOULD BE IN THIS FORM : toolbar-item-(if more than 2 words , use "-") -->
    <ul>
      <li>
        <div id="toolbar-item-Paragraph"
             class="toolbar-item"
             @click="editor.chain().focus().setParagraph().run()">
          <span class="mdi mdi-format-paragraph toolbar-item-icon" />
        </div>
      </li>
      <li>
        <div id="toolbar-item-Heading-1"
             class="toolbar-item"
             @click="editor.chain().focus().toggleHeading({ level: 1 }).run()">
          <span class="mdi mdi-format-header-1 toolbar-item-icon" />
        </div>
      </li>
      <li>
        <div id="toolbar-item-Heading-2"
             class="toolbar-item"
             @click="editor.chain().focus().toggleHeading({ level: 2 }).run()">
          <span class="mdi mdi-format-header-2 toolbar-item-icon" />
        </div>
      </li>
      <li>
        <div id="toolbar-item-Heading-3"
             class="toolbar-item"
             @click="editor.chain().focus().toggleHeading({ level: 3 }).run()">
          <span class="mdi mdi-format-header-3 toolbar-item-icon" />
        </div>
      </li>
      <li>
        <div id="toolbar-item-Heading-4"
             class="toolbar-item"
             @click="editor.chain().focus().toggleHeading({ level: 4 }).run()">
          <span class="mdi mdi-format-header-4 toolbar-item-icon" />
        </div>
      </li>
      <li>
        <div id="toolbar-item-Heading-5"
             class="toolbar-item"
             @click="editor.chain().focus().toggleHeading({ level: 5 }).run()">
          <span class="mdi mdi-format-header-5 toolbar-item-icon" />
        </div>
      </li>
      <li>
        <div id="toolbar-item-Heading-6"
             class="toolbar-item"
             @click="editor.chain().focus().toggleHeading({ level: 6 }).run()">
          <span class="mdi mdi-format-header-6 toolbar-item-icon" />
        </div>
      </li>
      <li>
        <div class="vl" />
      </li>
      <li>
        <div id="toolbar-item-Link"
             class="toolbar-item">
          <button :class="{ 'is-active': editor.isActive('link') }"
                  @click="setLink">
            <span class="mdi mdi-link toolbar-item-icon" />
          </button>
        </div>
      </li>
      <li>
        <div id="toolbar-item-unsetLink"
             class="toolbar-item">
          <button :disabled="!editor.isActive('link')"
                  @click="editor.chain().focus().unsetLink().run()">
            <span class="mdi mdi-link-off toolbar-item-icon" />
          </button>
        </div>
      </li>
      <li>
        <div id="toolbar-item-Bold"
             class="toolbar-item"
             @click="editor.chain().focus().toggleBold().run()">
          <span class="mdi mdi-format-bold toolbar-item-icon" />
        </div>
      </li>
      <li>
        <div id="toolbar-item-Italic"
             class="toolbar-item"
             @click="editor.chain().focus().toggleItalic().run()">
          <span class="mdi mdi-format-italic toolbar-item-icon" />
        </div>
      </li>
      <li>
        <div id="toolbar-item-Underline"
             class="toolbar-item"
             @click="editor.chain().focus().toggleUnderline().run()">
          <span class="mdi mdi-format-underline toolbar-item-icon" />
        </div>
      </li>
      <li>
        <div id="toolbar-item-Line-Through"
             class="toolbar-item"
             @click="editor.chain().focus().toggleStrike().run()">
          <span class="mdi mdi-format-strikethrough toolbar-item-icon" />
        </div>
      </li>
      <li>
        <div id="toolbar-item-Highlight"
             class="toolbar-item"
             @click="editor.chain().focus().toggleHighlight().run()">
          <span class="mdi mdi-format-color-highlight toolbar-item-icon" />
        </div>
      </li>
      <li>
        <input id="toolbar-item-set-color"
               class="toolbar-item"
               type="color"
               :value="getInputValue"
               @input="editor.chain().focus().setColor($event.target.value).run()">
      </li>
      <li>
        <div class="vl" />
      </li>
      <li>
        <div id="toolbar-item-Align-Right"
             class="toolbar-item"
             @click="editor.chain().focus().setTextAlign('right').run()">
          <span class="mdi mdi-format-align-right toolbar-item-icon" />
        </div>
      </li>
      <li>
        <div id="toolbar-item-Align-Center"
             class="toolbar-item"
             @click="editor.chain().focus().setTextAlign('center').run()">
          <span class="mdi mdi-format-align-center toolbar-item-icon" />
        </div>
      </li>
      <li>
        <div id="toolbar-item-Align-Left"
             class="toolbar-item"
             @click="editor.chain().focus().setTextAlign('left').run()">
          <span class="mdi mdi-format-align-left toolbar-item-icon" />
        </div>
      </li>
      <li>
        <div id="toolbar-item-Align-Justify"
             class="toolbar-item"
             @click="editor.chain().focus().setTextAlign('justify').run()">
          <span class="mdi mdi-format-align-justify toolbar-item-icon" />
        </div>
      </li>
      <li>
        <div class="vl" />
      </li>
      <li>
        <div id="toolbar-item-Text-rtl"
             class="toolbar-item"
             @click="editor.chain().focus().setTextDirection('rtl').run()">
          <span class="mdi mdi-format-textdirection-r-to-l toolbar-item-icon" />
        </div>
      </li>
      <li>
        <div id="toolbar-item-Text-ltr"
             class="toolbar-item"
             @click="editor.chain().focus().setTextDirection('ltr').run()">
          <span class="mdi mdi-format-textdirection-l-to-r toolbar-item-icon" />
        </div>
      </li>
      <li>
        <div class="vl" />
      </li>
      <li>
        <div id="toolbar-item-Unordered-List"
             class="toolbar-item"
             @click="editor.chain().focus().toggleBulletList().run()">
          <span class="mdi mdi-format-list-bulleted toolbar-item-icon" />
        </div>
      </li>
      <li>
        <div id="toolbar-item-Ordered-List"
             class="toolbar-item"
             @click="editor.chain().focus().toggleOrderedList().run()">
          <span class="mdi mdi-format-list-numbered toolbar-item-icon" />
        </div>
      </li>
      <li>
        <div class="vl" />
      </li>
      <li>
        <div id="toolbar-item-Break"
             class="toolbar-item"
             @click="editor.chain().focus().setHardBreak().run()">
          <span class="mdi mdi-arrow-expand-down toolbar-item-icon" />
        </div>
      </li>
      <li>
        <div id="toolbar-item-Horizontal-Divider"
             class="toolbar-item"
             @click="editor.chain().focus().setHorizontalRule().run()">
          <span class="mdi mdi-arrow-split-horizontal toolbar-item-icon" />
        </div>
      </li>
      <li>
        <div class="vl" />
      </li>
      <li>
        <div id="toolbar-item-Table"
             class="toolbar-item"
             @click="editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: false }).run()">
          <span class="mdi mdi-table-plus toolbar-item-icon" />
        </div>
      </li>
      <li v-if="editor.can().mergeCells()">
        <div id="toolbar-item-Edit-Table"
             class="toolbar-item"
             @click="$emit('show-edit-table-modal')">
          <span class="mdi mdi-table-edit  toolbar-item-icon" />
        </div>
      </li>
      <li v-if="editor.can().mergeCells()">
        <div id="toolbar-item-Merge-Cells"
             class="toolbar-item"
             @click="editor.chain().focus().mergeCells().run()">
          <span class="mdi mdi-table-merge-cells  toolbar-item-icon" />
        </div>
      </li>
      <li v-if="editor.can().splitCell()">
        <div id="toolbar-item-Split-Cells"
             class="toolbar-item"
             @click="editor.chain().focus().splitCell().run()">
          <span class="mdi mdi-table-split-cell  toolbar-item-icon" />
        </div>
      </li>
      <li v-if="editor.can().addColumnAfter()">
        <div id="toolbar-item-Add-Column"
             class="toolbar-item"
             @click="editor.chain().focus().addColumnAfter().run()">
          <span class="mdi mdi-table-column-plus-after  toolbar-item-icon" />
        </div>
      </li>
      <li v-if="editor.can().addRowAfter()">
        <div id="toolbar-item-Add-Row"
             class="toolbar-item"
             @click="editor.chain().focus().addRowAfter().run()">
          <span class="mdi mdi-table-row-plus-after  toolbar-item-icon" />
        </div>
      </li>
      <li v-if="editor.can().deleteColumn()">
        <div id="toolbar-item-Delete-Column"
             class="toolbar-item"
             @click="editor.chain().focus().deleteColumn().run()">
          <span class="mdi mdi-table-column-remove  toolbar-item-icon" />
        </div>
      </li>
      <li v-if="editor.can().deleteRow()">
        <div id="toolbar-item-Delete-Row"
             class="toolbar-item"
             @click="editor.chain().focus().deleteRow().run()">
          <span class="mdi mdi-table-row-remove  toolbar-item-icon" />
        </div>
      </li>
      <li>
        <div id="toolbar-item-Image"
             class="toolbar-item"
             @click="editor.chain().focus().insertContent('<img>').run()">
          <span class="mdi mdi-image toolbar-item-icon" />
        </div>
      </li>
      <li>
        <div id="toolbar-item-Video"
             class="toolbar-item"
             @click="editor.chain().focus().insertContent('<video>').run()">
          <span class="mdi mdi-video-outline toolbar-item-icon" />
        </div>
      </li>
      <li>
        <div id="toolbar-item-audio"
             class="toolbar-item"
             @click="editor.chain().focus().insertContent('<audio>').run()">
          <span class="mdi mdi-volume-high toolbar-item-icon" />
        </div>
      </li>
      <li v-if="editorOptions.loadBareHtml">
        <div id="toolbar-item-BareHtml"
             class="toolbar-item"
             @click="editor.chain().focus().insertContent(`<div class='barehtml'>`).run()">
          <span class="mdi mdi-application-brackets-outline toolbar-item-icon" />
        </div>
      </li>
      <li>
        <div class="vl" />
      </li>
      <li>
        <div id="toolbar-item-Redo"
             class="toolbar-item"
             @click="editor.chain().focus().redo().run()">
          <span class="mdi mdi-redo toolbar-item-icon" />
        </div>
      </li>
      <li>
        <div id="toolbar-item-Undo"
             class="toolbar-item"
             @click="editor.chain().focus().undo().run()">
          <span class="mdi mdi-undo toolbar-item-icon" />
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ToolbarComponent',
  props: {
    editor: {
      type: Object,
      default: () => {
      }
    },
    editorOptions: {
      type: Object,
      default: () => {
        return {
          poem: false
        }
      }
    }
  },
  data() {
    return {
      dialog: false
    }
  },
  computed: {
    getInputValue () {
      let rgbColor = this.editor.getAttributes('textStyle').color
      if (rgbColor && !rgbColor.includes('#')) {
        rgbColor = rgbColor.replace('rgb(', '').replace(')', '')
        rgbColor = rgbColor.split(', ')
        return this.rgbToHex(rgbColor[0], rgbColor[1], rgbColor[2])
      } else if (!rgbColor) {
        return '#000000'
      }
      return this.editor.getAttributes('textStyle').color
    }
  },
  methods: {
    setLink() {
      const previousUrl = this.editor.getAttributes('link').href
      const url = window.prompt('URL', previousUrl)

      // cancelled
      if (url === null) {
        return
      }

      // empty
      if (url === '') {
        this.editor
          .chain()
          .focus()
          .extendMarkRange('link')
          .unsetLink()
          .run()

        return
      }

      // update link
      this.editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: url })
        .run()
    },
    setAllTooltips() {
      const toolbarItems = this.getAllToolbarItems()
      toolbarItems.forEach((item) => {
        const name = this.getToolbarItemName(item.id)
        this.setTippyForEl(item.id, name)
      })
    },
    getAllToolbarItems() {
      return document.querySelectorAll('li .toolbar-item')
    },
    getToolbarItemName(itemId) {
      return itemId.replace('toolbar-item-', '').replace('-', ' ')
    },
    setTippyForEl(itemId, content) {
      // Tippy('#' + itemId, {
      //   content
      // })
    },
    rgbToHex(r, g, b) {
      return '#' + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1)
    }
  }
}
</script>

<style scoped lang="scss">
@import '@mdi/font/css/materialdesignicons.css';
.vl {
  border-left: 1px dotted gray;
  white-space: nowrap;
  display: inline;
  margin-right: 12px;
  margin-left: 12px;
  padding-top: 12px;
  padding-bottom: 3px;
}

.tiptap-toolbar {
  ul {
    display: block;
    list-style: none;
    margin: 0;
    padding: 0;

    li {
      display: inline-block;

      div.toolbar-item {
        color: rgba(0, 0, 0, .54);
        display: block;
        line-height: 30px;
        text-decoration: none;
        padding: 6px 5px 0;

        button {
          border-radius: 8px;
          border: none;
          background: transparent;
          &.is-active {
            background: black;
            color: #fff;
          }
        }

      }
    }
  }

  ul li div.toolbar-item:hover {
    background: rgba(102, 102, 102, 0.54);
    border-radius: 25px;
  }

  ul li div.toolbar-item,
  ul li div.toolbar-item:after,
  ul li div.toolbar-item:before {
    -webkit-transition: all 300ms ease-in-out;
    transition: all 300ms ease-in-out;
  }

  .toolbar-item {
    .toolbar-item-icon {
      font-size: 24px;
    }
  }
}

</style>
