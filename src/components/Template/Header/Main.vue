<template>
  <div class="app-bar-container">
    <div class="app-bar">
      <div class="header-section">
        <!--        -----------------------------------------------------Logo Section--------------------------------------------   -->
        <div class="logo-section">
          <div class="drawer-btn hamburger lt-md">
            <q-btn v-if="showHamburger"
                   class="toolbar-button"
                   icon="isax:menu-1"
                   color="white"
                   text-color="accent"
                   dense
                   unelevated
                   @click="toggleLeftDrawer" />
          </div>
          <div class="logo-pic">
            <a :href="logoLink">
              <img :src="logoPic"
                   width="113">
            </a>
          </div>
        </div>
        <!--        -----------------------------------------------------Tabs Section--------------------------------------------   -->
        <div class="tab-section">
          <q-list class="flex tabs-list">
            <div v-for="(item , index) in headerItems"
                 :key="index"
                 class="tabs-list-container">
              <div v-if="showMenuItem(/* item */)"
                   class="self-center">
                <template v-if="item.type === 'itemMenu'">
                  <item-menu :item="item" />
                </template>
                <template v-if="item.type === 'megaMenu'">
                  <mega-menu :data="item" />
                </template>
                <template v-if="item.type === 'simpleMenu'">
                  <simple-menu :menuContent="item" />
                </template>
              </div>
            </div>
          </q-list>
        </div>
        <!--        -----------------------------------------------------Actions Section--------------------------------------------   -->
        <div class="user-action">
          <div class="action-container" />
          <q-btn v-if="isUserLogin"
                 flat
                 class="btn-user-profile">
            <lazy-img :src="user.picture"
                      :alt="'user photo'"
                      width="48"
                      height="48"
                      class="user-photo" />
            <q-menu class="user-profile-dropdown"
                    :offset="[170, 10]">
              <div class="dropdown-box">
                <div class="header">
                  <div class="profile-box">
                    <div class="profile-detail">
                      <div class="profile-photo-box">
                        <div class="profile-photo-img">
                          <lazy-img :src="user.picture"
                                    :alt="'user photo'"
                                    width="60"
                                    height="60"
                                    class="user-photo" />
                        </div>
                      </div>
                      <div v-if="isUserLogin"
                           class="profile-detail-info">
                        <div class="info-name">
                          {{user.firstname}}
                          {{user.lastname}}
                        </div>
                        <div class="info-phoneNumber">{{user.mobile_number}}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="body">
                  <div class="user-panel-base-menu">
                    <q-list class="side-menu-list"
                            padding
                            dark>
                      <div v-for="(item , index) in profileTitlesList"
                           :key="index">
                        <div v-if="showMenuItem(/* item */)">
                          <q-item class="item-list"
                                  :class="{ 'alone-item': !(item.children && item.children.length) }"
                                  :to="{ name: item.routeName, params: item.params }">
                            <div class="section-title">
                              <q-item-section class="list-section">
                                {{ item.title }}
                              </q-item-section>
                              <q-item-section class="list-section title-icon"
                                              avatar>
                                <q-avatar :icon="item.icon"
                                          size="30" />
                              </q-item-section>
                              <span class="indicator" />
                            </div>
                          </q-item>
                        </div>
                      </div>
                    </q-list>
                    <div v-if="isUserLogin"
                         class="log-out"
                         @click="logOut">
                      <span>
                        <q-avatar icon="isax:logout"
                                  size="30"
                                  dir="rtl" />
                      </span>
                      <span class="logout-text">خروج </span>
                    </div>
                    <div v-else
                         class="log-out"
                         @click="goToLogin">
                      <span>
                        <q-avatar icon="isax:logout"
                                  size="30"
                                  dir="rtl" />
                      </span>
                      <span class="logout-text">ورود </span>
                    </div>
                  </div>
                </div>
              </div>
            </q-menu>
          </q-btn>
          <!--          <div v-else-->
          <!--               class="sub-mit-box">-->
          <!--            <q-btn unelevated-->
          <!--                   class="btn-style"-->
          <!--                   label="ورود"-->
          <!--                   :to="{ name: 'Login' }" />-->
          <!--            <q-btn unelevated-->
          <!--                   class="btn-style sign-up"-->
          <!--                   label="ثبت نام"-->
          <!--                   :to="{ name: 'Login' }" />-->
          <!--          </div>-->
          <q-btn v-if="pageBuilderEditable && routeHasDynamicHeader()"
                 icon="isax:setting"
                 flat
                 @click="openHeaderConfigDialog" />
        </div>
      </div>
    </div>
    <q-dialog v-model="headerConfigDialog"
              class="header-config-dialog">
      <q-card>
        <q-card-section>
          <div>
            <div class="outsideLabel">آدرس فایل عکس لوگو</div>
            <image-uploader v-model:file="localHeaderConfig.logoPic" />
          </div>
          <div>
            <q-list bordered
                    separator
                    class="header-config-items">
              <q-item v-for="(item, itemIndex) in localHeaderConfig.items"
                      :key="itemIndex"
                      clickable
                      class="header-config-item">
                <div class="header-config-item-wrapper">
                  <div>
                    {{ item.title }}
                  </div>
                  <div>
                    {{ item.routePath }}
                  </div>
                  <div>
                    <q-btn color="red"
                           icon="isax:trash"
                           size="xs"
                           round
                           class="remove-header-item-btn"
                           @click="removeMenuItem(itemIndex)" />
                  </div>
                </div>
              </q-item>
            </q-list>
            <div>
              <q-input v-model="localHeaderConfigTitle"
                       label="title"
                       class="q-mt-md" />
              <q-input v-model="localHeaderConfigPath"
                       label="routePath" />
              <q-btn color="primary"
                     class="full-width"
                     @click="addMenuItem">
                افزودن آیتم
              </q-btn>
              <q-btn color="green"
                     class="full-width q-mt-lg"
                     @click="updateHeaderConfig">
                ثبت
              </q-btn>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import megaMenu from './magaMenu.vue'
