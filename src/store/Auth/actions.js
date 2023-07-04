import { Cookies } from 'quasar'
import { APIGateway } from 'src/api/APIGateway.js'

export function otpLogin (context, data) {
  return APIGateway.auth.loginByOtp(data)
    .then((authData) => {
      const accessToken = authData.access_token
      const ca = accessToken,
        base64Url = ca.split('.')[1],
        user = JSON.parse(window.atob(base64Url))
      context.commit('updateUser', user)

      context.commit('updateAccessToken', accessToken)
      Cookies.set('BearerAccessToken', accessToken)
      const tokenType = 'Bearer'
      this.$accessToken = accessToken
      this.$axios.defaults.headers.common.Authorization = tokenType + ' ' + accessToken
    })
}

export function login (context, data) {
  return APIGateway.auth.loginByPassword(data)
    .then((authData) => {
      const accessToken = authData.access_token
      const ca = accessToken,
        base64Url = ca.split('.')[1],
        user = JSON.parse(window.atob(base64Url))
      context.commit('updateUser', user)
      context.commit('updateAccessToken', accessToken)
      Cookies.set('BearerAccessToken', accessToken)
      const tokenType = 'Bearer'
      this.$accessToken = accessToken
      this.$axios.defaults.headers.common.Authorization = tokenType + ' ' + accessToken
      APIGateway.user.getCurrent(data)
        .then((user) => {
          context.commit('updateUser', user)
        })
    })
}

export function signUpByOtpAndPassword (context, data) {
  return APIGateway.auth.signUpByOtpAndPassword(data)
    .then((authData) => {
      const accessToken = authData.access_token
      const ca = accessToken,
        base64Url = ca.split('.')[1],
        user = JSON.parse(window.atob(base64Url))
      context.commit('updateUser', user)
      context.commit('updateAccessToken', accessToken)
      Cookies.set('BearerAccessToken', accessToken)
      const tokenType = 'Bearer'
      this.$accessToken = accessToken
      this.$axios.defaults.headers.common.Authorization = tokenType + ' ' + accessToken
      APIGateway.user.getCurrent(data)
        .then((user) => {
          context.commit('updateUser', user)
        })
    })
}

export function logOut (context, payload) {
  const clearRedirectTo = (typeof payload === 'undefined' || typeof payload.clearRedirectTo === 'undefined') ? true : payload.clearRedirectTo
  const redirect = (typeof payload === 'undefined' || typeof payload.redirect === 'undefined') ? true : payload.redirect
  context.commit('updateAccessToken', null)
  context.commit('updateUser', null)
  this.$axios.defaults.headers.common.Authorization = null
  Cookies.set('BearerAccessToken', '')
  if (clearRedirectTo) {
    context.commit('updateRedirectTo', null)
  }
  if (redirect === true) {
    this.$router.push({ name: 'Login' })
  }
}
