<template>
  <div class="panel-layout">
    <div class="header" />
    <div class="container">
      <q-card class="side-menu">
        <div class="user-section">
          <div class="avatar">
            <q-avatar>
              <q-img :src="user.picture" />
            </q-avatar>
          </div>
          <div class="message">
            خوش آمدید
          </div>
          <div class="full-name">
            محمد راوش
          </div>
        </div>
        <div class="items-section">
          <side-menu-items :menu-items="menuItems" />
        </div>
      </q-card>
      <div class="content">
        <router :include="keepAliveComponents" />
      </div>
    </div>
  </div>
</template>

<script>
import { User } from 'src/models/User.js'
import Router from 'src/router/Router.vue'
import SideMenuItems from 'src/components/SideMenuItems.vue'
import KeepAliveComponents from 'src/assets/js/KeepAliveComponents.js'

export default {
  name: 'AdminPanelLayout',
  components: { SideMenuItems, Router },
  data () {
    return {
      menuItems: [
        {
          label: 'داشبورد',
          icon: 'dashboard',
          route: { name: 'AdminPanel.Dashboard' }
        },
        {
          label: 'خدمات',
          icon: 'post_add',
          children: [
            {
              label: 'پکیج‌ها',
              icon: 'content_copy',
              route: { name: 'AdminPanel.Package.List' }
            },
            {
              label: 'سرویس‌ها',
              icon: 'post_add',
              route: { name: 'AdminPanel.Service.List' }
            },
            {
              label: 'سفارشات',
              icon: 'reorder',
              route: { name: 'AdminPanel.Invoice.List' }
            }
          ]
        },
        {
          label: 'ثبت نام',
          icon: 'panorama_photosphere',
          route: { name: 'AdminPanel.Event.List' }
        },
        {
          label: 'کافه',
          icon: 'content_copy',
          children: [
            {
              label: 'منو',
              icon: 'content_copy',
              route: { name: 'AdminPanel.Product.List', params: { shopServiceName: 'cafe' } }
            },
            {
              label: 'سفارشات',
              icon: 'content_copy',
              route: { name: 'AdminPanel.Shop.Invoice.List', params: { shopServiceName: 'cafe' } }
            }
          ]
        },
        {
          label: 'فروشگاه',
          icon: 'content_copy',
          children: [
            {
              label: 'محصولات',
              icon: 'content_copy',
              route: { name: 'AdminPanel.Product.List', params: { shopServiceName: 'store' } }
            },
            {
              label: 'سفارشات',
              icon: 'content_copy',
              route: { name: 'AdminPanel.Shop.Invoice.List', params: { shopServiceName: 'store' } }
            }
          ]
        },
        {
          label: 'بلاگ',
          icon: 'content_copy',
          route: { name: 'AdminPanel.Blog.List' }
        },
        // {
        //   label: 'چندرسانه‌ای',
        //   icon: 'folder',
        //   route: { name: 'UserPanel.Dashboard' }
        // },
        {
          label: 'پیام‌ها',
          icon: 'chat_bubble_outline',
          route: { name: 'AdminPanel.Ticket.List' }
        },
        {
          label: 'اعلان‌ها',
          icon: 'notifications',
          route: { name: 'AdminPanel.Notice.List' }
        },
        {
          label: 'مالی',
          icon: 'credit_card',
          route: { name: 'AdminPanel.Payment.List' }
        },
        {
          label: 'کاربران',
          icon: 'groups',
          route: { name: 'AdminPanel.User.List' }
        }
      ],
      user: new User(),
      keepAliveComponents: KeepAliveComponents
    }
  },
  mounted () {
    this.loadAuthData()
  },
  methods: {
    loadAuthData() { // prevent Hydration node mismatch
      this.user = this.$store.getters['Auth/user']
    }
  }
}
</script>

<style scoped lang="scss">
.panel-layout {
  position: relative;
  .header {
    position: absolute;
    width: 100%;
    height: 140px;
    top: 0;
    left: 0;
    z-index: 0;
    background-image: url("/img/panel/panel-header.png");
    background-position: center center;
    background-repeat: repeat-x;
  }
  .container {
    position: relative;
    z-index: 1;
    padding-top: 56px;
    width: 1271px;
    max-width: 100%;
    margin: auto;
    display: flex;
    flex-flow: row;
    .side-menu {
      width: 241px;
      padding: 21px 37px 33.5px 37px;
      .user-section {
        width: 100%;
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
        margin-bottom: 33.5px;
        .avatar {
          margin-bottom: 5px;
          .q-avatar {
            width: 78px;
            height: 78px;
          }
        }
        .message {
          margin-bottom: 0;
          font-style: normal;
          font-weight: 400;
          font-size: 16px;
          color: #C5C5C5;
        }
        .full-name {
          font-style: normal;
          font-weight: 700;
          font-size: 18px;
          color: #2E2E2E;
          margin-bottom: 24px;
        }
      }
      .items-section {
      }
    }
    .content {
      width: calc( 100% - 241px );
      padding-left: 40px;
    }
  }
}
</style>
