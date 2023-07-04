<template>
  <q-card class="AccountInfo"
          :style="localOptions.style">
    <q-card class="thumbnail">
      <div class="photo">
        <q-avatar>
          <q-img :src="team.thumbnail" />
        </q-avatar>
      </div>
      <div class="name">
        {{ team.name }}
      </div>
      <div class="status_info">
        {{ team.status_info.label }}
      </div>
    </q-card>
    <div class="info">
      <template v-if="!user.team">
        <div class="no-team">
          هنوز تیمی مشخص نشده است.
        </div>
      </template>
      <template>
        <div class="members-and-leader">
          <div class="members">
            <div class="members-title">
              اعضا
            </div>
            <div v-for="member in team.members_info.list"
                 :key="member.id"
                 class="member-item">
              <q-avatar size="32px">
                <q-img :src="member.picture" />
              </q-avatar>
            </div>
            <div v-for="member in team.members_info.list"
                 :key="member.id"
                 class="member-item">
              <q-avatar size="32px">
                <q-img :src="member.picture" />
              </q-avatar>
            </div>
            <div v-for="member in team.members_info.list"
                 :key="member.id"
                 class="member-item">
              <q-avatar size="32px">
                <q-img :src="member.picture" />
              </q-avatar>
            </div>
          </div>
          <div class="leader ellipsis">
            <span class="title">
              مدیر تیم:
            </span>
            <span class="value">
              {{ team.leader_info.firstname }}
              {{ team.leader_info.lastname }}
            </span>
          </div>
        </div>
        <div class="services">
          <div class="services-item">
            <span class="title">
              تعداد میز:
            </span>
            <span class="value">
              ۵ عدد
            </span>
          </div>
          <div class="services-item">
            <span class="title">
              تعداد اینترنت:
            </span>
            <span class="value">
              ۳ عدد
            </span>
          </div>
          <div class="services-item" />
        </div>
      </template>
    </div>
  </q-card>
</template>

<script>
import { Team } from 'src/models/Team.js'
import { User } from 'src/models/User.js'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'

export default {
  name: 'AccountInfo',
  mixins: [mixinWidget],
  data() {
    return {
      user: new User(),
      isAdmin: true,
      team: new Team(),
      defaultOptions: {
        style: {}
      }
    }
  },
  mounted() {
    this.loadAuthData()
    this.team = this.user.getTeam()
    this.loadTeam()
  },
  methods: {
    loadTeam () {
      if (!this.user.team) {
        return
      }
      this.team.loading = true
      APIGateway.team.get({ data: { id: this.user.team } })
        .then(team => {
          this.team = new Team(team)
          this.team.loading = false
        })
        .catch(() => {
          this.team.loading = false
        })
    },
    loadAuthData () { // prevent Hydration node mismatch
      this.user = this.$store.getters['Auth/user']
      this.isUserLogin = this.$store.getters['Auth/isUserLogin']
    }
  }
}
</script>

<style scoped lang="scss">
.AccountInfo{
  display: flex;
  flex-flow: row;
  padding: 12px;
  .thumbnail {
    width: 116px;
    padding: 12px 26px;
    background: #F5F5F5;
    border-radius: 0 16px 16px 16px;
    .photo {
      width: 100%;
      margin-bottom: 8px;
    }
    .name {
      color: #424242;
      text-align: center;
      font-size: 14px;
      line-height: 140%;
    }
    .status_info {
      color: #9E9E9E;
      text-align: center;
      font-size: 10px;
      line-height: 140%;
    }
  }
  .info {
    width: calc( 100% - 116px );
    padding-left: 16px;
    .no-team {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
    }
    .members-and-leader {
      width: 100%;
      border-bottom: solid 1px #EDEDED;
      display: flex;
      flex-flow: row;
      align-items: center;
      height: 50px;
      .members {
        width: 50%;
        display: flex;
        flex-flow: row;
        justify-content: flex-start;
        align-items: center;
        border-right: solid 1px #EDEDED;
        .members-title {
          color: #757575;
          font-size: 14px;
          line-height: 140%;
          margin-right: 3px;
        }
        .member-item {
          width: 32px;
          margin-left: -10px;
          &:nth-child(2) {
            margin: 0;
          }
        }
      }
      .leader {
        width: 50%;
        padding-left: 16px;
        text-align: left;
        font-size: 14px;
        line-height: 140%;
        .title {
          color: #757575;
        }
        .value {
          color: #424242;
          font-weight: bold;
        }
      }
    }
    .services {
      width: 100%;
      display: flex;
      flex-flow: row;
      align-items: center;
      height: 50px;
      .services-item {
        padding: 0 16px;
        width: 33.333%;
        border-right: solid 1px #EDEDED;
        text-align: left;
        font-size: 14px;
        line-height: 140%;
        &:last-child {
          border: none;
        }
        .title {
          color: #757575;
        }
        .value {
          color: #424242;
          font-weight: bold;
        }
      }
    }
  }
}
</style>
