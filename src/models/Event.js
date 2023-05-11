import { Model, Collection } from 'js-abstract-model'
import { User } from 'src/models/User.js'
import { Scenario } from 'src/models/Scenario.js'

class Event extends Model {
  constructor(data) {
    super(data, [
      { key: 'id' },
      { key: 'moderator' },
      {
        key: 'moderator_info',
        relatedModel: User
      },
      { key: 'scenario' },
      {
        key: 'scenario_info',
        relatedModel: Scenario
      },
      { key: 'registrations_info' },
      { key: 'holding_time' },
      { key: 'thumbnail' },
      { key: 'slug' },
      { key: 'description' },
      { key: 'address' },
      {
        key: 'minimum_order_amount',
        default: 0
      },
      {
        key: 'entrance_amount',
        default: 0
      },
      {
        key: 'cancelled_by',
        relatedModel: User
      },
      { key: 'creation_time' },
      { key: 'last_modification_time' }
    ])

    if (!this.thumbnail) {
      this.thumbnail = 'https://cdn-download1.zula.ir/sitecdn/IR/blob/sitecms/20230319113059/afzayesh1080.png'
    }
  }
}

class EventList extends Collection {
  model() {
    return Event
  }
}

export { Event, EventList }
