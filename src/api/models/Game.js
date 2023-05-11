import { appApiInstance } from 'src/boot/axios.js'
import APIRepository from '../classes/APIRepository.js'
import { Comment } from 'src/models/Comment'
// import { User } from 'src/models/User'

export default class GameAPI extends APIRepository {
  constructor() {
    super('game', appApiInstance)
    this.APIAdresses = {
      base: '/core/games'
    }
    this.CacheList = {}
    this.restUrl = (id) => this.APIAdresses.base + '/' + id
    /* Setting the callback functions for the CRUD operations. */
    this.setCrudCallbacks({
      get: (response) => { return new Comment(response.data) },
      post: (response) => { return new Comment(response.data) },
      put: (response) => { return new Comment(response.data) },
      delete: (response) => { return response.data }
    })
  }
}
