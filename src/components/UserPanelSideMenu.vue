<template>
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
        {{user.firstname}}
        {{user.lastname}}
      </div>
      <q-card class="wallet">
        <div class="value">
          <div class="value-unit">
            تومان
          </div>
          <div class="value-number">
            {{ (wallet.inventory) ? wallet.inventory.toLocaleString('fa') : 0 }}
          </div>
        </div>
        <q-btn class="action card"
               @click="chargeWallet">
          شارژ کیف پول
        </q-btn>
      </q-card>
    </div>
    <div class="items-section">
      <q-list>
        <q-item v-for="(menuItem, menuItemIndex) in menuItems"
                :key="menuItemIndex"
                v-ripple
                clickable
                exact
                :to="menuItem.route">
          <q-item-section avatar>
            <q-icon :name="menuItem.icon" />
          </q-item-section>
          <q-item-section>
            {{ menuItem.label }}
          </q-item-section>
        </q-item>
      </q-list>
    </div>
    <q-dialog v-model="chargeWalletDialog">
      <q-card style="min-width: 300px; width: 466px; padding: 24px">
        <div class="header flex justify-between">
          <div style="color: #272727; font-size: 20px; font-weight: 700; line-height: 140%; margin-bottom: 24px;">
            شارژ کیف پول
          </div>
          <q-btn icon="close"
                 flat
                 round />
        </div>
        <div style="margin-bottom: 40px;">
          موجودی فعلی:
          {{ (wallet.inventory) ? wallet.inventory.toLocaleString('fa') : 0 }}
          تومان
        </div>
        <div class="flex justify-between"
             style="margin-bottom: 32px;">
          <q-btn :loading="depositLoading"
                 style="background: #F6F6F6; color: #272727"
                 flat
                 @click="deposit(50000)">
            ۵۰ هزار تومان
          </q-btn>
          <q-btn :loading="depositLoading"
                 style="background: #F6F6F6; color: #272727"
                 flat
                 @click="deposit(100000)">
            ۱۰۰ هزار تومان
          </q-btn>
          <q-btn :loading="depositLoading"
                 style="background: #F6F6F6; color: #272727"
                 flat
                 @click="deposit(200000)">
            ۲۰۰ هزار تومان
          </q-btn>
        </div>
        <div class="q-mb-lg">
          <div style="text-align: center;">
            <q-input v-model="chargeWalletAmount"
                     style="text-align: center;" />
          </div>
          <div style="color: #747474; font-size: 14px; line-height: 140%; text-align: center;">
            تومان
          </div>
        </div>
        <div>
          <q-btn :loading="depositLoading"
                 class="full-width"
                 style="background: #2FA84A; color: white;"
                 @click="deposit(chargeWalletAmount)">
            پرداخت
          </q-btn>
        </div>
      </q-card>
    </q-dialog>
  </q-card>
</template>

<script>
import { User } from 'src/models/User.js'
import { Wallet, WalletList } from 'src/models/Wallet.js'
import { APIGateway } from 'src/api/APIGateway'

export default {
  name: 'UserPanelSideMenu',
  data () {
    return {
      depositLoading: false,
      chargeWalletDialog: false,
      chargeWalletAmount: 20000,
      menuItems: [
        {
          label: 'داشبورد',
          icon: 'dashboard',
          route: { name: 'UserPanel.Dashboard' }
        },
        {
          label: 'رزرو خدمات',
          icon: 'person_pin',
          route: { name: 'UserPanel.Reservation' }
        },
        {
          label: 'رزرو رویداد ها',
          icon: 'inventory_2',
          route: { name: 'UserPanel.Registration' }
        },
        {
          label: 'پیام ها',
          icon: 'chat_bubble_outline',
          route: { name: 'UserPanel.Ticket.List' }
        },
        {
          label: 'کافه',
          icon: 'chat_bubble_outline',
          route: { name: 'UserPanel.Shop', params: { shopServiceName: 'cafe' } }
        },
        {
          label: 'فروشگاه',
          icon: 'chat_bubble_outline',
          route: { name: 'UserPanel.Shop', params: { shopServiceName: 'store' } }
        },
        {
          label: 'اعلان ها',
          icon: 'notifications',
          route: { name: 'UserPanel.Notice.List' }
        },
        {
          label: 'صورت‌حساب‌ها',
          icon: 'account_balance_wallet',
          route: { name: 'UserPanel.Invoice.List' }
        },
        {
          label: 'تراکنش ها',
          icon: 'account_balance_wallet',
          route: { name: 'UserPanel.Payment.List' }
        },
        {
          label: 'ویرایش حساب',
          icon: 'person',
          route: { name: 'UserPanel.Profile' }
        },
        {
          label: 'پکیج ها',
          icon: 'inventory_2',
          route: { name: 'UserPanel.Package.RegisteredList' }
        },
        {
          label: 'خروج از حساب',
          icon: 'logout',
          route: { name: 'Login' }
        }
      ],
      user: new User(),
      wallet: new Wallet()
    }
  },
  mounted () {
    this.loadAuthData()
  },
  methods: {
    getUserWallet () {
      APIGateway.wallet.index({ owner: this.user.id })
        .then((wallets) => {
          this.wallet = (new WalletList(wallets)).list[0]
        })
        .catch(() => {
          this.depositLoading = false
        })
    },
    loadAuthData () { // prevent Hydration node mismatch
      this.user = this.$store.getters['Auth/user']
    },
    chargeWallet () {
      this.chargeWalletDialog = true
    },
    deposit (amount) {
      this.depositLoading = true
      APIGateway.wallet.deposit(amount)
        .then((url) => {
          window.location.href = url
        })
        .catch(() => {
          this.depositLoading = false
        })
    }
  }
}
</script>

<style scoped lang="scss">
.side-menu {
  width: 100%;
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
    .wallet {
      width: 167px;
      background: #E9F2E6;
      color: #23A52D;
      display: flex;
      flex-flow: column;
      justify-content: center;
      align-items: center;
      padding-top: 14px;
      padding-bottom: 26px;
      position: relative;
      .value {
        .value-unit {
          font-style: normal;
          font-weight: 400;
          font-size: 8px;
          line-height: 12px;
          width: 100%;
          text-align: left;
        }
        .value-number {
          font-style: normal;
          font-weight: 700;
          font-size: 24px;
          line-height: 37px;
        }
      }
      .action {
        position: absolute;
        bottom: -15px;
        right: 26px;
        width: 117px;
        height: 29px;
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 19px;
        color: #FFFFFF;
        background: #2FA84A;
      }
    }
  }
  .items-section {
    .q-list {
      .q-item {
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 25px;
        color: #A9A9A9;
        padding-left: 24.67px;
        margin-bottom: 27px;
        padding-right: 0;
        align-items: center;
        &.q-router-link--active {
          color: $primary;
        }
        .q-item__section--avatar {
          width: 18.67px;
          min-width: 18.67px;
          max-width: 18.67px;
          padding-right: 0;
          margin-right: 20.67px;
          .q-icon {
            width: 18.67px;
            font-size: 18.67px;
          }
        }
        .q-item__section:nth-child(3) {
          height: 25px;
        }
      }
    }
  }
}
</style>
