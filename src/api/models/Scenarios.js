import { appApiInstance } from 'src/boot/axios.js'
import APIRepository from '../classes/APIRepository.js'
import { Scenario, ScenarioList } from 'src/models/Scenario'

export default class ScenariosAPI extends APIRepository {
  constructor() {
    super('scenarios', appApiInstance)
    this.APIAdresses = {
      base: '/core/scenarios',
      changeScenarioSteps: (scenarioId) => '/core/scenarios/' + scenarioId + '/steps'
    }
    this.CacheList = {}
    this.restUrl = (id) => this.APIAdresses.base + '/' + id
    /* Setting the callback functions for the CRUD operations. */
    this.setCrudCallbacks({
      get: (response) => { return new Scenario(response.data) },
      post: (response) => { return new Scenario(response.data) },
      put: (response) => { return new Scenario(response.data) },
      delete: (response) => { return response.data }
    })
  }

  index(data) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.base,
      data: this.getNormalizedSendData({
        page: 1 // Number
      }, data),
      resolveCallback: (response) => {
        const paginate = response.data
        const results = response.data.results
        delete paginate.results
        return {
          list: new ScenarioList(results),
          paginate
          // {
          //   "count": 1,
          //   "num_pages": 1,
          //   "per_page": 10,
          //   "current": 1,
          //   "next": null,
          //   "previous": null,
          // }
        }
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  changeScenarioSteps (data) {
    const scenarioId = data.scenario_id
    const steps = data.steps.map(item => {
      return {
        role: item.role, // role id (Number)
        order: item.order // Number
      }
    })

    return this.sendRequest({
      apiMethod: 'put',
      api: this.api,
      request: this.APIAdresses.changeScenarioSteps(scenarioId),
      data: steps,
      resolveCallback: (response) => {
        return response.data
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}
