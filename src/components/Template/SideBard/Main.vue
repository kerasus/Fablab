<template>
  <div class="drawer-inside">
    <div class="side-menu-main-layout">
      <div class="side-logo">
        <router-link :to="{name: 'Public.Home'}">
          <div class="logo-image" />
        </router-link>
      </div>
      <div class="side-menu-body">
        <q-list class="side-menu-list"
                padding>
          <q-input v-model="searchText"
                   dense
                   filled
                   class="gray-input search-input"
                   placeholder="جست و جو"
                   @update:model-value ="search(titlesList)">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
          <menu-item :items="sidebarItems"
                     :menu-items-color="'#5867dd'" />
        </q-list>
        <div class="log-out"
             @click="logOut">
          <span>
            <q-avatar icon="isax:logout"
                      size="30"
                      dir="rtl" />
          </span>
          <span class="logout-text">خروج </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import menuItems from 'src/components/Template/menuData.js'
import menuItem from 'src/components/Menu/SideMenu/MenuItem.vue'
import { mixinPrefetchServerData, mixinPageOptions } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway'

export default {
  name: 'MainSideBarTemplate',
  components: { menuItem },
  mixins: [mixinPrefetchServerData, mixinPageOptions],
  data () {
    return {
      clickedItem: null,
      searchText: '',
      headerConfig: null,
      headerConfigLoading: false,
      examsPlan: [
        {
          divider: true
        },
        {
          name: 'دهم تجربی',
          link: 'https://nodes.alaatv.com/aaa/pdf/1401_plan_tajrobi_dahom.pdf'
        },
        {
          name: 'دهم ریاضی',
          link: 'https://nodes.alaatv.com/aaa/pdf/1401_plan_riyazi_dahom.pdf'
        },
        {
          name: 'دهم انسانی',
          link: 'https://nodes.alaatv.com/aaa/pdf/1401_plan_ensani_dahom.pdf'
        },
        {
          divider: true
        },
        {
          name: 'یازدهم تجربی',
          link: 'https://nodes.alaatv.com/aaa/pdf/1401_plan_tajrobi_yazdahom.pdf'
        },
        {
          name: 'یازدهم ریاضی',
          link: 'https://nodes.alaatv.com/aaa/pdf/1401_plan_riyazi_yazdahom.pdf'
        },
        {
          name: 'یازدهم انسانی',
          link: 'https://nodes.alaatv.com/aaa/pdf/1401_plan_ensani_yazdahom.pdf'
        },
        {
          divider: true
        },
        {
          name: 'دوازدهم تجربی',
          link: 'https://nodes.alaatv.com/aaa/pdf/1401_plan_tajrobi_davazdahom.pdf'
        },
        {
          name: 'دوازدهم ریاضی',
          link: 'https://nodes.alaatv.com/aaa/pdf/1401_plan_riyazi_davazdahom.pdf'
        },
        {
          name: 'دوازدهم انسانی',
          link: 'https://nodes.alaatv.com/aaa/pdf/1401_plan_ensani_davazdahom.pdf'
        }
      ]
    }
  },
  computed: {
    isUserLogin() {
      return this.$store.getters['Auth/isUserLogin']
    },
    sidebarItems () {
      return this.headerConfig?.items ?? menuItems
    }
  },
  mounted() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    prefetchServerDataPromise () {
      // return Promise.resolve()
      if (this.routeHasDynamicHeader()) {
        return APIGateway.pageSetting.get(this.getHeaderConfigKey())
      }

      return Promise.resolve()
    },
    prefetchServerDataPromiseThen ({ value }) {
      if (!this.$route.meta?.hasDynamicHeader) {
        return
      }
      this.headerConfig = value
      this.headerConfigLoading = false
    },
    prefetchServerDataPromiseCatch () {
      this.headerConfigLoading = false
    },
    routeHasDynamicHeader () {
      return !!this.getHeaderConfigKey()
    },
    getHeaderConfigKey () {
      const preKey = 'header_config-route_name:'
      if (this.$route.name.startsWith('Public.FabFamily.Cafe')) {
        return preKey + 'Public.FabFamily.Cafe'
      }
      if (this.$route.name.startsWith('Public.FabFamily.Kids')) {
        return preKey + 'Public.FabFamily.Kids'
      }
      if (this.$route.name.startsWith('Public.FabFamily.Factory')) {
        return preKey + 'Public.FabFamily.Factory'
      }

      return null
    },
    handleResize() {
      const windowWidth = window.innerWidth
      this.sidebarItems.forEach(item => {
        if (item.mobileMode) {
          item.show = windowWidth < 1024
        }
      })
    },
    // updateMenuItems () {
    //   if (!this.isUserLogin) {
    //     this.titlesList.splice(0, 1)
    //   }
    // },
    search (list, parentContain = false) {
      if (!list || list.length === 0) {
        return false
      }
      if (parentContain) {
        return true
      }
      let flag = false
      list.forEach(item => {
        const contain = item.title.includes(this.searchText)
        if (this.search(item.children, contain) || contain) {
          flag = true
          item.show = true
          item.open = true
        } else {
          item.open = false
          item.show = false
        }
      })
      return flag
    },
    logOut () {
      return this.$store.dispatch('Auth/logOut')
    }
  }
}
</script>

