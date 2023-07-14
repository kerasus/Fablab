<template>
  <q-img :src="getImageSource(localOptions)"
         :ratio="localOptions.ratio"
         spinner-color="primary"
         :width="getImageWidth(localOptions)"
         :height="getImageHeight(localOptions)"
         :style="localOptions.style"
         :class="computedClass"
         @click="takeAction" />
  <q-dialog v-if="localOptions.action.type === 'full-view'"
            v-model="showFullView"
            full-width
            full-height>
    <div>
      <q-btn v-close-popup
             round
             color="red"
             icon="close"
             class="absolute cursor-pointer z-top" />
      <q-img :src="getImageSource(localOptions)"
             :ratio="localOptions.ratio"
             spinner-color="primary"
             :width="getImageWidth(localOptions)"
             :height="getImageHeight(localOptions)"
             class="full-width" />
    </div>
  </q-dialog>
</template>

<script>
import { mixinWidget, mixinPrefetchServerData } from 'src/mixin/Mixins.js'

export default {
  name: 'ImageWidget',
  mixins: [mixinPrefetchServerData, mixinWidget],
  data() {
    return {
      showFullView: false,
      windowWidth: 0,
      defaultOptions: {
        imageSource: null,
        ratio: null,
        hasAction: false,
        action: {
          name: null,
          route: null,
          scrollTo: null,
          eventName: null,
          eventArgs: null
        },
        xs: {
          height: null,
          width: null,
          src: null
        },
        sm: {
          height: null,
          width: null,
          src: null
        },
        md: {
          height: null,
          width: null,
          src: null
        },
        lg: {
          height: null,
          width: null,
          src: null
        },
        xl: {
          height: null,
          width: null,
          src: null
        }
      }
    }
  },
  computed: {
    computedClass () {
      return this.localOptions.className + ((this.localOptions.action.type) ? ' cursor-pointer' : '')
    }
  },
  mounted() {
    this.windowWidth = window.innerWidth
    window.addEventListener('resize', this.onResize)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.onResize)
  },
  methods: {
    onResize() {
      this.windowWidth = window.innerWidth
    },
    getImageSource (options) {
      if (options.imageSource) {
        return options.imageSource
      }
      if (this.windowWidth >= 1920) {
        return options.xl?.src ? options.xl.src : options.lg?.src ? options.lg.src : options.sm?.src ? options.md.src : options.sm?.src ? options.sm.src : options.xs?.src
      } else if (this.windowWidth <= 1919 && this.windowWidth > 1440) {
        return options.lg.src ? options.lg.src : options.md?.src ? options.md.src : options.sm?.src ? options.sm.src : options.xs?.src ? options.xs?.src : options.xl?.src
      } else if (this.windowWidth <= 1439 && this.windowWidth > 1024) {
        return options.md.src ? options.md.src : options.sm?.src ? options.sm.src : options.xs?.src ? options.xs.src : options.lg?.src ? options.lg.src : options.xl?.src
      } else if (this.windowWidth <= 1023 && this.windowWidth > 600) {
        return options.sm.src ? options.sm.src : options.xs?.src ? options.xs.src : options.md?.src ? options.md.src : options.lg?.src ? options.lg.src : options.xl?.src
      } else if (this.windowWidth <= 599) {
        return options.xs?.src ? options.xs.src : options.sm?.src ? options.sm.src : options.md?.src ? options.md.src : options.lg?.src ? options.lg.src : options.xl?.src
      } else {
        return ''
      }
    },
    getImageHeight (options) {
      if (options.height) {
        return options.height
      }
      if (this.windowWidth >= 1920) {
        return options.xl?.height ? options.xl.height : options.lg?.height ? options.lg.height : options.sm?.height ? options.md.height : options.sm?.height ? options.sm.height : options.xs?.height
      } else if (this.windowWidth <= 1919 && this.windowWidth > 1440) {
        return options.lg?.height ? options.lg.height : options.md?.height ? options.md.height : options.sm?.height ? options.sm.height : options.xs?.height ? options.xs.height : options.xl?.height
      } else if (this.windowWidth <= 1439 && this.windowWidth > 1024) {
        return options.md?.height ? options.md.height : options.sm?.height ? options.sm.height : options.xs?.height ? options.xs.height : options.lg?.height ? options.lg.height : options.xl?.height
      } else if (this.windowWidth <= 1023 && this.windowWidth > 600) {
        return options.sm?.height ? options.sm.height : options.xs?.height ? options.xs.height : options.md?.height ? options.md.height : options.lg?.height ? options.lg.height : options.xl?.height
      } else if (this.windowWidth <= 599) {
        return options.xs?.height ? options.xs.height : options.sm?.height ? options.sm.height : options.md?.height ? options.md.height : options.lg?.height ? options.lg.height : options.xl?.height
      } else {
        return ''
      }
    },
    getImageWidth (options) {
      if (options.width) {
        return options.width
      }
      if (this.windowWidth >= 1920) {
        return options.xl?.width ? options.xl.width : options.lg?.width ? options.lg.width : options.sm?.width ? options.md.width : options.sm?.width ? options.sm.width : options.xs?.width
      } else if (this.windowWidth <= 1919 && this.windowWidth > 1440) {
        return options.lg?.width ? options.lg.width : options.md?.width ? options.md.width : options.sm?.width ? options.sm.width : options.xs?.width ? options.xs.width : options.xl?.width
      } else if (this.windowWidth <= 1439 && this.windowWidth > 1024) {
        return options.md?.width ? options.md.width : options.sm?.width ? options.sm.width : options.xs?.width ? options.xs.width : options.lg?.width ? options.lg.width : options.xl?.width
      } else if (this.windowWidth <= 1023 && this.windowWidth > 600) {
        return options.sm?.width ? options.sm.width : options.xs?.width ? options.xs.width : options.md?.width ? options.md.width : options.lg?.width ? options.lg.width : options.xl?.width
      } else if (this.windowWidth <= 599) {
        return options.xs?.width ? options.xs.width : options.sm?.width ? options.sm.width : options.md?.width ? options.md.width : options.lg?.width ? options.lg.width : options.xl?.width
      } else {
        return ''
      }
    },
    isExternal(url) {
      if (typeof window === 'undefined') {
        return true
      }
      // return ((url.indexOf(':') > -1 || url.indexOf('//') > -1) && this.checkDomain(window.location.href) !== this.checkDomain(url))
      // return ((url.indexOf('http://') > -1 || url.indexOf('https://') > -1) && this.checkDomain(window.location.href) !== this.checkDomain(url))
      return (url.indexOf('http://') > -1 || url.indexOf('https://') > -1)
    },
    takeAction(event) {
      event.preventDefault()
      event.stopPropagation()
      const action = this.localOptions.action
      if (this.callBack) {
        this.callBack()
      } else if (action.type === 'scroll') {
        this.scrollToElement(action.scrollTo)
      } else if (action.type === 'link') {
        if (this.isExternal(action.route)) {
          window.location.href = this.localOptions.action.route
        } else {
          this.$router.push(this.localOptions.action.route)
        }
      } else if (action.type === 'event') {
        this.$bus.emit(action.eventName, action.eventArgs)
      } else if (action.type === 'full-view') {
        this.showFullView = true
      }
    }
  }
}
</script>
