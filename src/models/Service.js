import { Collection, Model } from 'js-abstract-model'

class Service extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'title' },
      { key: 'slug' },
      { key: 'unit' },
      { key: 'minimum_order' },
      { key: 'unit_price' },
      { key: 'order_verification_required' },
      { key: 'standalone' },
      { key: 'thumbnail' },
      { key: 'description' },
      { key: 'creation_time' },
      { key: 'last_modification_time' },
      { key: 'is_active' },
      { key: 'is_deleted' },
      { key: 'creator' }
    ])
  }
}

class ServiceList extends Collection {
  model () {
    return Service
  }
}

export { Service, ServiceList }