import simpleMenu from './simpleMenu.vue'
import { User } from 'src/models/User.js'
import LazyImg from 'src/components/lazyImg.vue'
import { APIGateway } from 'src/api/APIGateway.js'
import menuItems from 'src/components/Template/menuData.js'
import ImageUploader from 'src/components/ImageUploader.vue'
import itemMenu from 'src/components/Template/Header/itemMenu.vue'
import { mixinPrefetchServerData, mixinPageOptions } from 'src/mixin/Mixins.js'

export default {
  name: 'MainHeaderTemplate',
  components: { LazyImg, megaMenu, simpleMenu, itemMenu, ImageUploader },
  mixins: [mixinPrefetchServerData, mixinPageOptions],
  data() {
    return {
      localHeaderConfigTitle: null,
      localHeaderConfigPath: null,
      localHeaderConfig: {
        logoPic: null,
        logoLink: null,
        items: []
      },
      headerConfig: null,
      headerConfigDialog: false,
      headerConfigLoading: false,
      conferenceMenu: false,
      showHamburgerConfig: true,
      searchInput: '',
      user: new User(),
      isAdmin: false,
      isUserLogin: false,
      items: menuItems,
      profileTitlesList: [
        {
          title: 'داشبورد',
          icon: 'isax:document',
          routeName: 'UserPanel.Dashboard',
          params: null,
          permission: 'all',
          active: false,
          children: []
        }
      ]
    }
  },
  computed: {
    logoPic () {
      return this.headerConfig?.logoPic ?? '/img/menu-logo.svg'
    },
    logoLink () {
      return this.headerConfig?.logoLink ?? '/'
    },
    headerItems () {
      return this.headerConfig?.items ?? menuItems
    },
    showHamburger () {
      return this.$store.getters['AppLayout/showHamburgerBtn'] || this.$q.screen.lt.md
    },
    computedUserId () {
      const user = this.$store.getters['Auth/user']
      if (!user) {
        return null
      }

      return user.id
    },
    layoutLeftDrawerVisible() {
      return this.$store.getters['AppLayout/layoutLeftDrawerVisible']
    },
    showMenuItem () {
      return (/* item */) => {
        return true
        // return (item.permission === 'all' || this.user.hasPermission(item.permission))
      }
    }
  },
  watch: {
    computedUserId () {
      this.loadAuthData()
    }
  },
  mounted () {
    this.loadAuthData()
    this.checkMenurItemsForAuthenticatedUser()
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
      this.localHeaderConfig = value
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
    freshHeaderConfig () {
      APIGateway.pageSetting.get(this.getHeaderConfigKey())
        .then((config) => {
          this.prefetchServerDataPromiseThen(config)
        })
        .catch(() => {
          this.prefetchServerDataPromiseCatch()
        })
      // /
      // /packages
      // //fab-family
      // /post
      // /about-us
      // /contact-us
    },
    openHeaderConfigDialog () {
      this.headerConfigDialog = true
    },
    updateHeaderConfig () {
      APIGateway.pageSetting.update({
        key: 'header_config-route_name:' + this.$route.name,
        value: JSON.stringify(this.localHeaderConfig)
      })
        .then(() => {
          this.freshHeaderConfig()
          this.headerConfigDialog = false
        })
    },
    removeMenuItem (index) {
      this.localHeaderConfig.items.splice(index, 1)
    },
    addMenuItem () {
      this.localHeaderConfig.items.push({
        title: this.localHeaderConfigTitle,
        routePath: this.localHeaderConfigPath,
        type: 'itemMenu',
        permission: 'all'
      })
    },
    checkMenurItemsForAuthenticatedUser () {
      if (this.user.isSuperUser()) {
        this.profileTitlesList.push({
          title: 'پنل ادمین',
          icon: 'isax:strongbox',
          routeName: 'AdminPanel.Dashboard',
          params: null,
          permission: 'all',
          active: false,
          children: []
        })
      }
    },
    filterByStatement() {
      const param = {
        q: this.searchInput
      }
      this.$router.push({ name: 'Public.Content.Search', query: param })
    },
    loadAuthData () { // prevent Hydration node mismatch
      this.user = this.$store.getters['Auth/user']
      this.isAdmin = this.$store.getters['Auth/isAdmin']
      this.isUserLogin = this.$store.getters['Auth/isUserLogin']
    },
    ...mapMutations('AppLayout', [
      'updateLayoutLeftDrawerVisible'
    ]),
    logOut() {
      return this.$store.dispatch('Auth/logOut')
    },
    toggleLeftDrawer() {
      this.updateLayoutLeftDrawerVisible(!this.layoutLeftDrawerVisible)
    },
    hasRoute(route) {
      if (!route) {
        return
      }
      return !!(route.name || route.path)
    },
    goToLogin() {
      this.$router.push({ name: 'Login' })
    },
    routeTo(name) {
      this.$router.push({ name })
    }
  }
}
</script>

