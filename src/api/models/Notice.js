import { appApiInstance } from 'src/boot/axios'
import APIRepository from '../classes/APIRepository.js'
import { Notice, NoticeList } from 'src/models/Notice.js'

export default class NoticeAPI extends APIRepository {
  constructor () {
    super('ticket', appApiInstance)
    this.APIAdresses = {
      base: '/mma/notices'
    }
    this.restUrl = (id) => this.url + '/' + id
    /* Setting the callback functions for the CRUD operations. */
    this.setCrudCallbacks({
      get: (response) => { return new Notice(response.data) },
      post: (response) => { return new Notice(response.data) },
      put: (response) => { return new Notice(response.data) },
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
          list: new NoticeList(results),
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
