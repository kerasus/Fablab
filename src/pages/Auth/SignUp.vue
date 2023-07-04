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
  mounted () {
    this.$store.dispatch('Auth/logOut', { clearRedirectTo: true, redirect: false })
  }
}
</script>

<style lang="scss" scoped>
.login-page {
  height: 100vh;
  display: grid;
}
</style>
