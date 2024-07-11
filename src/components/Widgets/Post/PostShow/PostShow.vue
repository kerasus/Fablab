<template>
  <div class="post printable">
    <template v-if="!post.loading">
      <div class="breadcrumbs">
        <breadcrumbs />
      </div>
      <div ref="printArea"
           class="print-area">
        <div v-if="!post.post"
             class="post-title">
          {{post.title}}
        </div>

        <q-separator class="q-mt-md" />

        <div class="post-body"
             v-html="post.text" />

        <div class="attributes">
          <!--name: 'Public.PostCategoryParentParent.Show', params: {category_id: post.category_info.parent.parent.id}          -->
          <q-btn v-if="post.category_info?.parent?.parent?.id"
                 :to="{}"
                 class="attribute-item">
            {{post.category_info.parent.parent.title}}
          </q-btn>
          <!--name: this.localOptions.postCategoryShowRouteName , params: {category_id: post.category_info.parent.id}          -->
          <q-btn v-if="post.category_info?.parent?.id"
                 :to="{}"
                 class="attribute-item">
            {{post.category_info.parent.title}}
          </q-btn>
          <q-btn v-if="post.category_info?.id"
                 :to="{name: this.localOptions.postCategoryShowRouteName , params: {category_id: post.category_info.id}}"
                 class="attribute-item">
            {{post.category_info.title}}
          </q-btn>
        </div>
      </div>
    </template>

    <template v-else>
      <q-skeleton type="circle"
                  size="100px"
                  class="q-mt-md" />
      <q-skeleton width="150px"
                  class="q-mt-md" />
      <q-skeleton height="150px"
                  class="q-mt-md" />
    </template>
  </div>
</template>

<script>
import { Post } from 'src/models/Post.js'
import ShamsiDate from 'src/assets/ShamsiDate.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { mixinPrefetchServerData, mixinWidget } from 'src/mixin/Mixins.js'
import Breadcrumbs from 'src/components/Widgets/Breadcrumbs/Breadcrumbs.vue'

let html2pdf
// if (typeof window !== 'undefined') {
//   import('html2pdf.js')
//     .then((html2pdfLib) => {
//       html2pdf = html2pdfLib.default
//     })
// }

export default {
  name: 'ShowClassroomInfo',
  components: { Breadcrumbs },
  mixins: [mixinWidget, mixinPrefetchServerData],
  emits: ['onloadn'],
  data () {
    return {
      breadcrumbs: {
        visible: true,
        loading: false,
        path: [
        ]
      },
      defaultOptions: {
        profileMode: false,
        postShowRouteName: 'Public.Post.Show',
        homeRouteNameTitle: 'فب لب',
        homeRouteName: 'Public.Home',
        postCategoryShowRouteName: 'Public.PostCategory.Show'
      },
      post: new Post()
    }
  },
  computed: {
    postId () {
      return this.$route.params.id ?? this.$route.params.post_id
    }
  },
  methods: {
    prefetchServerDataPromise () {
      return this.getPost()
    },
    prefetchServerDataPromiseThen (post) {
      this.post = new Post(post)
      this.post.post = false
      console.log(this.post)
      console.log(this.localOptions)
      console.log(this.localOptions.postShowRouteName)
      console.log(this.localOptions.postShowRouteName.includes('FabFamily') ? this.localOptions.postShowRouteName.replace('.Post.Show', '') : 'Public.Home')

      this.breadcrumbs.path.push({
        label: this.localOptions.homeRouteNameTitle,
        to: { name: this.localOptions.homeRouteName }
      })
      this.breadcrumbs.path.push({
        label: this.post.category_info.title,
        to: { name: this.localOptions.postCategoryShowRouteName, params: { category_id: this.post.category_info.id } }
      })
      this.breadcrumbs.path.push({
        label: this.post.title,
        to: { name: this.localOptions.postShowRouteName, params: { id: this.post.id } }
      })
      this.$store.commit('AppLayout/updateBreadcrumbs', this.breadcrumbs)
      this.$emit('onloadn', this.post)
    },
    prefetchServerDataPromiseCatch () {
      this.post.post = false
    },

    getTitledDateTime (dateTime) {
      return ShamsiDate.getTitledDateTime(dateTime)
    },
    getTime (time) {
      return ShamsiDate.getDateTime(time)
    },
    getPost () {
      this.post.post = true
      return APIGateway.post.get(this.postId)
    },
    print () {
      this.convertPhotosToBase64()
      const html2pdfConfig = {
        margin: [0, 0, 0, 0],
        image: {
          type: 'jpeg',
          quality: 0.6
        },
        filename: this.post.title,
        html2canvas: {
          dpi: 1,
          scale: 2.5,
          letterRendering: true,
          useCORS: true
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      }
      html2pdf()
        .set(html2pdfConfig)
        .from(this.$refs.printArea)
        .save()
        .thenExternal(() => {
          this.downloadLoading = false
        })
    },
    toDataURL(src, callback, outputFormat) {
      const img = new Image()
      img.crossOrigin = 'Anonymous'
      img.onload = function() {
        const canvas = document.createElement('CANVAS')
        const ctx = canvas.getContext('2d')
        canvas.height = this.naturalHeight
        canvas.width = this.naturalWidth
        ctx.drawImage(this, 0, 0)
        const dataURL = canvas.toDataURL(outputFormat)
        callback(dataURL)
      }
      if (src.includes('?')) {
        img.src = src
      } else {
        img.src = src + '?test=123'
      }
      if (img.complete || img.complete === undefined) {
        img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=='
        img.src = src
      }
    },
    convertPhotosToBase64 () {
      this.convertSvgToBase64()
      this.convertImagesToBase64()
    },
    convertImagesToBase64 () {
      if (!this.$refs.printArea) {
        return
      }
      const images = this.$refs.printArea.getElementsByTagName('img')
      images.forEach(image => {
        this.toDataURL(image.src, function(dataUrl) {
          image.src = dataUrl
        })
      })
    },
    convertSvgToBase64 () {
      if (!this.$refs.printArea) {
        return
      }
      const svgs = this.$refs.printArea.getElementsByTagName('svg')
      svgs.forEach(svg => {
        // Convert the SVG node to HTML.
        const div = document.createElement('div')
        div.appendChild(svg.cloneNode(true))

        // Encode the SVG as base64
        const b64 = 'data:image/svg+xml;base64,' + window.btoa(div.innerHTML)
        const url = 'url("' + b64 + '")'
        svg.style.backgroundImage = url
        svg.style.backgroundSize = 'cover'
        if (svg.parentElement.classList.contains('brace-left')) {
          svg.style.backgroundPosition = 'left'
        }
        if (svg.parentElement.classList.contains('brace-center')) {
          svg.style.backgroundPosition = 'bottom'
        }
        if (svg.parentElement.classList.contains('brace-right')) {
          svg.style.backgroundPosition = 'right'
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/css/HTMLContent.scss";
.post {
  .breadcrumbs {
    margin-bottom: 40px;
  }
  .post-title {
    font-weight: 900;
    font-size: 1.4rem;
  }
  .attributes {
      display: flex;
      flex-flow: row;
    .attribute-item {
      color: #475f4a;
      background-color: #eaeaea;
      border-radius: 8px;
      padding: 4px 8px;
      margin: 0 4px;
      font-size: 16px;
    }
  }
  .print-btn {
    width: 252px;
  }
  :deep(.post-body) {
    margin-top: 32px;
    @include HTMLContent;
  }
}
</style>
