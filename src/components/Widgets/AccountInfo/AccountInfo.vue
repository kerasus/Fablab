<template>
  <q-card class="AccountInfo"
          :style="localOptions.style">
    <div class="photo">
      <q-img :src="team.picture" />
    </div>
    <div class="info">
      <div class="members-and-leader">
        <div class="members">
          members
        </div>
        <div class="leader">
          leader
        </div>
      </div>
      <div class="counts">
        <div class="table-counts">
          internet-counts
        </div>
        <div class="internet-counts">
          internet-counts
        </div>
      </div>
    </div>
  </q-card>
</template>

<script>
import { Team } from 'src/models/Team.js'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'

export default {
  name: 'AccountInfo',
  mixins: [mixinWidget],
  data() {
    return {
      team: new Team(),
      defaultOptions: {
        style: {}
      }
    }
  },
  mounted() {
    this.getTeam()
  },
  methods: {
    getTeam () {
      this.team.loading = true
      APIGateway.team.index()
        .then(({ list }) => {
          this.team = new Team(list.list[0])
          this.team.loading = false
        })
        .catch(() => {
          this.team.loading = false
        })
    }
  }
}
</script>

<style scoped lang="scss">

</style>
