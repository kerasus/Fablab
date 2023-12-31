import { appApiInstance } from 'src/boot/axios.js'
import APIRepository from '../classes/APIRepository.js'
import { Basket, BasketList } from 'src/models/Basket.js'

export default class BasketAPI extends APIRepository {
  constructor() {
    super('basket', appApiInstance, 'basket', Basket)
    this.APIAdresses = {
      base: (shopServiceName) => '/' + shopServiceName + '/baskets',
      checkoutReview: (shopServiceName) => '/' + shopServiceName + '/baskets/checkout_review',
      pay: (shopServiceName, id) => '/' + shopServiceName + '/baskets/' + id + '/pay'
    }
    this.restUrl = (id) => this.APIAdresses.base + '/' + id
    /* Setting the callback functions for the CRUD operations. */
    this.setCrudCallbacks({
      get: (response) => { return new Basket(response.data) },
      post: (response) => { return new Basket(response.data) },
      put: (response) => { return new Basket(response.data) },
      delete: (response) => { return response.data }
    })
  }

  index(data) {
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
          list: new BasketList(results),
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

  checkoutReview(shopServiceName) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.checkoutReview(shopServiceName),
      resolveCallback: (response) => {
        return new Basket(response.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}
