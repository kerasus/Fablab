import { Collection, Model } from 'js-abstract-model'

class ProductCategory extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'title' },
      { key: 'thumbnail' },
      { key: 'creator' },
      { key: 'is_active' },
      { key: 'is_deleted' }
    ])

    if (!this.thumbnail) {
      this.thumbnail = '/img/FabLab-logo.png'
    }
  }

  addCount () {
    this.count++
  }

  reduceCount () {
    if (this.count === 0) {
      return
    }

    this.count--
  }
}

class ProductCategoryList extends Collection {
  model () {
    return ProductCategory
  }

  removeZeroCount () {
    this.list = this.list.filter(item => item.count > 0)
  }
}

export { ProductCategory, ProductCategoryList }
