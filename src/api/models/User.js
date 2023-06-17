import { appApiInstance } from 'src/boot/axios.js'
import { User, UserList } from 'src/models/User.js'
import APIRepository from '../classes/APIRepository.js'

export default class UserAPI extends APIRepository {
  constructor() {
    super('user', appApiInstance)
    this.APIAdresses = {
      base: '/uma/users',
      current: '/uma/users/current',
      setProfilePicture: '/uma/users/set_profile_picture',
      byId: (id) => '/uma/users/' + id,
      changeTeam: (id) => '/uma/users/' + id + '/change_team'
    }
    this.CacheList = {
      base: this.name + this.APIAdresses.base,
      byId: (id) => this.name + this.APIAdresses.byId(id)
    }
    this.restUrl = (id) => this.APIAdresses.byId(id)
    /* Setting the callback functions for the CRUD operations. */
    this.setCrudCallbacks({
      get: (response) => { return new User(response.data) },
      post: (response) => { return new User(response.data) },
      put: (response) => { return new User(response.data) },
      delete: (response) => { return new User(response.data) }
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
          list: new UserList(results),
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

  updateCurrent(data) {
    return this.sendRequest({
      apiMethod: 'put',
      api: this.api,
      request: this.APIAdresses.current,
      data,
      resolveCallback: (response) => {
        return new User(response.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  changeTeam(data) {
    return this.sendRequest({
      apiMethod: 'put',
      api: this.api,
      request: this.APIAdresses.changeTeam(data.userId),
      data: this.getNormalizedSendData({
        team: 1 // Number
      }, data),
      resolveCallback: (response) => {
        return new User(response.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}
