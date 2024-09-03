<template>
  <div class="AppFooter">
    <div class="row q-col-gutter-lg-x-xl top-section">
      <div class="col-2">
        <lazy-img src="/img/FabLab-logo.png" />
      </div>
      <div class="col-md-5 col-12">
        <div class="main-title">
          درباره کارخانه
        </div>
        <div class="content">
          با توجه به رسالت کارگروه صنعت و بازار در تجاری سازی فناوری ها و محصولات فناوری نانو و به کارگیری آن‎ها در صنایع، این رو کارگروه تلاش کرده است تا با ایجاد بستری مناسب، زمینه همکاری شرکت های متقاضی صنعتی و شرکت های دارنده فناوری را آماده سازد.
        </div>
      </div>
      <div class="col-md-5 col-12">
        <div class="main-title">
          تماس با ما
        </div>
        <div class="subtitle">
          آدرس:
        </div>
        <div class="content">
          تهران، خیابان آزادی، بلوار اکبری، خیابان قاسمی شرقی، پلاک ۷۹، کارخانه هنر طراحی و ساخت
        </div>

        <div class="row q-col-gutter-md">
          <div class="col-md-6 col-sm-12 colxs-12">
            <div class="subtitle">
              تماس:
            </div>
            <div class="content">
              ۰۲۱۴۰۷۷۴۷۶۷ - ۰۲۱۷۶۲۵۱۲۵۱
            </div>
          </div>
          <div class="col-md-6 col-sm-12 colxs-12">
            <div class="subtitle">
              ایمیل:
            </div>
            <div class="content">
              iranfablab@gmail.com
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
import LazyImg from 'src/components/lazyImg.vue'

export default {
  name: 'AppFooter',
  components: { LazyImg }
}
</script>

<style scoped lang="scss">
.AppFooter {
  border-top: 1px solid #F6F6F6;
  background: #FFF;
  .top-section {
    width: 100%;
    max-width: 1439px;
    padding: 64px 8px;
    margin: auto;
    .main-title {
      color: #0B6AB1;
      font-size: 20px;
      font-weight: 700;
      margin-top: 8px;
      margin-bottom: 8px;
    }
    .subtitle {
      color: #0B6AB1;
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
