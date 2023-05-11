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
        delete paginate.results
        return {
          list: new ScenarioList(response.data.results),
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
    return this.sendRequest({
      apiMethod: 'put',
      api: this.api,
      request: this.APIAdresses.changeScenarioSteps(data.scenario_id),
      data: this.getNormalizedSendData({
        role: '', // role id (Number)
        order: '' // Number
      }, data),
      resolveCallback: (response) => {
        const user = response.data.data.user
        const accessToken = response.data.data.access_token
        // const user = new User(response.data.data.user)

        return { accessToken, user }
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}
