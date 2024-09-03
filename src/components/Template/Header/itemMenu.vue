<template>
  <div>
    <q-item v-if="item.tags"
            v-ripple
            clickable
            :active="isRouteSelected(item.routeName)"
            active-class="active-item"
            :to="{ name: item.routeName, query: {'tags[]': item.tags} }">
      <q-item-section class="tab-title">
        {{ item.title }}
      </q-item-section>
    </q-item>
    <q-item v-else-if="item.routeName || (item.routePath && item.routePath.startsWith('/'))"
            clickable
            :active="isRouteSelected(item.routeName) || isRoutePathSelected(item.routePath)"
            active-class="active-item"
            :to="item.routeName ? { name: item.routeName } : item.routePath">
      <q-item-section class="tab-title">
        {{ item.title }}
      </q-item-section>
    </q-item>
    <q-item v-else-if="item.routePath && (item.routePath.startsWith('www') || item.routePath.startsWith('http'))"
            clickable
            active-class="active-item">
      <q-item-section class="tab-title">
        <a :href="item.routePath"
           target="_blank">
          {{ item.title }}
        </a>
      </q-item-section>
    </q-item>
  </div>
</template>

<script>
export default {
  name: 'itemMenu',
  props: {
    item: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  methods: {
    isRoutePathSelected (itemPath) {
      return (this.$route.path === itemPath)
    },
    isRouteSelected (itemName) {
      return (this.$route.name === itemName)
    }
  }
}
</script>

<style lang="scss" scoped>
.active-item {
  .tab-title {
    color: $primary;
    font-weight: bold;
    font-size: 16px;
    a {
      color: $primary;
    }
  }
}
.tab-title {
  color: lighten($primary, 10%);
  font-size: 14px;
  font-weight: 500;
  a {
    color: lighten($primary, 10%);
  }
}
</style>
