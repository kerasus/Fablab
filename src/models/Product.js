import { User } from 'src/models/User.js'
import { Collection, Model } from 'js-abstract-model'

class Product extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'category' },
      { key: 'title' },
      { key: 'thumbnail' },
      { key: 'capacity' },
      { key: 'unit_price' },
      { key: 'slug' },
      { key: 'description' },
      {
        key: 'count',
        default: 1
      },
      { key: 'creator' },
      {
        key: 'creator_info',
        relatedModel: User
      },
      { key: 'creation_time' },
      { key: 'last_modification_time' },
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

class ProductList extends Collection {
  model () {
    return Product
  }

  removeZeroCount () {
    this.list = this.list.filter(item => item.count > 0)
  }
}

export { Product, ProductList }
