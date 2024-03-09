import { appApiInstance } from 'src/boot/axios.js'
import { Role, RoleList } from 'src/models/Role.js'
import APIRepository from '../classes/APIRepository.js'

export default class RoleAPI extends APIRepository {
  constructor () {
    super('role', appApiInstance)
    this.APIAdresses = {
      base: '/core/roles'
    }
    this.CacheList = {}
    this.restUrl = (id) => this.APIAdresses.base + '/' + id
    /* Setting the callback functions for the CRUD operations. */
    this.setCrudCallbacks({
      get: (response) => { return new Role(response.data) },
      post: (response) => { return new Role(response.data) },
      put: (response) => { return new Role(response.data) },
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
          list: new RoleList(results),
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
