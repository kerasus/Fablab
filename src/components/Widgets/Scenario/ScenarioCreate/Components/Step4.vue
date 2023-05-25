<template>
  <div class="RoleList">
    <div class="header">
      <div class="title">
        نقش‌های انتخاب شده
      </div>
      <div class="action">
        <q-btn unelevated
               @click="onGoBack">
          بازگشت
        </q-btn>
      </div>
    </div>
    <div class="description">
      لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی.
    </div>
    <div class="list">
      <role-side-list v-model:roles="localSelectedRoles.list"
                      :selected-roles="localSelectedRoles"
                      class="q-mb-lg"
                      :template="'setOrder'" />
    </div>
    <div class="action">
      <q-btn unelevated
             color="grey-4 text-black"
             :loading="scenario.loading"
             @click="onAccept">
        تایید و ادامه
      </q-btn>
    </div>
  </div>
</template>

<script>
import { RoleList } from 'src/models/Role.js'
import { Scenario } from 'src/models/Scenario.js'
import { mixinWidget } from 'src/mixin/Mixins.js'
import RoleSideList from 'src/components/Widgets/Scenario/ScenarioCreate/Components/RoleSideList.vue'

export default {
  name: 'ScenarioCreateStep4',
  components: { RoleSideList },
  mixins: [mixinWidget],
  props: {
    selectedRoles: {
      type: RoleList,
      default: new RoleList()
    },
    scenario: {
      type: Scenario,
      default: new Scenario()
    }
  },
  computed: {
    localSelectedRoles: {
      get () {
        return this.selectedRoles
      },
      set (newValue) {
        this.$emit('update:selectedRoles', newValue)
      }
    }
  },
  methods: {
    onGoBack () {
      this.$emit('onGoBack', this.localSelectedRoles)
    },
    onAccept () {
      this.$emit('onAccept', this.localSelectedRoles)
    }
  }
}
</script>

<style lang="scss" scoped>
.RoleList {
  .header {
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    margin-bottom: 24px;
    .title {
      font-weight: 700;
      font-size: 32px;
      line-height: 140%;
    }
    .action {

    }
  }
  .description {
    background: #ECECEC;
    border-radius: 16px;
    color: #696969;
    padding: 24px;
    margin-bottom: 24px;
  }
  .list {
  }
  .action {
    padding-bottom: 10px;
    text-align: right;
  }
}
</style>
