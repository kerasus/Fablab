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
    <q-item v-else
            clickable
            :active="isRouteSelected(item.routeName)"
            active-class="active-item"
            :to="{ name: item.routeName }">
      <q-item-section class="tab-title">
        {{ item.title }}
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
  }
}
.tab-title {
  color: lighten($primary, 10%);
  font-size: 14px;
  font-weight: 500;
}
</style>
