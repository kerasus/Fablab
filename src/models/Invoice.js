import { User } from 'src/models/User.js'
import { Model, Collection } from 'js-abstract-model'

class Invoice extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'amount' },
      { key: 'description' },
      { key: 'status' }, // PAYING ...
      { key: 'additional_data' },
      { key: 'creation_time' },
      { key: 'last_modification_time' },
      { key: 'is_active' },
      { key: 'is_deleted' },
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
  }
}

class InvoiceList extends Collection {
  model() {
    return Invoice
  }
}

export { Invoice, InvoiceList }
