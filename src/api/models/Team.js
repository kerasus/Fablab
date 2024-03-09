import { appApiInstance } from 'src/boot/axios.js'
import { Team, TeamList } from 'src/models/Team.js'
import APIRepository from '../classes/APIRepository.js'

export default class TeamAPI extends APIRepository {
  constructor () {
    super('team', appApiInstance)
    this.APIAdresses = {
      base: '/uma/teams',
      pay: (id) => '/accounting/invoices/' + id + '/pay'
    }
    this.CacheList = {
      base: this.name + this.APIAdresses.base
    }
    this.restUrl = (id) => this.APIAdresses.base + '/' + id
    /* Setting the callback functions for the CRUD operations. */
    this.setCrudCallbacks({
      get: (response) => { return new Team(response.data) },
      post: (response) => { return new Team(response.data) },
      put: (response) => { return new Team(response.data) },
      delete: (response) => { return response.data }
    })
  }

  index (data) {
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
          list: new TeamList(results),
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
}
