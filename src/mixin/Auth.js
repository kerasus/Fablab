import { User } from 'src/models/User.js'
import API_ADDRESS from 'src/api/Addresses'

const mixinAuth = {
  data () {
    return {
      user: new User(),
      isUserLogin: false
    }
  },
  mounted () {
    this.loadAuthData()
  },
  methods: {
    loadAuthData () { // prevent Hydration node mismatch
      this.user = this.$store.getters['Auth/user']
      this.isUserLogin = this.$store.getters['Auth/isUserLogin']
    },
    async getUserData () {
      this.$axios.get(API_ADDRESS.user.show_user)
        .then((response) => {
          this.$store.commit('Auth/updateUser', response.data.data)
        })
    }
  }
}

export default mixinAuth
