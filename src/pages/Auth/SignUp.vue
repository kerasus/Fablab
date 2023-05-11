<template>
  <div class="login-page">
    <sign-up-component />
  </div>
</template>

<script>
import SignUpComponent from 'src/components/Auth/SignUp.vue'

export default {
  name: 'SignUp',
  components: { SignUpComponent },
  computed: {
    isUserLogin () {
      return this.$store.getters['Auth/isUserLogin']
    }
  },
  mounted () {
    this.handleAuthenticatedUser()
  },
  methods: {
    redirectTo () {
      let redirectTo = this.$store.getters['Auth/redirectTo']
      debugger
      if (this.redirect) {
        redirectTo = this.redirect
      }
      if (redirectTo === null || typeof redirectTo !== 'object') {
        redirectTo = { name: 'Public.Home' }
      }
      this.$router.push(redirectTo)
      this.$store.commit('Auth/updateRedirectTo', null)
    },
    handleAuthenticatedUser () {
      // ToDo: must check this if
      // if (this.isUserLogin) {
      //   // this.$router.push({ name: 'Public.Home' })
      //   this.redirectTo()
      // }
      // this.$store.dispatch('Auth/logOut', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.login-page {
  height: 100vh;
  display: grid;
}
</style>
