<template>
  <div class="event-item-box row q-col-gutter-lg"
       :style="{minWidth: localOptions.minWidth, ...localOptions.style}">
    <div class="col-md-4 col-12">
      <q-skeleton v-if="localEvent.loading"
                  height="270px"
                  square
                  animation="fade" />
      <lazy-img v-else
                :src="localEvent.thumbnail" /></div>
    <div class="col-md-5 col-12">
      <div class="meta">
        <div class="titel">
          <q-skeleton v-if="localEvent.loading"
                      type="text"
                      animation="fade" />
          <template v-else>
            {{ localEvent.slug }}
          </template>
        </div>
        <div class="sub-meta">
          <div class="sub-meta-item">
            <div class="sub-meta-item-title">
              سناریو:
            </div>
            <div class="sub-meta-item-value">
              {{ localEvent.scenario_info.slug }}
            </div>
          </div>
          <div class="sub-meta-item">
            <div class="sub-meta-item-title">
              مکان:
            </div>
            <div class="sub-meta-item-value">
              {{ localEvent.address }}
            </div>
          </div>
          <div class="sub-meta-item">
            <div class="sub-meta-item-title">
              زمان:
            </div>
            <div class="sub-meta-item-value">
              {{ getDateTime(localEvent.holding_time) }}
            </div>
          </div>
          <div class="sub-meta-item">
            <div class="sub-meta-item-title">
              ظرفیت بازی:
            </div>
            <div class="sub-meta-item-value">
              {{ localEvent.entrance_amount }}
            </div>
          </div>
          <div class="sub-meta-item">
            <div class="sub-meta-item-title">
              سطح مورد نیاز:
            </div>
            <div class="sub-meta-item-value">
              ??
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-3 col-12">
      <div class="moderator-info">
        <div class="moderator-info-title">
          گرداننده
        </div>
        <div class="moderator-info-value">
          <div class="moderator-info-value-avatar">
            {{ localEvent.moderator_info.picture }}
          </div>
          <div class="moderator-info-value-info">
            <div class="moderator-info-value-info-name">
              {{ localEvent.moderator_info.firstname }}
              {{ localEvent.moderator_info.lastname }}
            </div>
            <div class="moderator-info-value-info-level">
              سطح
              ??
            </div>
          </div>
        </div>
        <div class="capacity-info">
          <div class="capacity-info-item">
            <div class="capacity-info-title">
              ظرفیت باقی‌مانده:
            </div>
            <div class="capacity-info-value">
              <div class="capacity-info-value-number">
                ??
              </div>
              <div class="capacity-info-value-unit">
                نفر
              </div>
            </div>
          </div>
          <div class="capacity-info-item">
            <div class="capacity-info-title">
              حداقل سفارش:
            </div>
            <div class="capacity-info-value">
              <div class="capacity-info-value-number">
                {{ localEvent.minimum_order_amount }}
              </div>
              <div class="capacity-info-value-unit">
                تومان
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Event } from 'src/models/Event.js'
import Assist from 'src/assets/js/Assist.js'
import LazyImg from 'src/components/lazyImg.vue'
import { APIGateway } from 'src/api/APIGateway.js'
import { mixinWidget, mixinDateOptions, mixinPrefetchServerData } from 'src/mixin/Mixins'

export default {
  name: 'EventMainInfo',
  components: { LazyImg },
  mixins: [mixinWidget, mixinDateOptions, mixinPrefetchServerData],
  data: () => ({
    addToCartLoading: false,
    loading: false,
    event: new Event(),
    defaultOptions: {
      style: {},
      minWidth: 'auto',
      canAddToCart: true,
      showPrice: true,
      event: new Event(),
      routeToEvent: true
    }
  }),
  computed: {
    getRoutingObject() {
      return {
        name: 'Public.Event.Show',
        params: { id: this.event.id || -1 }
      }
    },
    localEvent: {
      get() {
        if (this.event.id !== null) {
          return this.event
        }
        return this.localOptions.event
      },
      set(value) {
        this.event = value
      }
    }
  },
  methods: {
    prefetchServerDataPromise () {
      return this.getApiRequest()
    },
    prefetchServerDataPromiseThen (event) {
      this.localEvent = event
      this.localEvent.loading = false
    },
    prefetchServerDataPromiseCatch () {
      this.localEvent.loading = false
    },

    getApiRequest() {
      this.localEvent.loading = true
      return APIGateway.event.get({ data: { id: this.$route.params.id } })
    },

    getDateTime (date) {
      return Assist.miladiToShamsi(date, 'ddd jDD jMMMM jYYYY ساعت HH:mm')
    },
    getTeacherOfEvent() {
      if (this.event.attributes.info.teacher) {
        return this.event.attributes.info.teacher[0]
      }
      return null
    },
    addToCart() {
      this.addToCartLoading = true
      this.$store.dispatch('Cart/addToCart', { event_id: this.event.id })
        .then(() => {
          this.$store.dispatch('Cart/reviewCart')
            .then(() => {
              this.addToCartLoading = false
            })
        }).catch(() => {
          this.addToCartLoading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.event-item-box {
  .meta {
    .titel {
      font-weight: 700;
      font-size: 24px;
      color: #000000;
      padding-bottom: 16px;
      border-bottom: 1px solid #DBDBDB;
      margin-bottom: 32px;
    }
    .sub-meta {
      .sub-meta-item {
        display: flex;
        flex-flow: row;
        justify-content: flex-start;
        margin-bottom: 16px;
        .sub-meta-item-title {
          font-weight: 400;
          font-size: 16px;
          color: #555555;
          margin-right: 8px;
        }
        .sub-meta-item-value {
          font-weight: 500;
          font-size: 16px;
          color: #000000;
        }
      }
    }
  }
  .moderator-info {
    background: #FFFFFF;
    border-radius: 16px;
    padding: 8px;
    .moderator-info-title {
      font-weight: 700;
      font-size: 16px;
      color: #000000;
      margin: 16px 16px 24px 16px;
    }
    .moderator-info-value {
      display: flex;
      flex-flow: row;
      justify-content: flex-start;
      margin-left: 16px;
      .moderator-info-value-avatar {
        width: 48px;
      }
      .moderator-info-value-info {
        width: calc( 100% - 48px );
        padding-left: 7px;
        margin-bottom: 16px;
        .moderator-info-value-info-name {
          font-weight: 500;
          font-size: 16px;
          color: #000000;
          margin-bottom: 4px;
        }
        .moderator-info-value-info-level {
          font-weight: 400;
          font-size: 14px;
          color: #979797;
        }
      }
    }
    .capacity-info {
      margin-left: 8px;
      margin-right: 8px;
      .capacity-info-item {
        padding-top: 16px;
        border-top: 1px solid #F2F2F2;
        .capacity-info-title {
          font-weight: 500;
          font-size: 16px;
          color: #929292;
        }
        .capacity-info-value {
          display: flex;
          flex-flow: row;
          justify-content: center;
          align-items: center;
          .capacity-info-value-number {
            font-weight: 700;
            font-size: 40px;
            color: #000000;
            margin-right: 4px;
          }
          .capacity-info-value-unit {
            font-weight: 400;
            font-size: 14px;
            color: #000000;
          }
        }
      }
    }
  }
}
</style>
