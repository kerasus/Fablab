import { User } from 'src/models/User.js'
import { Collection, Model } from 'js-abstract-model'
import { TicketCategory } from 'src/models/TicketCategory.js'

class Notice extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'title' },
      { key: 'body' }, //
      { key: 'priority' }, // HIGH - ...
      { key: 'status' }, // ADMIN_REPLIED - ...
      { key: 'category' },
      {
        key: 'category_info',
        relatedModel: TicketCategory
      },
      { key: 'owner' },
      {
        key: 'owner_info',
        relatedModel: User
      }
    ])

    this.priorityEnums = [
      {
        label: 'بالا',
        value: 'HIGH'
      }
    ]

    this.statusEnums = [
      {
        label: 'باز شده',
        value: 'OPENED'
      },
      {
        label: 'پاسخ داده شده',
        value: 'ADMIN_REPLIED'
      },
      {
        label: 'در حال انتظار',
        value: 'PENDING'
      },
      {
        label: 'خوانده نشده',
        value: 'UNREAD'
      },
      {
        label: 'خوانده شده',
        value: 'READ'
      },
      {
        label: 'بسته شده',
        value: 'CLOSED'
      }
    ]

    this.loadStatusInfo()
    this.loadPriorityInfo()
  }

  loadPriorityInfo () {
    const target = this.priorityEnums.find(type => type.value === this.priority)
    if (!target) {
      this.priority_info = null
    } else {
      this.priority_info = target
    }
  }

  loadStatusInfo () {
    const target = this.statusEnums.find(type => type.value === this.status)
    if (!target) {
      this.status_info = null
    } else {
      this.status_info = target
    }
  }
}

class NoticeList extends Collection {
  model () {
    return Notice
  }
}

export { Notice, NoticeList }
