import APIRepository from '../classes/APIRepository'
import { appApiInstance } from 'src/boot/axios'
import { Invoice, InvoiceList } from 'src/models/Invoice.js'

export default class InvoiceAPI extends APIRepository {
  constructor() {
    super('invoice', appApiInstance)
    this.APIAdresses = {
      base: '/accounting/invoices',
      pay: (id) => '/accounting/invoices/' + id + '/pay'
    }
    this.CacheList = {
      base: this.name + this.APIAdresses.base
    }
    this.restUrl = (id) => this.APIAdresses.base + '/' + id
    /* Setting the callback functions for the CRUD operations. */
    this.setCrudCallbacks({
      get: (response) => { return new Invoice(response.data) },
      post: (response) => { return new Invoice(response.data) },
      put: (response) => { return new Invoice(response.data) },
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
          list: new InvoiceList(results),
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

  pay(invoiceId) {
    return this.sendRequest({
      apiMethod: 'put',
      api: this.api,
      request: this.APIAdresses.pay(invoiceId),
      resolveCallback: (response) => {
        return response.data.url // String -> redirect url // thankyou
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}
