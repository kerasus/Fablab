import { Model, Collection } from 'js-abstract-model'
import { Block } from 'src/models/Block'
import { User } from './User'
import { Media } from 'src/models/Media'

class EventResult extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'event' },
      { key: 'rank' },
      { key: 'enable_report_publish' },
      { key: 'comment' },
      { key: 'created_at' },
      { key: 'updated_at' },
      { key: 'report_file_link' },
      {
        key: 'user',
        relatedModel: User
      },
      {
        key: 'major',
        relatedModel: Media
      },
      {
        key: 'region',
        default: {
          id: null,
          title: ''
        }
      },
      { key: 'event_result_status' }
    ])
  }
}
class EventResultList extends Collection {
  model () {
    return Block
  }
}

export { EventResult, EventResultList }
