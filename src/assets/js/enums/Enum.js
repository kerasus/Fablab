/* It takes a list of keys and creates an object with those keys as properties */
export default class Enum {
  constructor(...keys) {
    keys.forEach((key) => {
      this[key.name] = key.value
    })
    Object.freeze(this)
  }

  getList () {
    return Object.keys(this).map(item => {
      return {
        label: item,
        value: this[item]
      }
    })
  }

  getLabelByValue (value) {
    const list = this.getList()
    const target = list.find(item => item.value === value)
    if (!target) {
      return null
    }

    return target.label
  }

  *[Symbol.iterator]() {
    for (const key of Object.keys(this)) yield key
  }
}
