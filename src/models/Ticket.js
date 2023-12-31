import { User } from 'src/models/User.js'
import { Collection, Model } from 'js-abstract-model'
import { TicketCategory } from 'src/models/TicketCategory.js'

class Ticket extends Model {
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
      { key: 'creator' },
      {
        key: 'creator_info',
        relatedModel: User
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
        value: 'OPENED',
        color: '#2FA84A'
      },
      {
        label: 'پاسخ داده شده',
        value: 'ADMIN_REPLIED',
        color: '#0B6AB1'
      },
      {
        label: 'در حال انتظار',
        value: 'PENDING',
        color: '#2FA84A'
      },
      {
        label: 'خوانده نشده',
        value: 'UNREAD',
        color: '#2FA84A'
      },
      {
        label: 'خوانده شده',
        value: 'READ',
        color: '#2FA84A'
      },
      {
        label: 'بسته شده',
        value: 'CLOSED',
        color: '#989898'
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
      this.status_info = {
        label: null,
        value: null,
        color: ''
      }
    } else {
      this.status_info = target
    }
  }
}

class TicketList extends Collection {
  model () {
    return Ticket
  }
}

export { Ticket, TicketList }
