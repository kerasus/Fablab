import { Model, Collection } from 'js-abstract-model'

class Setting extends Model {
  constructor(data) {
    super(data, [
      { key: 'id' },
      { key: 'key' },
      { key: 'value' }
    ])
  }
}

class SettingList extends Collection {
  model() {
    return Setting
  }
}

export { Setting, SettingList }
