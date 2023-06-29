import { User } from 'src/models/User.js'
import { Model, Collection } from 'js-abstract-model'

class Event extends Model {
  constructor(data) {
    super(data, [
      { key: 'id' },
      { key: 'creator' },
      {
        key: 'creator_info',
        relatedModel: User
      },
      { key: 'title' },
      { key: 'slug' },
      { key: 'capacity' },
      { key: 'price' },
      { key: 'holding_time' },
      { key: 'holding_time' },
      { key: 'thumbnail' },
      { key: 'description' },
      { key: 'is_current_user_registered' },
      { key: 'address' },
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
