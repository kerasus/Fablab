import SEO from './Seo'
import Shop from './Shop'
import Auth from './Auth'
import process from 'process'
import Widgets from './Widgets'
import loading from './loading'
import { createStore } from 'vuex'
import AppLayout from './AppLayout'
import Reservation from './Reservation'
import PageBuilder from './PageBuilder'
import { store } from 'quasar/wrappers'
import createPersistedState from 'vuex-persistedstate'

const plugins = []

if (process.browser) {
  const vuexPersistedState =
    createPersistedState({
      key: 'vuex',
      storage: window.localStorage,
      fetchBeforeUse: true,
      paths: [
        'Auth.user',
        'Auth.redirectTo',
        'Auth.accessToken'
      ]
    })

  plugins.push(vuexPersistedState)
}

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */
const debug = false
export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      SEO,
      Auth,
      Shop,
      Widgets,
      loading,
      AppLayout,
      Reservation,
      PageBuilder
    },
    plugins,
    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: debug
  })

  return Store
})
