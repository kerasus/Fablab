import { Node } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import TiptapInteractiveInsertScript from './TiptapInteractiveInsertScript.vue'

export default Node.create({
  name: 'TiptapInteractiveInsertScript',

  group: 'block',

  content: 'inline*',


  // group: 'inline',

  // atom: true,
  // inline: true,
  //
  // draggable: true,

  addAttributes() {
    return {
      data: {
        default: null
      },
      // ['data-data']: {
      //   default: null
      // },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'div.barehtml',
        getAttrs: (element) => {
          // https://tiptap.dev/docs/editor/guide/custom-extensions#using-get-attrs
          // Get a specific attribute
          element.getAttribute('data')
        },
        // getAttrs: (element) => element.getAttribute('class') === 'barehtml'
      }
    ]
  },

  renderHTML(data) {
    // if (data.HTMLAttributes.data) {
    //   return ['div', { class: 'barehtml', data: data.HTMLAttributes.data }]
    // }
    const innerHTML = data.HTMLAttributes.data ? data.HTMLAttributes.data : ''
    return ['div', { class: 'barehtml', data: innerHTML }]
    // return ['div', { class: 'barehtml'}, innerHTML]
  },

  addNodeView() {
    return VueNodeViewRenderer(TiptapInteractiveInsertScript)
  }
})
