import { User, UserList } from 'src/models/User.js'
import { Model, Collection } from 'js-abstract-model'

class Team extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'name' },
      { key: 'site_url' },
      { key: 'instagram_url' },
      { key: 'telegram_url' },
      { key: 'bale_url' },
      { key: 'additional_info' },
      { key: 'status' }, // APPROVED ...
      { key: 'picture' },
      { key: 'creation_time' },
      { key: 'last_modification_time' },
      { key: 'is_active' },
      { key: 'is_deleted' },
      {
        key: 'members_info',
        relatedModel: UserList
      },
      { key: 'creator' },
      {
        key: 'creator_info',
        relatedModel: User
      },
      { key: 'leader' },
      {
        key: 'leader_info',
        relatedModel: User
      }
    ])
    if (!this.picture) {
      this.picture = '/img/default-avatar.png'
    }
  }
}

class TeamList extends Collection {
  model() {
    return Team
  }
}

export { Team, TeamList }
