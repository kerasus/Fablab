import { boot } from 'quasar/wrappers'
import { Notify, Cookies } from 'quasar'
import APIInstanceWrapper from 'src/api/classes/APIInstanceWrapper.js'

const appApiServer = process.env.APP_API
const appApiServerTarget = process.env.APP_SERVER

const AxiosHooks = (function () {
  let $notify = null

  function setNotifyInstance ($q) {
    if (!$q.notify) {
      return
    }
    $notify = $q.notify
  }

  function handleErrors (error, router, store) {
    const messages = []
    if (!error || !error.response) {
      return
    }
    const statusCode = parseInt(error.response.status)
    if (statusCode >= 500 && statusCode <= 599) {
      messages.push('مشکلی رخ داده است. مجدد تلاش کنید.')
    } else if (statusCode === 404) {
      messages.push('موردی یافت نشد.')
    } else if (statusCode === 401) {
      const message = error.response.data.message
      messages.push(message)
      deAuthorizeUser(router, store)
    } else if (statusCode === 403) {
      const message = error.response.data.detail
      messages.push(message)
    } else if (error.response.data) {
      for (const key of Object.keys(error.response.data)) {
        if (typeof error.response.data[key] === 'string') {
          messages.push(key + ': ' + error.response.data[key])
        } else if (Array.isArray(error.response.data[key])) {
          error.response.data[key].forEach(message => {
            messages.push(key + ': ' + message)
          })
        }
      }
    }

    toastMessages(messages)
    return Promise.reject(error)
  }

  function deAuthorizeUser (router, store) {
    store.dispatch('Auth/logOut')
    const loginRouteName = 'Login'
    const currentRoute = (router?.currentRoute?._value) ? router.currentRoute._value : (router?.history?.current) ? router.history.current : null
    if (currentRoute && currentRoute.name === loginRouteName) {
      return
    }
    store.commit('Auth/updateRedirectTo', currentRoute)
    router.push({ name: loginRouteName })
  }

  function toastMessages (messages) {
    messages.forEach((item) => {
      if ($notify) {
        $notify({
          type: 'negative',
          color: 'negative',
          message: item,
          icon: 'report_problem'
        })
      } else {
        Notify.create({
          type: 'negative',
          color: 'negative',
          timeout: 5000,
          position: 'top',
          message: item,
          icon: 'report_problem'
        })
      }
    })
  }

  return {
    handleErrors,
    setNotifyInstance
  }
}())

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside the
// "export default () => {}" function below (which runs individually
// for each client)

const appApiInstance = APIInstanceWrapper.createInstance(appApiServer, appApiServerTarget)

export default boot(({ app, store, router, ssrContext }) => {
  const cookies = process.env.SERVER
    ? Cookies.parseSSR(ssrContext)
    : Cookies // otherwise we're on client

  const allCookies = cookies.getAll()
  const accessTokenInCookies = cookies.get('BearerAccessToken') ? cookies.get('BearerAccessToken') : allCookies.BearerAccessToken
  const accessTokenInLocalStorage = store.getters['Auth/accessToken']
  const accessToken = accessTokenInLocalStorage || accessTokenInCookies

  if (accessToken) {
    const tokenType = 'Bearer'
    store.$accessToken = accessToken
    appApiInstance.defaults.headers.common.Authorization = tokenType + ' ' + accessToken
  }

  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API

  AxiosHooks.setNotifyInstance(app.config.globalProperties.$q)

  if (appApiInstance.interceptors) {
    appApiInstance.interceptors.response.use(undefined, async function (error) {
      return await AxiosHooks.handleErrors(error, router, store)
    })
  }

  store.$appApiInstance = appApiInstance
  router.$appApiInstance = appApiInstance

  store.$axios = appApiInstance
  router.$axios = appApiInstance

  app.config.globalProperties.$axios = appApiInstance
})

export { appApiInstance }
