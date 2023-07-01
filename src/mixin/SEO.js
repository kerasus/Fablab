import { createMetaMixin } from 'quasar'
import SeoMeta from 'src/assets/js/SeoMeta.js'

const mixinSEO = {
  data() {
    return {
      title: 'فب لب',
      description: 'اگر خود را صاحب ایده‌ای می‌دانید یا حتی دوست دارید چیزی طراحی کنید و یا بسازید، احتمالا فب‌لب جای مناسبی برای شما خواهد بود.',
      robots: 'index, follow',
      ogTitle: 'فب لب',
      ogUrl: '',
      ogDescription: 'اگر خود را صاحب ایده‌ای می‌دانید یا حتی دوست دارید چیزی طراحی کنید و یا بسازید، احتمالا فب‌لب جای مناسبی برای شما خواهد بود.',
      ogImage: ''
    }
  },
  mixins: [
    createMetaMixin(function () {
      const title = this.$store.getters['SEO/title']
      const description = this.$store.getters['SEO/description']
      const robots = this.$store.getters['SEO/robots']
      const ogTitle = this.$store.getters['SEO/ogTitle'] ? this.$store.getters['SEO/ogTitle'] : title
      const ogUrl = this.$store.getters['SEO/ogUrl'] ? this.$store.getters['SEO/ogUrl'] : ''
      const ogDescription = this.$store.getters['SEO/ogDescription']
      const ogImage = this.$store.getters['SEO/ogImage']

      return SeoMeta.getMixin({
        title,
        description,
        robots,
        ogTitle,
        ogUrl,
        ogDescription,
        ogImage
      })
    })
  ]
}

export default mixinSEO
