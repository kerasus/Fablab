import { appApiInstance } from 'src/boot/axios.js'
import APIRepository from '../classes/APIRepository.js'
// import { User } from 'src/models/User'

export default class AuthAPI extends APIRepository {
  constructor() {
    super('auth', appApiInstance)
    this.APIAdresses = {
      login: '/auth/login',
      signUp: '/auth/sign-up',
      refreshToken: '/auth/refresh-token',
      sendOtp: '/auth/send-otp',
      changePass: '/auth/change-pass'
    }
    this.CacheList = {}
  }

  loginByPassword (data) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.login,
      data: this.getNormalizedSendData({
        mobile_number: '', // String
        password: '' // String
      }, data),
      resolveCallback: (response) => {
        const token = response.data.token

        const accessToken = token.access_token
        const expiresIn = token.expires_in
        const refreshToken = token.refresh_token
        // const user = new User(response.data.data.user)

        return { access_token: accessToken, expires_in: expiresIn, refresh_token: refreshToken }
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  loginByOtp (data) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.login,
      data: this.getNormalizedSendData({
        mobile_number: '', // String
        otp: '' // String
      }, data),
      resolveCallback: (response) => {
        const token = response.data.token

        const accessToken = token.access_token
        const expiresIn = token.expires_in
        const refreshToken = token.refresh_token
        // const user = new User(response.data.data.user)

        return { access_token: accessToken, expires_in: expiresIn, refresh_token: refreshToken }
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  signUp (data) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.signUp,
      data: this.getNormalizedSendData({
        mobile_number: '', // String
        otp: '' // String
      }, data),
      resolveCallback: (response) => {
        const token = response.data.token

        const accessToken = token.access_token
        const expiresIn = token.expires_in
        const refreshToken = token.refresh_token
        // const user = new User(response.data.data.user)

        return { access_token: accessToken, expires_in: expiresIn, refresh_token: refreshToken }
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  refreshToken (data) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.refreshToken,
      data: this.getNormalizedSendData({
        access_token: '', // String
        expires_in: '', // String
        refresh_token: '' // String
      }, data),
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

  sendOtp (data) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.sendOtp,
      data: this.getNormalizedSendData({
        mobile_number: '' // String
      }, data),
      resolveCallback: (response) => {
        const message = response.data.message

        return message // String
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  changePass (data) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.sendOtp,
      data: this.getNormalizedSendData({
        new_password: '' // String
      }, data),
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
