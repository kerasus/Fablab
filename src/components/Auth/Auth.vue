<template>
  <div class="login-card"
       :class="{defaultLoginCard: defaultLayout}">
    <div v-if="!userLogin">
      <div v-if="loading"
           class="text-center login-loading">
        <q-spinner-ball color="primary"
                        size="5em" />
      </div>
      <div v-else>
        <router-link v-if="defaultLayout"
                     :to="{name: 'Public.Home'}"
                     class="header">
          فب لب
        </router-link>
        <div v-if="defaultLayout"
             class="sub-header">
          ورود
        </div>
        <div class="phone-number">
          <q-input ref="userName"
                   v-model="username"
                   bottom-slots
                   hide-bottom-space
                   autocomplete="off"
                   label="شماره موبایل"
                   onfocus="this.removeAttribute('readonly');"
                   name="userName"
                   placeholder=" - - - - - - - - - 09"
                   @keydown.enter="getEnter('pass')" />
        </div>
        <div class="national-code">
          <q-input ref="pass"
                   v-model="password"
                   name="pass"
                   label="کلمه عبور"
                   hide-bottom-space
                   type="password"
                   @keydown.enter="login" />
        </div>
        <q-btn class="full-width login-btn"
               :class="{'bg-green-6': !defaultLayout}"
               unelevated
               color="primary"
               label="ورود"
               @click="login" />
        <div class="regiser-link-section q-mt-md">
          حساب کاربری ندارید؟
          <router-link :to="{name: 'SignUp'}"
                       class="text-red cursor-pointer">
            ثبت نام
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mixinAuth } from 'src/mixin/Mixins'
export default {
  name: 'AuthLogin',
  mixins: [mixinAuth],
  props: {
    redirect: {
      type: Object,
      default: null
    },
    defaultLayout: {
      default: true,
      type: Boolean
    }
  },
  data () {
    return {
      userLogin: false,
      loading: true,
      username: null,
      password: null
    }
  },
  mounted () {
    this.loading = false
    this.$store.dispatch('Auth/logOut', { clearRedirectTo: true, redirect: false })
  },
  methods: {
    getToken () {
      return this.$store.getters['Auth/accessToken']
    },
    getEnter (targetRefKey) {
      this.$refs[targetRefKey].focus()
    },
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
    handleErr (err) {
      this.loading = false
      const messages = []
      for (const key in err.data.errors) {
        err.data.errors[key].forEach(message => {
          this.$q.notify({
            type: 'negative',
            message,
            position: 'top'
          })
        })
      }
      if (!err.data.errors) {
        if (err.data.message) messages.push(err.data.message)
        else messages.push(err.statusText)
        this.$q.notify({
          type: 'negative',
          message: messages,
          position: 'top'
        })
      }
    },
    login () {
      this.loading = true
      this.$store.dispatch('Auth/login', {
        mobile_number: this.username,
        password: this.password
      })
        .then(() => {
          this.loading = false
          this.$store.commit('AppLayout/updateLoginDialog', false)
          this.redirectTo()
        })
        .catch(err => {
          this.handleErr(err.response)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.defaultLoginCard{
  width: 434px;
  height: 485px;
}
.login-card {
  box-shadow: 2px -4px 10px rgba(255, 255, 255, 0.6), -2px 4px 10px rgba(112, 108, 162, 0.05);
  background: #fff;
  margin: auto;
  border-radius: 20px;
  padding:60px 67px;
  .login-loading {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .header{
    display: block;
    text-align: center;
    margin-bottom: 50px;
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 37px;
    letter-spacing: -0.03em;
    color: var(--alaa-TextSecondary);
  }
  .sub-header{
    text-align: left;
    margin-bottom: 5px;
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 37px;
    letter-spacing: -0.03em;
    color: var(--alaa-TextSecondary);
  }
  .label{
    font-weight: 400;
    font-size: 16px;
    line-height: 25px;
    letter-spacing: -0.03em;
    color: #434765;
    margin-bottom: 8px;
  }
  .login-btn{
    :deep(.q-btn__content){
      font-weight: 600;
      font-size: 14px;
      line-height: 22px;
    }
  }
  .phone-number{
    margin-bottom: 16px;
  }
  .national-code{
    margin-bottom: 56px;
  }
  :deep(.q-field--focused) {
    appearance: none;
  }
  &:deep(.q-field--focused .q-field__control) {
    background-color: rgba(255,255,255,0) !important;
    appearance: none;
    border: 1px solid #FFB74D;
    box-shadow: 0 0 0 2px #FFEDD2;
    border-radius: 8px;
  }

  &:deep(.q-field .q-field__control) {
    height: 40px;
    background: #F2F5F9;
    border-radius: 8px;
    padding-left: 0;
  }

  &:deep(.q-field__native) {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    color: #6D708B !important;
  }
  :deep(.q-field__native, .q-field__prefix, .q-field__suffix, .q-field__input){
    padding: 8px 16px;
    border-radius: 8px
  }

  :deep(.q-field__control){
    &::after{
      height: 0;
    }
    &::before{
      border-bottom: none;
    }
  }
}
@media only screen and (max-width: 1023px){
  .default-login-card {
    width: 312px;
    height: 409px;
    border-radius: 16px;
    padding: 40px 30px;

    .header {
      margin-bottom: 30px;
      font-size: 20px;
      line-height: 31px;
    }

    .label {
      font-size: 14px;
      line-height: 22px;
      letter-spacing: -0.03em;
    }
  }
}
</style>
