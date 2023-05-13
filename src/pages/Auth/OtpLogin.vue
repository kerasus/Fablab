<template>
  <div class="login-page">
    <otp-login-component />
  </div>
</template>

<script>
import OtpLoginComponent from 'src/components/Auth/OtpLogin.vue'

export default {
  name: 'OtpLogin',
  components: { OtpLoginComponent },
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
