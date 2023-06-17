<template>
  <div class="AdminNoticeCreate"
       :style="localOptions.style">
    <div class="title">
      ارسال اعلان
    </div>
    <q-card class="form"
            flat>
      <entity-create v-if="mounted"
                     ref="entityCreate"
                     v-model:value="inputs"
                     title="نقش جدید"
                     :api="api"
                     :default-layout="false"
                     :entity-id-key-in-response="entityIdKeyInResponse"
                     :show-route-param-key="showRouteParamKey"
                     :index-route-name="indexRouteName"
                     :show-route-name="showRouteName" />
      <div class="action">
        <div class="row q-mt-lg justify-end">
          <div class="col-md-4 col-12">
            <q-btn color="primary"
                   class="full-width"
                   :loading="entityLoading"
                   @click="create">
              ارسال
            </q-btn>
          </div>
        </div>
      </div>
    </q-card>
  </div>
</template>

<script>
import { EntityCreate } from 'quasar-crud'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'

export default {
  name: 'AdminNoticeCreate',
  components: { EntityCreate },
  mixins: [mixinWidget],
  data: () => {
    return {
      mounted: false,
      entityLoading: false,
      api: APIGateway.notice.APIAdresses.base,
      entityIdKeyInResponse: 'id',
      showRouteParamKey: 'id',
      showRouteName: 'AdminPanel.Notice.Show',
      indexRouteName: 'AdminPanel.Notice.List',
      inputs: [
        { type: 'input', name: 'title', responseKey: 'title', label: 'عنوان', col: 'col-12' },
        { type: 'input', name: 'url', responseKey: 'url', label: 'لینک', col: 'col-12' },
        { type: 'inputEditor', name: 'body', responseKey: 'body', label: 'متن', col: 'col-12' }
      ]
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.mounted = true
    })
  },
  methods: {
    create() {
      this.entityLoading = true
      this.$refs.entityCreate.createEntity()
        .then(() => {
          this.entityLoading = false
        })
        .catch(() => {
          this.entityLoading = false
        })
    }
  }
}
</script>

<style scoped lang="scss">
.AdminNoticeCreate {
  .title {
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 140%;
    color: #424242;
    margin-bottom: 27px;
    position: relative;
    .back-action {
      position: absolute;
      right: 0;
      top: 0;
    }
  }
  :deep(.form) {
    padding: 24px;
  }
}
</style>
