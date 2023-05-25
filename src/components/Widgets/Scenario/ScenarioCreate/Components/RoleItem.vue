<template>
  <div class="RoleItem"
       :class="{'selected': selected}">
    <div class="thumbnail">
      <q-avatar>
        <q-img :src="role.thumbnail"
               width="78"
               height="78" />
      </q-avatar>
    </div>
    <div class="name">
      {{ role.slug }}
    </div>
    <div class="action">
      <template v-if="template === 'select'">
        <div class="selectTemplate">
          <q-btn v-if="!selected"
                 flat
                 @click="onSelect">
            انتخاب
          </q-btn>
          <q-btn v-else
                 flat
                 @click="onDeSelect">
            حذف
          </q-btn>
        </div>
      </template>
      <template v-else-if="template === 'setCount'">
        <div class="setCountTemplate">
          <q-btn icon="delete"
                 size="sm"
                 rounded
                 flat
                 color="grey-6"
                 class="deleteItem"
                 @click="onDecrease" />
          <div class="count">
            {{ role.count }}
          </div>
          <q-btn icon="add"
                 size="sm"
                 rounded
                 unelevated
                 color="grey-4 text-grey"
                 class="addItem"
                 @click="onIncrease" />
        </div>
      </template>
      <template v-else-if="template === 'setOrder'">
        <div class="setOrderTemplate">
          <q-input v-model="localRole.order" />
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { Role } from 'src/models/Role.js'

export default {
  name: 'RoleItem',
  props: {
    template: {
      type: String,
      default: 'select'
    },
    role: {
      type: Role,
      default: new Role()
    },
    selected: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    localRole: {
      get () {
        return this.role
      },
      set (newValue) {
        this.$emit('update:role', newValue)
      }
    }
  },
  methods: {
    onIncrease () {
      this.$emit('onIncrease', this.role)
    },
    onDecrease () {
      this.$emit('onDecrease', this.role)
    },
    onSelect () {
      this.$emit('onSelect', this.role)
    },
    onDeSelect () {
      this.$emit('onDeSelect', this.role)
    }
  }
}
</script>

<style lang="scss" scoped>
.RoleItem {
  background: #F2F2F2;
  border: 1px solid #E2E2E2;
  border-radius: 16px;
  padding: 25px 0;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  &.selected {
    background: #FCFCFC;
  }
  .thumbnail {
    height: 78px;
    margin-bottom: 16px;
    width: 78px;
    max-width: 78px;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    .q-avatar {
      width: 78px;
      max-width: 78px;
      height: 78px;
      max-height: 78px;
      .q-img {
        width: 78px;
        max-width: 78px;
        height: 78px;
        max-height: 78px;
      }
    }
  }
  .name {
    font-weight: 700;
    font-size: 16px;
    color: #000000;
    margin-bottom: 16px;
  }
  .action {
    .selectTemplate {
      .q-btn {
        font-weight: 400;
        font-size: 14px;
        color: #BBBBBB;
      }
    }
    .setCountTemplate {
      display: flex;
      flex-flow: row;
      align-items: center;
      justify-content: space-between;
      width: 93px;
      .deleteItem {}
      .count {}
      .addItem {}
    }
    .setOrderTemplate {
      :deep(.q-input) {
        .q-field__native {
          text-align: center;
        }
      }
    }
  }
}
</style>
