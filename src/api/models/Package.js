import { appApiInstance } from 'src/boot/axios.js'
import APIRepository from '../classes/APIRepository.js'
import { Package, PackageList } from 'src/models/Package.js'

export default class PackageAPI extends APIRepository {
  constructor() {
    super('package', appApiInstance)
    this.APIAdresses = {
      base: '/core/packages',
      assignService: (id) => '/core/packages/' + id + '/assign'
    }
    this.CacheList = {
      base: this.name + this.APIAdresses.base
    }
    this.restUrl = (id) => this.APIAdresses.base + '/' + id
    /* Setting the callback functions for the CRUD operations. */
    this.setCrudCallbacks({
      get: (response) => { return new Package(response.data) },
      post: (response) => { return new Package(response.data) },
      put: (response) => { return new Package(response.data) },
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
          list: new PackageList(results),
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

  assignService(data) {
    return this.sendRequest({
      apiMethod: 'put',
      api: this.api,
      request: this.APIAdresses.assignService(data.id),
      data: data.services,
      resolveCallback: (response) => {
        return new Package(response.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}
