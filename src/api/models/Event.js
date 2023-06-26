import { appApiInstance } from 'src/boot/axios.js'
import APIRepository from '../classes/APIRepository.js'
import { Event, EventList } from 'src/models/Event.js'

export default class EventAPI extends APIRepository {
  constructor() {
    super('event', appApiInstance)
    this.APIAdresses = {
      base: '/core/events',
      byId: (eventId) => '/core/events/' + eventId,
      register: (eventId) => '/core/events/' + eventId + '/register'
    }
    this.CacheList = {
      base: this.name + this.APIAdresses.base
    }
    this.restUrl = (id) => this.APIAdresses.base + '/' + id
    /* Setting the callback functions for the CRUD operations. */
    this.setCrudCallbacks({
      get: (response) => { return new Event(response.data) },
      post: (response) => { return new Event(response.data) },
      put: (response) => { return new Event(response.data) },
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
          list: new EventList(results),
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

  register(eventId) {
    return this.sendRequest({
      apiMethod: 'put',
      api: this.api,
      request: this.APIAdresses.register(eventId),
      resolveCallback: (response) => {
        return new Event(response.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}
