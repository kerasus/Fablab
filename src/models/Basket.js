import { User } from 'src/models/User.js'
import { Model, Collection } from 'js-abstract-model'
import { RegistrationList } from 'src/models/Registration.js'

class Basket extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'creator' },
      {
        key: 'creator_info',
        relatedModel: User
      },
      { key: 'owner' },
      {
        key: 'owner_info',
        relatedModel: User
      },
      {
        key: 'registrations_info',
        relatedModel: RegistrationList
      },
      { key: 'status' },
      { key: 'amount' },
      { key: 'description' },
      { key: 'creation_time' },
      { key: 'last_modification_time' },
      { key: 'is_active' },
      { key: 'is_deleted' }
    ])

    this.statusEnums = [
      {
        label: 'در حال تأیید',
        value: 'VERIFYING'
      },
      {
        label: 'لغو شد',
        value: 'CANCELED'
      },
      {
        label: 'تأیید نشده',
        value: 'NOT_VERIFIED'
      },
      {
        label: 'درحال پرداخت',
        value: 'PAYING'
      },
      {
        label: 'درحال تایید پرداخت',
        value: 'TRANSACTION_VERIFYING'
      },
      {
        label: 'پرداخت شده',
        value: 'PAID_FULL'
      },
      {
        label: 'درحال پرداخت اقساط',
        value: 'PAYING_IN_INSTALMENT'
      },
      {
        label: 'اقساط پرداخت شده',
        value: 'PAID_IN_INSTALMENT'
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

class BasketList extends Collection {
  model() {
    return Basket
  }
}

export { Basket, BasketList }
