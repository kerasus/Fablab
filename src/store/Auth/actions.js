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
  return APIGateway.auth.login(data)
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

export function logOut (context, clearRedirectTo = true) {
  context.commit('updateAccessToken', null)
  context.commit('updateUser', null)
  Cookies.set('BearerAccessToken', '')
  if (clearRedirectTo) {
    context.commit('updateRedirectTo', null)
  }
  this.$router.push({ name: 'OtpLogin' })
}