<style lang="scss" scoped>
.app-bar-container {
  background-color: white;
  height: 100px;
  width: 100%;
  color: #333333;
  border-bottom: 1px solid #D8D8D8;
  @media screen and (max-width: 1023px) {
    height: 64px;
  }
  @media screen and (max-width: 599px) {
    background-color: #F4F6F9;
  }
  .app-bar {
    max-width: 1360px;
    //min-width: 1360px;
    margin: auto;
    height: 72px;
    @media screen and (max-width: 1919px) {
      width: 100%;
      //padding-left: 40px;
      //padding-right: 40px;
    }
    @media screen and (max-width: 1439px) {
      padding-left: 35px;
      padding-right: 35px;
    }
    @media screen and (max-width: 1023px) {
      padding-left: 30px;
      padding-right: 30px;
      height: 64px;
    }
    @media screen and (max-width: 599px) {
      padding-left: 20px;
      padding-right: 20px;
    }
    .header-section {
      display: grid;
      grid-template-columns: 86px auto 156px;
      height: 100%;
      @media screen and (max-width: 1023px) {
        grid-template-columns: auto auto;
      }
      @media screen and (max-width: 599px) {
        grid-template-columns: 1fr;
      }
      .logo-section {
        align-items: center;
        display: flex;
        justify-content: space-between;
        @media screen and (max-width: 1023px) {
          justify-self: start;
        }
        @media screen and (max-width: 599px) {
          justify-self: center;
          justify-content: space-between;
          width: 100%;
        }
        .logo-pic {
          $app-bar-height: 86px;
          cursor: pointer;
          display: flex;
          height: auto;
          max-height: $app-bar-height;
          width: 113px;
          align-items: center;
          img {
            max-height: calc( #{$app-bar-height} - 4px);
          }
          @media screen and (max-width: 1023px) {
            $app-bar-height: 64px;
            max-height: $app-bar-height;
            img {
              max-height: calc( #{$app-bar-height} - 12px);
            }
          }
        }
        .hamburger {
          //display: none;
          @media screen and (max-width: 1023px) {
            //display: block;
            margin-right: 20px;
            margin-left: -8px;
          }
          @media screen and (max-width: 599px) {
            margin-left: 0;
          }
        }
        .drawer-btn {
          :deep(.q-btn) {
            flex-direction: row !important;
          }
        }
      }
      .tab-section {
        height: 100px;
        margin-left: 24px;
        .tabs-list {
          height: 100px;
          flex-flow: row;
          justify-content: center;
          .tab-title {
            font-style: normal;
            font-weight: 400;
            font-size: 16px;
            line-height: 25px;
          }
          .tabs-list-container{
            display: grid;
          }
        }
        @media screen and (max-width: 1023px) {
          height: 64px;
          display: none;
        }
      }
      .user-action {
        height: 100px;
        .action-container {
          display: flex;
          height: 42px;
          .search-section {
            height: 40px;
            .search-input {
              width: 300px;
              height: 40px;
              background: #F1F3F4;
              //border-radius: 10px;

              &:deep(.q-field__append) {
                padding-right: 8px !important;

                .q-icon {
                  color: #6D708B;
                  cursor: pointer;
                }
              }

              &:deep(.q-field__control) {
                background: #F1F3F4;
                height: 40px;
              }

              &:deep(.q-field__marginal) {
                height: auto;
                padding: 0;
              }

              .search {
                color: #6D708B;
                height: 40px;
                width: 40px;
                :deep(.q-field__inner .q-field__control .q-field__append .q-icon) {
                  color: #6D708B;
                }
                :deep(.q-btn__content) {
                  margin: 0;
                }
              }
            }
            @media screen and (max-width: 780px) {
              display: none;
            }
          }
          &:deep(.q-card__section) {
            padding: 0;
            margin-right: 18px;

            .q-field--filled .q-field__inner .q-field__control {
              background: #F1F3F4;
            }

            .q-field--filled .q-field__inner .q-field__control .q-field__append, .q-field--filled .q-field__inner .q-field__control .q-field__prepend {
              padding-right: 16px;
              padding-left: 12px;
              height: 40px;
            }

            .q-field__inner {
              //border-radius: 0px;
              .q-field__control {
                color: transparent;
                min-height: 0;
                padding: 0;
                &:before {
                  border-color: transparent;
                }
                &:hover:before {
                  border-color: transparent;
                }
              }
            }
          }
        }
        .sign-up-btn {
          :deep(.q-btn .q-btn__content) {
            margin-left: 10px;
            margin-right: 10px;
          }
        }
        @media screen and (max-width: 1023px) {
          justify-self: end;
          height: 64px;
        }
        @media screen and (max-width: 599px) {
          display: none;
        }
        display: flex;
        //justify-content: flex-end;
        align-items: center;
        justify-self: end;
        .btn-user-profile {
          margin-left: 18px;
          width: 48px;
          height: 48px;
          padding: 0;
          border-radius: 16px;
          :deep(.q-btn__content) {
            width: 100%;
            margin: 0;
            .user-photo {
              width: 100%;
              img {
                border: 2px solid $primary;
                border-radius: 16px;
                max-width: 100%;
                width: 100%;
              }
            }
          }
        }
        .action-btn {
          margin: 4px;
          color: #333;
        }
        .fit-profile-img {
          width: 48px;
          height: 48px;
          border-radius: 16px;
        }
      }
    }
  }
  .sub-mit-box{
    background: #FFFFFF;
    border-radius: 16px;
    display: flex;
    margin-bottom: 0;
    padding: 0;

    .btn-style{
      width: 96px;
      //color: #6D708B;
      color: #333333 !important;

      font-style: normal;
      font-weight: 600;
      font-size: 14px;
      line-height: 22px;
      align-items: center;
      text-align: center;
      letter-spacing: -0.03em;
    }
    .sign-up {
      background: $primary;
    }
  }
}
</style>

<style lang="scss">
.user-profile-dropdown {
  width: 280px;
  //height: 300px;
  background: #FFFFFF;
  border: 1px solid #F2F5F9;
  border-radius: 0 16px 16px 16px #{"/* rtl:ignore */"};
  .header {

    box-shadow: 0 6px 10px rgba(49, 46, 87, 0.04) #{"/* rtl:ignore */"};
    border-radius: 0 15px 0 0 #{"/* rtl:ignore */"};
  }
  .profile-box {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    text-align: left;
    color: #6D708B;
    border-radius: 20px;
    padding: 16px;
    margin-bottom: 16px;
    .profile-detail {
      display: grid;
      grid-template-columns: 70px auto;
      align-items: center;
      .profile-photo-box {

        width: 60px;
        height: 60px;
        border: 3px solid #FFFFFF;
        border-radius: 16px;
        position: relative;
        .profile-photo-img {
          .q-img {
            border-radius: 16px;
            height: 100%;
          }
          width: 60px;
          height: 60px;
          border-radius: 16px;
          .user-photo {
            img {
              border: 2px solid $primary;
              border-radius: 16px;
              max-width: 100%;
              width: 100%;
            }
          }
        }
        .profile-photo-badge {
          position: absolute;
          bottom: -15px;
          left: -7px;
        }
      }
      .profile-detail-info {
        .info-name {
          font-weight: 600;
          font-size: 16px;
          line-height: 25px;
          color: #434765;
        }
        .info-phoneNumber {}
      }
    }
  }
  .user-panel-base-menu {
    display: flex;
    flex-direction: column;
    color: #6D708B;

    .q-list {
      color: #6D708B;
      padding: 0;

      &.side-menu-list {
        .top-separator {
          margin: 0 40px 32px 40px;
        }

        .q-item {
          padding: 0;
          min-height: 0;

          &.item-list {
            display: flex;
            flex-direction: column;
            justify-content: center;
            font-weight: 400;
            font-size: 14px;
            line-height: 22px;
            cursor: pointer;
            padding: 0 14px 0 10px;
            border-radius: 14px;
            &.alone-item {
              height: 40px;

              &.active-route-side-mode {
                .indicator {
                  height: 8px;
                  width: 8px;
                  background-color: white;
                  border-radius: 50%;
                  margin: auto;
                }
              }
            }
            &.alone-item-mode-drawer {
              &.active-route-side-mode {
                .indicator {
                  background-color: #6D708B6B !important;
                }
              }
            }

            .section-title {
              height: 30px;
              display: flex;
              flex-direction: row;
              align-items: center;

              .title-icon {
                margin-left: 12px;
              }

              .q-item__section--side {
                padding: 0;
              }
            }

            .list-section {
              display: flex;
              flex-direction: row;
              justify-content: flex-start;

              .q-avatar {
                height: 22px;
                width: 22px;
              }
            }
          }
        }

        .side-expansion-list {
          &.top-expansion {
            margin-bottom: 10px;
          }

          .expansion-body {
            display: flex;
            margin-left: 8px;
          }

          .q-expansion-item__content {
            .vertical-separator {
              margin: 6px 9px 9px 9px;
            }
          }

          .q-list {
            &.list-expansion {
              margin-bottom: 0;

              .item-list-expansion {
                height: 30px;
                margin: 5px;

                .item-list-expansion-title {
                  justify-content: start;
                }
              }

              .top-expansion-separator {
              }

              .list-child-item {
                height: 30px;
                justify-content: right;
                margin-bottom: 8px;
                width: 157px;
                border-radius: 10px;
                padding: 0 14px;

                &:last-child {
                  margin-bottom: 0;
                }

                .list-child-section {
                  font-size: 14px !important;
                  justify-content: center;
                }
              }
            }
          }
        }

        .active-route-side-mode {

          background-color: #8075DC;
          .indicator {
            height: 6px;
            width: 6px;
            border-radius: 50%;
            margin: auto;
          }
        }
        .item-mode-drawer {
          background: #F6F9FF;
          .indicator {
            height: 6px;
            width: 6px;
            border-radius: 50%;
            margin: auto;
            background-color: #6D708B6B ;
          }
        }

      }

      .q-item__section--avatar {
        min-width: 0 !important;
      }

      a {
        text-decoration: none;
        padding: 0;
      }
    }

    &.list-side-mode {
      color: white;
      .q-list {
        a {
          color: white;
        }
      }
    }

    &.list-drawer-mode {
      color: #6D708B;
      .q-list {
        a {
          color: #6D708B;
        }
      }
    }

    .log-out {
      font-weight: 400;
      font-size: 14px;
      line-height: 22px;
      cursor: pointer;
      height: 40px !important;
      padding: 0 6px;
      //width: 232px;
      border-radius: 14px;
      display: flex;
      align-items: center;
      margin-top: 15px;
      //@media screen and (max-width: 1439px) {
      //  margin: 0 31px 33px 31px;
      //}
      //@media screen and (max-width: 599px) {
      //  margin: 0 30px 30px 30px;
      //  //padding: 0 0 0 10px;
      //}

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
  .body {
    padding-right: 16px;
    padding-left: 16px;
  }
}

.header-config-dialog {
  .header-config-items {
    .header-config-item {
      .header-config-item-wrapper {
        position: relative;
        width: 100%;
        .remove-header-item-btn {
          position: absolute;
          top: 0;
          right: 0;
          transform: translateX(100%) translateY(-50%);
        }
      }
    }
  }
}
</style>
