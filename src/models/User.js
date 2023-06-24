/* eslint-disable camelcase,prefer-const */
import { Model, Collection } from 'js-abstract-model'
import { Team } from 'src/models/Team'

class User extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'user_id' },
      { key: 'firstname' },
      { key: 'lastname' },
      { key: 'father_name' },
      { key: 'national_code' },
      { key: 'birthdate' },
      { key: 'picture' },
      { key: 'gender' },
      { key: 'mobile_number' },
      { key: 'mobile_number_verified' },
      { key: 'phone_number' },
      { key: 'phone_number_verified' },
      { key: 'address' },
      { key: 'address_info' },
      { key: 'roles' },
      { key: 'team' },
      { key: 'team_info' },
      { key: 'is_locked_out' },
      { key: 'failed_login_attempts' },
      { key: 'lockout_end_date' },
      { key: 'is_active' },
      { key: 'is_deleted' },
      { key: 'creation_time' },
      { key: 'last_modification_time' }
    ])

    this.totalRoles = [
      { value: 'superuser', label: 'مدیر کل' },
      { value: 'admin', label: 'مدیر' },
      { value: 'meetings_admin', label: 'مدیر جلسات' },
      { value: 'users_admin', label: 'مدیر کاربران' },
      { value: 'contents_admin', label: 'مدیر محتوا' },
      { value: 'unapproved_moballegh', label: 'مبلغ تایید نشده' },
      { value: 'moballegh', label: 'مبلغ' },
      { value: 'sokhanran', label: 'سخنران' },
      { value: 'madah', label: 'مداح' },
      { value: 'bani', label: 'میزبان' },
      { value: 'user', label: 'کاربر' },
      { value: 'anonymous', label: 'کاربر ناشناس' }
    ]

    if (!this.id) {
      this.id = this.user_id
    }
    if (!this.picture) {
      this.picture = '/img/custom/Mask_group2.png'
    }
  }

  getTeam () {
    return new Team(this.team_info)
  }

  hasRole (role) {
    return this.roles.includes(role)
  }

  isSuperuser () {
    return this.hasRole('superuser')
  }
}

class UserList extends Collection {
  model() {
    return User
  }
}

export { User, UserList }
