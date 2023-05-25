<template>
  <q-card v-if="loading"
          class="event-item-box q-pa-md"
          :style="{minWidth: localOptions.minWidth, ...localOptions.style}">
    <div style="max-width: 300px">
      <q-skeleton height="270px"
                  square
                  animation="fade" />
      <q-skeleton type="text"
                  animation="fade" />
      <q-item>
        <q-item-section avatar>
          <q-skeleton type="QAvatar"
                      animation="fade" />
        </q-item-section>

        <q-item-section>
          <q-item-label>
            <q-skeleton type="text"
                        animation="fade" />
          </q-item-label>
          <q-item-label caption>
            <q-skeleton type="text"
                        animation="fade" />
          </q-item-label>
        </q-item-section>
      </q-item>

      <div class="row items-start no-wrap q-mt-sm">
        <div class="col q-pr-sm">
          <q-skeleton type="text"
                      square
                      width="30%"
                      animation="fade" />
          <q-skeleton type="text"
                      square
                      height="12px"
                      animation="fade" />
          <q-skeleton type="text"
                      square
                      height="12px"
                      width="75%"
                      animation="fade" />
        </div>
        <q-skeleton width="56px"
                    height="20px"
                    square
                    animation="fade" />
      </div>
    </div>
  </q-card>
  <q-card v-else
          class="event-item-box"
          :style="{minWidth: localOptions.minWidth, ...localOptions.style}">
    <div class="img-box">
      <router-link :to="getRoutingObject">
        <lazy-img :src="event.thumbnail"
                  :alt="event.slug"
                  width="1"
                  height="1"
                  class="img" />
      </router-link>
      <div class="on-image-info">
        <div class="remain-count">
          <div class="remain-count-titel">
            باقی‌مانده
          </div>
          <div class="remain-count-value">
            <span class="number">
              20
            </span>
            نفر
          </div>
        </div>
        <div class="level">
          سطح ۷ به بالا
        </div>
      </div>
    </div>
    <div class="event-content-box">
      <div class="title-box">
        <div class="main-title ellipsis">
          {{ event.slug }}
        </div>
      </div>
      <div class="detail-box">
        <div class="meta">
          <div class="ellipsis">{{event.scenario_info.slug}}</div>
          <div class="ellipsis">{{event.address}}</div>
          <div class="ellipsis">{{ getDateTime(event.holding_time) }}</div>
        </div>
        <div class="min-order">
          <div class="min-order-titel">
            حداقل سـفـارش
          </div>
          <div class="min-order-value">
            <span class="number">
              20
            </span>
            هزار تومان
          </div>
        </div>
      </div>
    </div>
  </q-card>
</template>

<script>
import { Event } from 'src/models/Event.js'
import LazyImg from 'src/components/lazyImg.vue'
import { mixinWidget, mixinDateOptions } from 'src/mixin/Mixins'

export default {
  name: 'EventItem',
  components: { LazyImg },
  mixins: [mixinWidget, mixinDateOptions],
  data: () => ({
    addToCartLoading: false,
    loading: false,
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
    event: {
      get() {
        if (!this.localOptions.event) {
          return new Event()
        }
        return this.localOptions.event
      },
      set(value) {
        this.localOptions.event = value
      }
    }
  },
  created () {
    if (this.options.event) {
      this.event = new Event(this.options.event)
    } else if (this.options.eventId || this.options.paramKey || this.$route.params.id) {
      this.loading = true
      const eventId = this.options.eventId ? this.options.eventId : this.options.paramKey ? this.$route.params[this.options.paramKey] : this.$route.params.id
      this.$apiGateway.event.show(eventId).then(event => {
        this.event = new Event(event)
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    } else {
      this.event = new Event(this.options)
    }
  },
  methods: {
    getDateTime (date) {
      return this.convertToShamsiWithFormat(date, 'ddd jDD jMMMM jYYYY ساعت HH:mm')
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
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 10px;
  position: relative;
  border-radius: 20px;
  box-shadow: -2px -4px 10px rgba(255, 255, 255, 0.6),
  2px 4px 10px rgba(46, 56, 112, 0.05);
  background-color: #ffffff;
  top: 0;
  transition: all ease 0.5s;

  &:hover {
    box-shadow: -5px -6px 10px rgba(255, 255, 255, 0.6),
    5px 5px 20px rgba(0, 0, 0, 0.1);
    top: -10px;
  }

  .img-box {
    position: relative;
    a {
      border-radius: inherit;
      box-shadow: none;
      width: 100%;
      height: 270px;

      .img {
        width: inherit;
        border-radius: 20px 20px 0 0;

        @media screen and (max-width: 600px){
          width: 100%;
        }
      }
    }
    .on-image-info {
      position: absolute;
      right: 24px;
      bottom: 26px;
      z-index: 1;
      .remain-count {
        background: #FFFFFF;
        border-radius: 8px;
        margin-bottom: 8px;
        padding: 12px;
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 140%;
        .remain-count-titel {
          color: #919191;
        }
        .remain-count-value {
          color: #000000;
          margin-top: 5px;
          .number {
            font-weight: 700;
            font-size: 18px;
          }
        }
      }
      .level {
        background: #FFFFFF;
        border-radius: 8px;
        padding: 5px 22px;
      }
    }
  }

  .event-content-box {
    padding: 10px 16px 16px 16px;

    .title-box {
      font-weight: 700;
      font-size: 16px;
      line-height: 140%;
      text-align: left;
      margin-bottom: 16px;
    }

    .detail-box {
      display: flex;
      flex-flow: row;
      justify-content: space-between;
      align-items: center;
      .meta {
        font-weight: 400;
        font-size: 14px;
        line-height: 140%;
        text-align: left;
        color: #919191;
        width: calc( 100% - 100px);
      }
      .min-order {
        width: 100px;
        padding: 10px;
        background: #F3F3F3;
        border-radius: 8px;
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
        .min-order-titel {
          font-weight: 400;
          font-size: 12px;
          color: #919191;
        }
        .min-order-value {
          font-weight: 400;
          font-size: 10px;
          color: #000000;
          .number {
            font-weight: 700;
            font-size: 18px;
          }
        }
      }
    }
  }

  @media screen and (max-width: 600px) {
    width: 240px;
    display: flex;
    border-radius: 18px;
    margin-bottom: 16px;

    .img-box {
      width: 100px;

      .img {
        border-radius: 10px;
      }

      @media screen and (max-width: 600px){
        width: 100%;
      }
    }

    .event-content-box {
      padding: 0 0 0 16px;
      width: 100%;

      .main-title {
        margin-bottom: 0;

        a {
        }

        .title-box {
          height: 44px;
          justify-content: center;

          .title-text {
            -webkit-line-clamp: 2;
          }
        }
      }

      .price-box {
        margin-bottom: 0;

        .add-cart-info {
          .add-cart-icon {
          }
        }

        .price-info {
          .final-price-box {
            .final-price {
              margin-left: 2px;
            }
          }

          .main-price {
            margin-left: 4px;
          }

          .price-Toman {
          }
        }
      }

      .discount {
        height: 20px;
        /* margin-left: 3px; */
      }
    }
  }

  @media screen and (max-width: 600px){
    flex-direction: row;
    padding: 10px;
    .img-box{
      a{
        .img{
          border-radius: 20px;
        }
      }
    }
  }
}
</style>
