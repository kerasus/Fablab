import { Model, Collection } from 'js-abstract-model'

class Scenario extends Model {
  constructor(data) {
    super(data, [
      { key: 'id' },
      { key: 'creator' },
      {
        key: 'steps',
        default: []
      },
      {
        key: 'steps_info',
        default: []
      },
      { key: 'level' },
      { key: 'thumbnail' },
      { key: 'slug' },
      { key: 'description' },
      { key: 'creation_time' },
      { key: 'last_modification_time' }
    ])
  }
}

class ScenarioList extends Collection {
  model() {
    return Scenario
  }
}

export { Scenario, ScenarioList }
