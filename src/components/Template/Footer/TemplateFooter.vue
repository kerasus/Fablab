<template>
  <!--<main-footer-template v-if="type === 'main'" />-->
  <main-footer-template />
<!--  <admin-panel-header v-if="type === 'admin'" />-->
</template>

<script>
import MainFooterTemplate from 'components/Template/Footer/Main.vue'
// import AdminPanelHeader from 'components/Template/Header/AdminPanelHeader.vue'

export default {
  name: 'templateFooter',
  components: {
    // AdminPanelHeader,
    MainFooterTemplate
  },
  props: {
    type: [String, Boolean, null],
    default: () => 'main'
  }
}
</script>

<style scoped lang="scss">
.user-panel-bare-layout {
  max-width: 1362px;
  margin: auto;
  padding-top: 30px;
  background: #f4f6f9;
  justify-content: center;
  @media screen and (max-width: 1439px) {
    max-width: 100%;
  }
  @media screen and (max-width: 1439px) {
    padding-left: 32px;
    padding-right: 32px;
  }
  @media screen and (max-width: 1148px) {
    padding-left: 20px;
    padding-right: 20px;
  }
  @media screen and (max-width: 1023px) {
    padding-left: 30px;
    padding-right: 30px;
  }
  @media screen and (max-width: 599px) {
    padding-left: 20px;
    padding-right: 20px;
  }
  .user-side-bar {
    @media screen and (max-width: 1023px) {
      display: none;
    }
  }
}
</style>
