import { appApiInstance } from 'src/boot/axios.js'
import { Post, PostList } from 'src/models/Post.js'
import APIRepository from '../classes/APIRepository.js'

export default class PostAPI extends APIRepository {
  constructor() {
    super('posts', appApiInstance)
    this.APIAdresses = {
      base: '/cma/posts',
      byId: (id) => '/cma/posts/' + id,
      bySlug: (slug) => '/cma/posts/get_by_slug/' + slug
    }
    this.CacheList = {
      base: this.name + this.APIAdresses.base
    }
    this.restUrl = (id) => this.APIAdresses.base + '/' + id
    /* Setting the callback functions for the CRUD operations. */
    this.setCrudCallbacks({
      get: (response) => { return new Post(response.data) },
      post: (response) => { return new Post(response.data) },
      put: (response) => { return new Post(response.data) },
      delete: (response) => { return response.data }
    })
  }

  index(data) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.base,
      data: this.getNormalizedSendData({
        category: null, // Number
        category__parent: null, // Number
        category__parent__parent: null, // Number
        per_page: 10, // Number
        page: 1 // Number
      }, data),
      resolveCallback: (response) => {
        const paginate = response.data
        const results = response.data.results
        delete paginate.results
        return {
          list: new PostList(results),
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

  get(id) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.byId(id),
      resolveCallback: (response) => {
        return new Post(response.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  getBySlug(slug) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.bySlug(slug),
      resolveCallback: (response) => {
        return new Post(response.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}
