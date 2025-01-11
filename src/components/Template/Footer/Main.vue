<template>
  <div class="AppFooter">
    <div class="row q-col-lg-x-xl top-section">
      <div class="col-md-2 col-3 box-section">
        <lazy-img :src="logoPic" />
      </div>
      <div class="col-md-5 col-12 box-section">
        <div class="main-title">
          درباره ما
        </div>
        <div class="content">
          <span v-html="about" />
        </div>
      </div>
      <div class="col-md-5 col-12 box-section">
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
            <div v-if="email"
                 class="subtitle">
              ایمیل:
            </div>
            <div v-if="email"
                 class="content">
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
      return this.footerConfig?.logoPic ?? '/img/FABLAB.svg'
    },
    about () {
      return this.footerConfig?.about ?? 'لابراتوآر طراحی و ساخت دیجیتال یا همان فب‌لب یک بستر نوآورانه برای تحقق ایده‌های طراحانه است . <br /> در فب‌لب دانش های مختلف  در کنار ماشین‌ها، ابزارها، مواد و مصالح و تخصص‌های حوزه‌ی ساخت گرد هم می‌آیند و مسیر تجربه را  هم‌وار می‌کنند.'
    },
    phone () {
      return this.footerConfig?.phone ?? '۰۲۱ ۷۶۲۵۱۲۵۱ - ۰۹۰۰۷۶۲۵۱۰۱'
    },
    address () {
      return this.footerConfig?.phone ?? 'تهران، خیابان آزادی، بلوار اکبری، خیابان قاسمی شرقی، پلاک ۷۹، کارخانه هنر طراحی و ساخت'
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
      if (this.$route.name.startsWith('Public.FabGroup.Fabcafe')) {
        return preKey + 'Public.FabGroup.Fabcafe'
      }
      if (this.$route.name.startsWith('Public.FabGroup.Fabkids')) {
        return preKey + 'Public.FabGroup.Fabkids'
      }
      if (this.$route.name.startsWith('Public.FabGroup.Fabfactory')) {
        return preKey + 'Public.FabGroup.Fabfactory'
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
  .box-section {
    padding-right: 16px;
    padding-left: 8px;
  }
  .top-section {
    width: 100%;
    max-width: 1440px;
    padding: 64px 8px;
    margin: auto;
    .main-title {
      color: var(--q-primary);
      font-size: 20px;
      font-weight: 700;
      margin-top: 8px;
      margin-bottom: 8px;
    }
    .subtitle {
      color: var(--q-primary);
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
      text-align: justify;
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
