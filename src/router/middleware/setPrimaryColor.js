// import { setCssVar } from 'quasar'
// import { dom } from 'quasar'
export default function setPrimaryColor ({ next, store, to }) {
  console.log(store)
  console.log(next)
  console.log(to)
  console.log(window.document.documentElement)
  console.log(this)
  console.log(this.documentElement)
  console.log(this.$documentElement)
  // const { css } = dom
  // // Apply a list of CSS properties to a DomNode
  // css(DomElement, {
  //   primary: '#D83527'
  // })
  // import '../../../src/css/fabcafeCustomVariables.scss'
  // setCssVar('primary', '#1976d2')
  window.document.documentElement.style.setProperty('--q-primary', '#D83527')
  return next()
}
