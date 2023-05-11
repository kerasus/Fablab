import { Model, Collection } from 'js-abstract-model'

class Role extends Model {
  constructor(data) {
    super(data, [
      { key: 'id' },
      { key: 'side' },
      { key: 'thumbnail' },
      { key: 'slug' },
      { key: 'description' },
      { key: 'creation_time' },
      { key: 'last_modification_time' },
      { key: 'is_active' },
      { key: 'is_deleted' },
      { key: 'creator' }
    ])
  }
}

class RoleList extends Collection {
  model() {
    return Role
  }
}

export { Role, RoleList }