<style lang="scss" scoped>
.side-menu-main-layout {
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  .side-logo {
    margin-top: 20px;
    margin-bottom: 10px;
    margin-left: 25px;
    cursor: pointer;
    .alaa-logo {
      width: 50px;
      //&:deep(.q-img__image ){
      //  width:50%;
      //  height:50%;
      //}
    }
    .logo-image {
      text-align: left;
      .q-img__container {
      }
    }
  }

  .side-menu-body {
    display: grid;
    grid-template-rows: auto;
    .q-list {
      padding: 0;
      &.side-menu-list {
        .search-input {
          margin-bottom: 30px;
        }
        margin: 0 24px 109px 24px;
        @media screen and (max-width: 1919px) {
          margin: 0 24px 34px 24px;
        }
        @media screen and (max-width: 1439px) {
          margin: 0 21px 26px 21px;
        }
        @media screen and (max-width: 599px) {
          margin: 0 18px 8px 18px;
        }

        .top-separator {
          margin: 0 40px 32px 40px;
          @media screen and (max-width: 1919px) {
            margin: 0 30px 25px 30px;
          }
          @media screen and (max-width: 1439px) {
            margin: 0 45px 22px 45px;
          }
        }

        .q-item {
          padding: 0;
          min-height: 0;
        }
      }
    }
    .log-out {
      align-self: end;
      font-size: 16px;
      font-weight: 500;
      cursor: pointer;
      height: 40px !important;
      //width: 232px;
      border-radius: 14px;
      display: flex;
      align-items: center;
      padding: 0 14px 0 10px;
      margin: 0 0 36px 27px;
      @media screen and (max-width: 1439px) {
        margin: 0 31px 33px 31px;
      }
      @media screen and (max-width: 599px) {
        margin: 0 30px 30px 30px;
        //padding: 0 0 0 10px;
      }
      &:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }
      .q-avatar {
        height: 22px;
        width: 22px;
        margin-right: 12px;
        transform: matrix(-1, 0, 0, 1, 0, 0);
      }
    }
  }
  .log-out {
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    height: 40px !important;
    //width: 232px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    padding: 0 14px 0 10px;
    margin: 0 0 36px 27px;
    @media screen and (max-width: 1439px) {
      margin: 0 31px 33px 31px;
    }
    @media screen and (max-width: 599px) {
      margin: 0 30px 30px 30px;
      //padding: 0 0 0 10px;
    }
    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
    .q-avatar {
      height: 22px;
      width: 22px;
      margin-right: 12px;
      transform: matrix(-1, 0, 0, 1, 0, 0);
    }
  }
  &:deep(.side-menu-main-layout) {
    .q-expansion-item__container {
      .q-item {
        display: flex;
        padding: 0 10px !important;
      }
      .q-icon {
        font-size: 21px;
      }
    }
  }
}
</style>
