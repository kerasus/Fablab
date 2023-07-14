<template>
  <main-side-bar-template v-if="type === 'main'" />
  <admin-panel-side-bar v-if="type === 'admin'" />
  <user-panel-side-bar v-if="type === 'dashboard'" />
</template>

<script>
import MainSideBarTemplate from 'src/components/Template/SideBard/Main.vue'
import AdminPanelSideBar from 'src/components/Template/SideBard/AdminPanelSideBar.vue'
import UserPanelSideBar from 'src/components/Template/SideBard/UserPanelSideBar.vue'

export default {
  name: 'TemplateSideBar',
  components: {
    UserPanelSideBar,
    AdminPanelSideBar,
    MainSideBarTemplate
  },
  props: {
    type: [String, Boolean, null],
    default: () => 'main'
  }
}
</script>
