<template>
  <div class="AppFooter">
    <div class="row q-col-gutter-lg-x-xl top-section">
      <div class="col-2">
        <lazy-img :src="logoPic" />
      </div>
      <div class="col-md-5 col-12">
        <div class="main-title">
          درباره ما
        </div>
        <div class="content">
          {{ about }}
        </div>
      </div>
      <div class="col-md-5 col-12">
        <div class="main-title">
          تماس با ما
        </div>
        <div class="subtitle">
          آدرس:
        </div>
        <div class="content">
          {{ address }}
        </div>
        <div class="row q-col-gutter-md">
          <div class="col-md-6 col-sm-12 colxs-12">
            <div class="subtitle">
              تماس:
            </div>
            <div class="content">
              {{ phone }}
            </div>
          </div>
          <div class="col-md-6 col-sm-12 colxs-12">
            <div class="subtitle">
              ایمیل:
            </div>
            <div class="content">
              {{ email }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="copyright">
      فب‌لب  ۱۳۹۳-۱۴۰۱ | کلیه حقوق و محتوای وب‌سایت متعلق به شرکت فرآیند بنیان معماری ست.
    </div>
  </div>
</template>

<script>
import { User } from 'src/models/User.js'
import LazyImg from 'src/components/lazyImg.vue'
import { APIGateway } from 'src/api/APIGateway.js'
import { mixinPrefetchServerData, mixinPageOptions } from 'src/mixin/Mixins.js'

export default {
  name: 'MainFooterTemplate',
  // components: { LazyImg, megaMenu, simpleMenu, itemMenu, ImageUploader },
  components: { LazyImg },
  mixins: [mixinPrefetchServerData, mixinPageOptions],
  data() {
    return {
      localFooterConfigTitle: null,
      localFooterConfigPath: null,
      localFooterConfig: {
        logoPic: null,
        about: []
      },
      footerConfig: null,
      footerConfigDialog: false,
      footerConfigLoading: false,
      user: new User(),
      isAdmin: false,
      isUserLogin: false
    }
  },
  computed: {
    logoPic () {
      return this.footerConfig?.logoPic ?? '/img/menu-logo.svg'
    },
    about () {
      return this.footerConfig?.about ?? 'کافه هست در فب لب و با توجه به رسالت کارگروه صنعت و بازار در تجاری سازی فناوری ها و محصولات فناوری نانو و به کارگیری آن\u200Eها در صنایع، این رو کارگروه تلاش کرده است تا با ایجاد بستری مناسب، زمینه همکاری شرکت های متقاضی صنعتی و شرکت های دارنده فناوری را آماده سازد.'
    },
    phone () {
      return this.footerConfig?.phone ?? '۰۲۱۴۰۷۷۴۷۶۷ - ۰۲۱۷۶۲۵۱۲۵۱'
    },
    address () {
      return this.footerConfig?.phone ?? 'تهران، خیابان آزادی، بلوار اکبری، خیابان قاسمی شرقی، پلاک ۷۹، کارخانه هنر طراحی و ساخت '
    },
    email () {
      return this.footerConfig?.email ?? 'iranfablab@gmail.com'
    }
  },
  watch: {
  },
  mounted () {
    this.loadAuthData()
  },
  methods: {
    prefetchServerDataPromise () {
      // return Promise.resolve()
      if (this.routeHasDynamicFooter()) {
        return APIGateway.pageSetting.get(this.getFooterConfigKey())
      }

      return Promise.resolve()
    },
    prefetchServerDataPromiseThen ({ value }) {
      if (!this.$route.meta?.hasDynamicFooter) {
        return
      }
      this.footerConfig = value
      this.localFooterConfig = value
      this.footerConfigLoading = false
    },
    prefetchServerDataPromiseCatch () {
      this.footerConfigLoading = false
    },
    routeHasDynamicFooter () {
      return !!this.getFooterConfigKey()
    },
    getFooterConfigKey () {
      const preKey = 'footer_config-route_name:'
      if (this.$route.name.startsWith('Public.FabFamily.Fabcafe')) {
        return preKey + 'Public.FabFamily.Fabcafe'
      }
      if (this.$route.name.startsWith('Public.FabFamily.Fabkids')) {
        return preKey + 'Public.FabFamily.Fabkids'
      }
      if (this.$route.name.startsWith('Public.FabFamily.Fabfactory')) {
        return preKey + 'Public.FabFamily.Fabfactory'
      }
      return null
    },
    loadAuthData () { // prevent Hydration node mismatch
      this.user = this.$store.getters['Auth/user']
      this.isAdmin = this.$store.getters['Auth/isAdmin']
      this.isUserLogin = this.$store.getters['Auth/isUserLogin']
    }
  }
}
</script>

<style scoped lang="scss">
.AppFooter {
  border-top: 1px solid #F6F6F6;
  background: #FFF;
  .top-section {
    width: 100%;
    max-width: 1060px;
    padding: 64px 8px;
    margin: auto;
    .main-title {
      color: #0B6AB1;
      font-size: 20px;
      font-weight: 700;
      margin-top: 8px;
      margin-bottom: 8px;
    }
    .subtitle {
      color: #0B6AB1;
      font-size: 14px;
      font-weight: 700;
      margin-bottom: 8px;
    }
    .content {
      color: #545454;
      font-size: 16px;
      font-weight: 300;
      line-height: 32px;
      margin-bottom: 32px;
    }
  }
  .copyright {
    padding: 19px 0;
    background: #F6F6F6;
    color: #272727;
    text-align: center;
    font-size: 16px;
    line-height: 40px;
  }

  @media screen and (max-width: 1024px){
    padding-right: 8px;
    padding-left: 8px;
  }
}
</style>
