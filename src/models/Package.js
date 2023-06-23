import { Collection, Model } from 'js-abstract-model'
import { User } from 'src/models/User.js'

class Package extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'title' },
      { key: 'capacity' },
      { key: 'unit_price' },
      { key: 'thumbnail' },
      { key: 'slug' },
      { key: 'description' },
      { key: 'slug' },
      { key: 'creator' },
      {
        key: 'creator_info',
        relatedModel: User
      },
      { key: 'services_relation' },
      { key: 'services_relation_info' }
    ])

    if (!this.thumbnail) {
      this.thumbnail = '/img/FabLab-logo.png'
    }
  }
}

class PackageList extends Collection {
  model () {
    return Package
  }
}

export { Package, PackageList }
