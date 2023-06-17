import { Collection, Model } from 'js-abstract-model'
import { User } from 'src/models/User.js'

class Payment extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'amount' },
      { key: 'status' },
      { key: 'owner' },
      {
        key: 'owner_info',
        relatedModel: User
      },
      { key: 'creation_time' }
    ])
  }
}

class PaymentList extends Collection {
  model () {
    return Payment
  }
}

export { Payment, PaymentList }
