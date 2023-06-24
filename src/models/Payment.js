import { Collection, Model } from 'js-abstract-model'
import { User } from 'src/models/User.js'

class Payment extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'amount' },
      { key: 'status' },
      { key: 'type' },
      { key: 'owner' },
      {
        key: 'owner_info',
        relatedModel: User
      },
      { key: 'creation_time' }
    ])

    this.typeEnums = [
      {
        label: 'برداشت',
        value: 'WITHDRAW'
      },
      {
        label: 'واریز',
        value: 'DEPOSIT'
      }
    ]

    this.loadTypeInfo()
  }

  loadTypeInfo () {
    const target = this.typeEnums.find(type => type.value === this.type)
    if (!target) {
      this.type_info = {
        label: null,
        value: null
      }
    } else {
      this.type_info = target
    }
  }
}

class PaymentList extends Collection {
  model () {
    return Payment
  }
}

export { Payment, PaymentList }
