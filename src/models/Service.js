import { Collection, Model } from 'js-abstract-model'

class Service extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'title' },
      { key: 'slug' },
      { key: 'unit' },
      { key: 'unit_info' },
      { key: 'minimum_order' },
      { key: 'unit_price' },
      { key: 'order_verification_required' },
      { key: 'standalone' },
      { key: 'is_reservation_enabled' },
      { key: 'thumbnail' },
      {
        key: 'count',
        default: 1
      },
      { key: 'description' },
      { key: 'creation_time' },
      { key: 'last_modification_time' },
      { key: 'is_active' },
      { key: 'is_deleted' },
      { key: 'creator' }
    ])

    this.unitEnums = [
      {
        label: 'ساعت',
        value: 'HOUR'
      },
      {
        label: 'ماه',
        value: 'MONTH'
      },
      {
        label: 'گیگ',
        value: 'GIGABYTE'
      }
    ]

    this.loadUnitInfo()
    if (!this.thumbnail) {
      this.thumbnail = '/img/FabLab-logo.png'
    }
  }

  loadUnitInfo () {
    const target = this.unitEnums.find(type => type.value === this.unit)
    if (!target) {
      this.unit_info = null
    } else {
      this.unit_info = target
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

class ServiceList extends Collection {
  model () {
    return Service
  }

  removeZeroCount () {
    this.list = this.list.filter(item => item.count > 0)
  }
}

export { Service, ServiceList }
