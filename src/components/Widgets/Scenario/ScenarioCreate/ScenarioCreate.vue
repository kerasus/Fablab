<template>
  <q-tab-panels v-model="createStep"
                class="ScenarioCreate"
                :style="localOptions.style"
                animated>
    <q-tab-panel name="step-1">
      <scenario-step1-component @onStep1Complete="onStep1Complete" />
    </q-tab-panel>

    <q-tab-panel name="step-2">
      <scenario-step2-component v-model:selected-roles="selectedRoles"
                                :all-roles="allRoles"
                                @onAccept="onAcceptStep2"
                                @onGoBack="step2OnGoBack" />
    </q-tab-panel>

    <q-tab-panel name="step-3">
      <scenario-step3-component v-model:selected-roles="selectedRoles"
                                @onGoBack="step3OnGoBack"
                                @onAccept="onAcceptStep3" />
    </q-tab-panel>

    <q-tab-panel name="step-4">
      <scenario-step4-component v-model:selected-roles="selectedRoles"
                                @onGoBack="step4OnGoBack"
                                @onAccept="onAcceptStep4" />
    </q-tab-panel>
  </q-tab-panels>
</template>

<script>
import { RoleList } from 'src/models/Role.js'
import { Scenario } from 'src/models/Scenario.js'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'
import ScenarioStep1Component from 'src/components/Widgets/Scenario/ScenarioCreate/Components/Step1.vue'
import ScenarioStep2Component from 'src/components/Widgets/Scenario/ScenarioCreate/Components/Step2.vue'
import ScenarioStep3Component from 'src/components/Widgets/Scenario/ScenarioCreate/Components/Step3.vue'
import ScenarioStep4Component from 'src/components/Widgets/Scenario/ScenarioCreate/Components/Step4.vue'

export default {
  name: 'ScenarioCreate',
  components: {
    ScenarioStep1Component,
    ScenarioStep2Component,
    ScenarioStep3Component,
    ScenarioStep4Component
  },
  mixins: [mixinWidget],
  data: () => ({
    createStep: 'step-1',
    allRoles: new RoleList(),
    scenario: new Scenario(),
    selectedRoles: new RoleList(),
    defaultOptions: {
      style: {}
    }
  }),
  mounted() {
    this.loadRoles()
    this.goToStep('step-1')
  },
  methods: {
    loadRoles () {
      this.allRoles.loading = true
      APIGateway.role.index()
        .then(({ list }) => {
          this.allRoles = list
        })
        .catch(() => {
          this.allRoles.loading = false
        })
    },
    goToStep (step) {
      this.createStep = step
    },
    step2OnGoBack () {
      this.goToStep('step-1')
    },
    step3OnGoBack () {
      this.goToStep('step-2')
    },
    step4OnGoBack () {
      this.goToStep('step-3')
    },
    onStep1Complete (scenario) {
      this.scenario = scenario
      this.goToStep('step-2')
    },
    onAcceptStep2 () {
      this.selectedRoles.list.forEach(role => {
        role.order = 1
        role.count = 1
      })
      this.goToStep('step-3')
    },
    onAcceptStep3 () {
      this.goToStep('step-4')
    },
    onAcceptStep4 (roles) {
      this.selectedRoles = roles
      const data = {
        scenario_id: this.scenario.id,
        steps: this.selectedRoles.list.map(role => {
          return {
            role: role.id,
            count: role.count,
            order: role.order
          }
        })
      }
      this.scenario.loading = true
      APIGateway.scenarios.changeScenarioSteps(data)
        .then(() => {
          this.scenario.loading = false
        })
        .catch(() => {
          this.scenario.loading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.ScenarioCreate {
  &.q-tab-panels {
    background: transparent;
  }
}
</style>
