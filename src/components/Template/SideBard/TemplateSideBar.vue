<template>
  <main-side-bar-template v-if="type === 'main'" />
  <admin-panel-side-bar v-if="type === 'admin'" />
</template>

<script>
import MainSideBarTemplate from 'src/components/Template/SideBard/Main.vue'
import AdminPanelSideBar from 'components/Template/SideBard/AdminPanelSideBar.vue'

export default {
  name: 'TemplateSideBar',
  components: {
    AdminPanelSideBar,
    MainSideBarTemplate
  },
  props: {
    type: [String, Boolean, null],
    default: () => 'main'
  }
}
</script>
