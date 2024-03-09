import { appApiInstance } from 'src/boot/axios.js'
import APIRepository from '../classes/APIRepository.js'
import { Setting, SettingList } from 'src/models/Setting.js'

export default class SettingAPI extends APIRepository {
  constructor () {
    super('setting', appApiInstance)
    this.APIAdresses = {
      base: '/cma/settings'
    }
    this.CacheList = {}
    this.restUrl = (id) => this.APIAdresses.base + '/' + id
    /* Setting the callback functions for the CRUD operations. */
    this.setCrudCallbacks({
      get: (response) => { return new Setting(response.data) },
      post: (response) => { return new Setting(response.data) },
      put: (response) => { return new Setting(response.data) },
      delete: (response) => { return response.data }
    })
  }

  index (data) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.base,
      data: this.getNormalizedSendData({
        page: 1, // Number
        search: null // Number
      }, data),
      resolveCallback: (response) => {
        const paginate = response.data
        delete paginate.results
        return {
          list: new SettingList(response.data.results),
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

  register (data) {
    const keys = [
      'level', // String
      'slug', // String
      'description', // String
      'holding_time', // DateTime
      'address', // String
      'minimum_order_amount', // Number
      'entrance_amount', // Number
      'moderator', // Number
      'scenario', // Number
      'thumbnail' // File
    ]
    const formData = new FormData()
    keys.forEach(key => {
      formData.append(key, data[key])
    })
    return this.sendRequest({
      apiMethod: 'put',
      api: this.api,
      request: this.APIAdresses.register(data.event_id),
      data: formData,
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
