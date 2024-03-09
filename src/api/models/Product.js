import { appApiInstance } from 'src/boot/axios.js'
import APIRepository from '../classes/APIRepository.js'
import { Product, ProductList } from 'src/models/Product.js'

export default class ProductAPI extends APIRepository {
  constructor () {
    super('product', appApiInstance, '/product', Product)
    this.APIAdresses = {
      base: (shopServiceName) => '/' + shopServiceName + '/items'
    }
    this.CacheList = {
      base: (shopServiceName) => this.name + this.APIAdresses.base(shopServiceName)
    }
    this.restUrl = (id) => this.APIAdresses.base + '/' + id
    /* Setting the callback functions for the CRUD operations. */
    this.setCrudCallbacks({
      get: (response) => { return new Product(response.data) },
      post: (response) => { return new Product(response.data) },
      put: (response) => { return new Product(response.data) },
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
        page: 1, // Number
        category: null // Number
      }, data),
      resolveCallback: (response) => {
        const paginate = response.data
        const results = response.data.results
        delete paginate.results
        return {
          list: new ProductList(results),
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
