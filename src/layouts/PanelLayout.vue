<template>
  <div class="panel-layout">
    <div class="header" />
    <div class="container">
      <q-btn class="lt-md btn-toggleMenu"
             color="primary"
             icon="menu"
             @click="toggleMenu" />
      <div class="side-menu gt-sm">
        <user-panel-side-menu />
      </div>
      <div class="content">
        <router :include="keepAliveComponents" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import Router from 'src/router/Router.vue'
import UserPanelSideMenu from 'src/components/UserPanelSideMenu.vue'
import KeepAliveComponents from 'src/assets/js/KeepAliveComponents.js'

export default {
  components: { UserPanelSideMenu, Router },
  data () {
    return {
      keepAliveComponents: KeepAliveComponents
    }
  },
  computed: {
    layoutLeftDrawerVisible () {
      return this.$store.getters['AppLayout/layoutLeftDrawerVisible']
    }
  },
  methods: {
    ...mapMutations('AppLayout', [
      'updateLayoutLeftDrawerVisible'
    ]),
    toggleMenu () {
      this.updateLayoutLeftDrawerVisible(!this.layoutLeftDrawerVisible)
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
    .btn-toggleMenu {
      position: absolute;
      top: 10px;
      left: 10px;
    }
    .side-menu {
      width: 241px;
    }
    .content {
      width: calc( 100% - 241px );
      padding-left: 40px;
      @media screen and (max-width:1024px){
        width: 100%;
        padding: 0 40px;
      }
    }
  }
}
</style>
