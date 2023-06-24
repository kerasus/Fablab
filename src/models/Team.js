import { User, UserList } from 'src/models/User.js'
import { Model, Collection } from 'js-abstract-model'

class Team extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'name' },
      { key: 'thumbnail' },
      { key: 'site_url' },
      { key: 'instagram_url' },
      { key: 'telegram_url' },
      { key: 'bale_url' },
      { key: 'additional_info' },
      { key: 'status' }, // APPROVED - DISAPPROVED - SUSPENDED
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

    if (!this.thumbnail) {
      this.thumbnail = '/img/custom/Mask_group2.png'
    }

    this.statusEnums = [
      {
        label: 'تایید شده',
        value: 'APPROVED'
      },
      {
        label: 'تایید نشده',
        value: 'DISAPPROVED'
      },
      {
        label: 'معلق',
        value: 'SUSPENDED'
      }
    ]

    this.loadStatusInfo()
  }

  loadStatusInfo () {
    const target = this.statusEnums.find(type => type.value === this.status)
    if (!target) {
      this.status_info = {
        label: null,
        value: null
      }
    } else {
      this.status_info = target
    }
  }
}

class TeamList extends Collection {
  model() {
    return Team
  }
}

export { Team, TeamList }
