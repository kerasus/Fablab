import { appApiInstance } from 'src/boot/axios.js'
import APIRepository from '../classes/APIRepository.js'
import { Registration, RegistrationList } from 'src/models/Registration.js'

export default class RegistrationAPI extends APIRepository {
  constructor () {
    super('registration', appApiInstance, 'registration', Registration)
    this.APIAdresses = {
      base: (shopServiceName) => '/' + shopServiceName + '/baskets',
      addToBasket: (shopServiceName) => '/' + shopServiceName + '/registrations',
      decrement: (shopServiceName) => '/' + shopServiceName + '/registrations/decrement',
      removeFromBasket: (shopServiceName, registrationId) => '/' + shopServiceName + '/registrations/' + registrationId,
      pay: (shopServiceName, id) => '/' + shopServiceName + '/baskets/' + id + '/pay'
    }
    this.restUrl = (id) => this.APIAdresses.base + '/' + id
    /* Setting the callback functions for the CRUD operations. */
    this.setCrudCallbacks({
      get: (response) => { return new Registration(response.data) },
      post: (response) => { return new Registration(response.data) },
      put: (response) => { return new Registration(response.data) },
      delete: (response) => { return response.data }
    })
  }

  index (data) {
    const shopServiceName = data.shopServiceName
    delete data.shopServiceName
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.base(shopServiceName),
      data: this.getNormalizedSendData({
        page: 1 // Number
      }, data),
      resolveCallback: (response) => {
        const paginate = response.data
        const results = response.data.results
        delete paginate.results
        return {
          list: new RegistrationList(results),
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

  addToBasket (data) {
    const shopServiceName = data.shopServiceName
    delete data.shopServiceName
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.addToBasket(shopServiceName),
      data: this.getNormalizedSendData({
        item: null, // Number ,  item id
        count: 1 // Number
      }, data),
      resolveCallback: (response) => {
        return new Registration(response.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  decrement (data) {
    const shopServiceName = data.shopServiceName
    delete data.shopServiceName
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.decrement(shopServiceName),
      data: this.getNormalizedSendData({
        item: null // Number ,  item id
      }, data),
      resolveCallback: (response) => {
        return new Registration(response.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  removeFromBasket (data) {
    const shopServiceName = data.shopServiceName
    const registrationId = data.registrationId
    delete data.shopServiceName
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.removeFromBasket(shopServiceName, registrationId),
      data: this.getNormalizedSendData({
        count: 1 // Number
      }, data),
      resolveCallback: (response) => {
        return new Registration(response.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}
