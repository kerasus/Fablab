<template>
  <q-list>
    <q-item v-for="(menuItem, menuItemIndex) in menuItems"
            :key="menuItemIndex"
            :v-ripple="!menuItem.children"
            :clickable="!menuItem.children"
            exact
            :class="{'has-children': menuItem.children}"
            :to="menuItem.route">
      <template v-if="menuItem.children">
        <q-expansion-item :icon="menuItem.icon"
                          :label="menuItem.label"
                          :default-opened="!!menuItem.children.find(item=>isSameRoute(item.route, $route))">
          <side-menu-items :menu-items="menuItem.children" />
        </q-expansion-item>
      </template>
      <template v-else>
        <q-item-section avatar>
          <q-icon :name="menuItem.icon" />
        </q-item-section>
        <q-item-section>
          {{ menuItem.label }}
        </q-item-section>
      </template>
    </q-item>
  </q-list>
</template>

<script>
export default {
  name: 'SideMenuItems',
  props: {
    menuItems: {
      type: Array,
      defalut: () => []
    }
  },
  methods: {
    isSameRoute (route1, route2) {
      return route1.name === route2.name && this.hasSameParams(route1.params, route2.params)
    },
    hasSameParams (params1, params2) {
      if (typeof params1 === 'undefined' && typeof params2 === 'undefined') {
        return true
      }
      if (typeof params1 === 'undefined' || typeof params2 === 'undefined') {
        return false
      }
      return !Object.keys(params1).find(key => params1[key] !== params2[key])
    }
  }
}
</script>

<style scoped lang="scss">
.q-list {
  .q-item {
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 25px;
    color: #A9A9A9;
    padding-left: 24.67px;
    margin-bottom: 27px;
    padding-right: 0;
    align-items: center;
    &.has-children {
      padding-left: 0;
    }
    &.q-router-link--active {
      color: $primary;
    }
    .q-item__section--avatar {
      width: 18.67px;
      min-width: 18.67px;
      max-width: 18.67px;
      padding-right: 0;
      margin-right: 20.67px;
      .q-icon {
        width: 18.67px;
        font-size: 18.67px;
      }
    }
    .q-item__section:nth-child(3) {
      height: 25px;
    }
  }
}
</style>
