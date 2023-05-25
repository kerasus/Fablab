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
        <div v-if="defaultLayout"
             class="header">
          <router-link :to="{name: 'Public.Home'}">
            وافیا
          </router-link>
        </div>

        <q-tab-panels v-model="step"
                      animated>
          <q-tab-panel name="input-mobile">
            <div v-if="defaultLayout"
                 class="sub-header">
              ورود
            </div>
            <div class="phone-number">
              <q-input ref="userName"
                       v-model="mobileNumber"
                       bottom-slots
                       hide-bottom-space
                       autocomplete="off"
                       label="شماره موبایل"
                       onfocus="this.removeAttribute('readonly');"
                       name="userName"
                       placeholder=" - - - - - - - - - 09"
                       @keydown.enter="sendOtp" />
            </div>
            <q-btn class="full-width login-btn"
                   :class="{'bg-green-6': !defaultLayout}"
                   unelevated
                   :loading="sendOtpLoading"
                   color="primary"
                   label="ارسال کد تایید"
                   @click="sendOtp" />
            <!--            <div class="regiser-link-section q-mt-md">-->
            <!--              حساب کاربری دارید؟-->
            <!--              <router-link :to="{name: 'login'}"-->
            <!--                           class="text-red">-->
            <!--                ورود-->
            <!--              </router-link>-->
            <!--            </div>-->
          </q-tab-panel>
          <q-tab-panel name="input-verify-code">
            <div class="titel q-mb-md">
              کد ۵ رقمی ارسال شده به شماره
              {{ mobileNumber }}
              را وارد کنید:
            </div>
            <div class="otp-input q-mb-md"
                 dir="ltr">
              <v-otp-input ref="otpInput"
                           v-model:value="otp"
                           input-classes="landing-otp-input"
                           separator=""
                           :num-inputs="5"
                           :should-auto-focus="true"
                           input-type="letter-numeric"
                           :conditionalClass="['one', 'two', 'three', 'four','five']"
                           :placeholder="[]"
                           @on-complete="handleOnCompleteOtp" />
            </div>
            <div class="timer text-center">
              {{ timer }}
            </div>
            <q-btn class="full-width login-btn"
                   :class="{'bg-green-6': !defaultLayout}"
                   unelevated
                   :loading="loginLoading"
                   color="primary"
                   label="تایید"
                   @click="otpLogin" />
            <div class="regiser-link-section q-mt-md">
              شماره موبایل اشتباه است؟
              <q-btn flat
                     class="text-red"
                     @click="goToInputMobileStep">
                تغییر شماره همراه
              </q-btn>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
  </div>
</template>

<script>
import VOtpInput from 'vue3-otp-input'
import { mixinAuth } from 'src/mixin/Mixins'
import { APIGateway } from 'src/api/APIGateway'

export default {
  name: 'Login',
  components: {
    VOtpInput
  },
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
  data: () => ({
    step: 'input-mobile',
    sendOtpLoading: false,
    loginLoading: false,
    otp: '',
    timer: '00:00',
    timerInterval: null,
    userLogin: false,
    loading: true,
    mobileNumber: null,
    username: null,
    password: null,
    checkPassword: null
  }),
  mounted () {
    this.loading = false
    this.goToInputMobileStep()
    // this.goToInputPasswordStep()
  },
  methods: {
    goToInputMobileStep () {
      this.step = 'input-mobile'
      this.stopTimer()
    },
    goToInputVerifyCodeStep () {
      this.step = 'input-verify-code'
      this.startTimer()
    },
    goToInputPasswordStep () {
      this.step = 'input-password'
      this.stopTimer()
    },
    sendOtp () {
      this.sendOtpLoading = true
      APIGateway.auth.sendOtp({ mobile_number: this.mobileNumber })
        .then(() => {
          this.sendOtpLoading = false
          this.goToInputVerifyCodeStep()
        })
        .catch(() => {
          this.sendOtpLoading = false
        })
    },
    otpLogin () {
      this.loginLoading = true
      this.$store.dispatch('Auth/otpLogin', {
        mobile_number: this.mobileNumber,
        otp: this.otp
      })
        .then(() => {
          this.loginLoading = false
          this.$router.push({ name: 'Public.Home' })
        })
        .catch(() => {
          this.loginLoading = false
        })
    },
    startTimer () {
      this.timer = '2:00'
      let time = 120
      this.timerInterval = setInterval(() => {
        time--
        if (time > 0) {
          const minute = Math.floor(time / 60).toString().padStart(2, '0')
          const seconds = (time % 60).toString().padStart(2, '0')
          this.timer = minute + ':' + seconds
        } else {
          this.goToInputMobileStep()
        }
      }, 1000)
    },
    stopTimer () {
      if (!this.timerInterval) {
        return
      }
      clearInterval(this.timerInterval)
      this.timer = '2:00'
    },
    handleOnCompleteOtp (value) {
      this.otp = value
      this.otpLogin()
    },
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
        mobile: this.username,
        password: this.password
      })
        .then(() => {
          this.loading = false
          // this.$axios.defaults.headers.common.Authorization = 'Bearer ' + this.$store.getters['Auth/accessToken']
          // this.getUserData()
          //   .then(() => {
          //     this.$store.commit('AppLayout/updateLoginDialog', false)
          //     this.redirectTo()
          //   })
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
:deep(.otp-input) {
  & > div {
    justify-content: space-between;
    flex-flow: row;
    &  > div {
      width: 15%;
      input {
        width: 100%;
        height: 48px;
        background: #F2F5F9;
        border-radius: 8px;
        border: none;
        text-align: center;
      }
    }
  }
}
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
