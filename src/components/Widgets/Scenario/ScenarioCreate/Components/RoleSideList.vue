<template>
  <div class="RoleSideList">
    <div v-if="title"
         class="title">
      <template v-if="!loading">
        {{ title }}
      </template>
      <template v-else>
        <q-skeleton type="text"
                    width="100px" />
      </template>
    </div>
    <div class="row q-col-gutter-lg list">
      <template v-if="!loading">
        <div v-for="(role, roleIndex) in localRoles"
             :key="role.id"
             class="col-md-3">
          <role-item v-model:role="localRoles[roleIndex]"
                     :selected="isSelectedLoad(localRoles[roleIndex].id)"
                     :template="template"
                     @onIncrease="onIncrease"
                     @onDecrease="onDecrease"
                     @onSelect="onSelect"
                     @onDeSelect="onDeSelect" />
        </div>
      </template>
      <template v-else>
        <div v-for="item in 4"
             :key="item"
             class="col-md-3">
          <q-skeleton height="200px"
                      square />
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { RoleList } from 'src/models/Role.js'
import RoleItem from 'src/components/Widgets/Scenario/ScenarioCreate/Components/RoleItem.vue'

export default {
  name: 'RoleSideList',
  components: { RoleItem },
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    template: {
      type: String,
      default: 'select'
    },
    selectedRoles: {
      type: RoleList,
      default: new RoleList()
    },
    title: {
      type: String,
      default: ''
    },
    roles: {
      type: Array,
      default: () => []
    }
  },
  data: () => {
    return {
      listKey: Date.now()
    }
  },
  computed: {
    isSelectedLoad () {
      return (roleId) => !!this.selectedRoles.list.find(role => role.id === roleId)
    },
    selectedRolesLength () {
      return this.selectedRoles.list.length
    },
    localRoles: {
      get () {
        return this.roles
      },
      set (newValue) {
        this.$emit('update:roles', newValue)
      }
    }
  },
  watch: {
    selectedRolesLength () {
      this.listKey = Date.now()
    }
  },
  methods: {
    onIncrease (role) {
      this.$emit('onIncreaseRole', role)
    },
    onDecrease (role) {
      this.$emit('onDecreaseRole', role)
    },
    onSelect (role) {
      this.$emit('onSelectRole', role)
    },
    onDeSelect (role) {
      this.$emit('onDeSelectRole', role)
    }
  }
}
</script>

<style lang="scss" scoped>
.RoleSideList {
  .title {
    font-weight: 700;
    font-size: 24px;
    margin-bottom: 24px;
    color: #272727;
  }
  .list {}
}
</style>
