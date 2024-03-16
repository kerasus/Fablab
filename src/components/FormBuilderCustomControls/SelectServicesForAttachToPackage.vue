<template>
  <div class="SelectServicesForAttachToPackage">
    <div v-for="(service, serviceIndex) in localServices"
         :key="serviceIndex"
         class="serviceRow row q-col-gutter-lg">
      <div class="col-md-4 col-12 serviceCol">
        <div class="label">
          نام خدمت
          ({{packageData.title}})
        </div>
        <div class="input">
          <entity-input v-model:value="localServices[serviceIndex].service"
                        item-identify-key="id"
                        item-indicator-key="title"
                        table-title="لیست خدمات"
                        :table="table"
                        :pop-up-button-config="popUpButtonConfig"
                        :table-keys="tableKeys"
                        :selection-mode="'single'"
                        :dialog-confirm-button-config="dialogConfirmButtonConfig"
                        :apiAddress="apiAddress" />
        </div>
      </div>
      <div class="col-md-4 col-12 serviceCol">
        <div class="label">
          اندازه واحد
        </div>
        <div class="input">
          <q-input v-model="localServices[serviceIndex].count" />
        </div>
      </div>
      <div class="col-md-4 col-12 serviceCol">
        <div class="label" />
        <div class="input">
          <q-checkbox v-model="localServices[serviceIndex].extendable"
                      label="قابل تمدید"
                      @update:model-value="onChangeExtendableCheckBox($event, serviceIndex)" />
        </div>
      </div>
    </div>
    <div class="addRowActionSection">
      <q-btn unelevated
             @click="addServiceRow">
        اضافه کردن
      </q-btn>
      <q-btn unelevated
             color="primary"
             class="q-ml-lg"
             @click="updateServices">
        ثبت تغییرات
      </q-btn>
    </div>
    <q-inner-loading :showing="localLoading">
      <q-spinner-ball color="primary"
                      size="50px" />
    </q-inner-loading>
  </div>
</template>

<script>
import { EntityInput } from 'quasar-crud'
import { Package } from 'src/models/Package.js'
import { Service } from 'src/models/Service.js'
import { APIGateway } from 'src/api/APIGateway.js'

export default {
  name: 'SelectServicesForAttachToPackage',
  components: { EntityInput },
  props: {
    packageData: {
      type: Package,
      default: new Package()
    },
    services: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    },
    value: {
      default: () => [],
      type: [Array, String, Number, Boolean]
    },
    options: {
      default: () => [],
      type: Array
    },
    optionDisable: {
      default: 'disable',
      type: String
    },
    label: {
      default: '',
      type: String
    },
    disable: {
      default: false,
      type: Boolean
    },
    optionValue: {
      default: 'value',
      type: String
    },
    optionLabel: {
      default: 'label',
      type: String
    },
    multiple: {
      default: false,
      type: Boolean
    },
    useChips: {
      default: false,
      type: Boolean
    }
  },
  emits: ['update:value', 'input', 'change'],
  data () {
    return {
      apiAddress: APIGateway.service.APIAdresses.base,
      popUpButtonConfig: {
        label: 'انتخاب خدمت'
      },
      dialogConfirmButtonConfig: {
        label: 'بستن'
      },
      tableKeys: {
        data: 'results',
        total: 'count',
        currentPage: 'current',
        perPage: 'per_page',
        pageKey: 'page'
      },
      table: {
        columns: [
          {
            name: 'title',
            required: true,
            label: 'نام خدمت',
            align: 'left',
            field: row => row.title
          },
          {
            name: 'unit',
            required: true,
            label: 'واحد',
            align: 'left',
            field: row => (new Service(row)).unit_info.label
          },
          {
            name: 'standalone',
            required: true,
            label: 'تایید',
            align: 'left',
            field: row => (row.standalone) ? 'دارد' : 'ندارد'
          },
          {
            name: 'minimum_order',
            required: true,
            label: 'حداقل',
            align: 'left',
            field: row => row.minimum_order
          },
          {
            name: 'unit_price',
            required: true,
            label: 'قیمت',
            align: 'left',
            field: row => row.unit_price
          }
        ]
      },
      inputData: null,
      model: null,
      filteredOptions: this.options
    }
  },
  computed: {
    localLoading: {
      get () {
        return this.loading
      },
      set (newValue) {
        this.$emit('update:loading', newValue)
      }
    },
    localServices: {
      get () {
        if (this.services.length === 0) {
          return [{
            service: null,
            count: null,
            extendable: false
          }]
        }

        return this.services
      },
      set (newValue) {
        this.$emit('update:services', newValue)
      }
    }
  },
  watch: {
    value () {
      this.inputData = this.value
    }
  },
  created () {
    this.inputData = this.value
  },
  methods: {
    onChangeExtendableCheckBox (newValue, serviceIndex) {
      const services = this.localServices
      services[serviceIndex].extendable = newValue
      this.$emit('update:services', services)
    },
    addServiceRow () {
      this.localServices.push({
        service: null,
        count: null,
        extendable: false
      })
    },
    updateServices () {
      this.localLoading = true
      const services = this.localServices.filter(item => item.service)
        .map(item => {
          return {
            service: item.service.id,
            count: item.count,
            extendable: item.extendable
          }
        })
      APIGateway.package.assignService({
        id: this.$route.params.id,
        services
      })
        .then(() => {
          this.localLoading = false
          this.$emit('updated')
        })
        .catch(() => {
          this.localLoading = false
        })
    },
    change (val) {
      this.$emit('update:value', val)
    },
    getValues () {
      function getFlatInputs (inputs) {
        let values = []
        inputs.forEach(input => {
          if (input.type !== 'formBuilder') {
            values.push(input)
          } else {
            const formBuilderInputs = getFlatInputs(input.value)
            values = values.concat(formBuilderInputs)
          }
        })
        return values
      }

      return getFlatInputs(this.inputData)
    },
    filterFn (val, update) {
      const isObjectList = (this.options.length > 0 && typeof this.options[0] === 'object')

      if (val === '') {
        update(() => {
          this.filteredOptions = this.options
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        this.filteredOptions = this.options.filter(v => {
          const itemLabel = (isObjectList) ? v[this.optionLabel] : v
          return itemLabel.toString().toLowerCase().indexOf(needle) > -1
        })
      })
    },
    createValue (val, done) {
      if (!this.createNewValue) {
        return
      }
      // Calling done(var) when new-value-mode is not set or "add", or done(var, "add") adds "var" content to the model
      // and it resets the input textbox to empty string
      // ----
      // Calling done(var) when new-value-mode is "add-unique", or done(var, "add-unique") adds "var" content to the model
      // only if is not already set
      // and it resets the input textbox to empty string
      // ----
      // Calling done(var) when new-value-mode is "toggle", or done(var, "toggle") toggles the model with "var" content
      // (adds to model if not already in the model, removes from model if already has it)
      // and it resets the input textbox to empty string
      // ----
      // If "var" content is undefined/null, then it doesn't tampers with the model
      // and only resets the input textbox to empty string

      if (val.length > 0) {
        if (!this.filteredOptions.includes(val)) {
          this.filteredOptions.push(val)
        }
        done(val, 'toggle')
      }
    }
  }

}
</script>

<style lang="scss" scoped>
.SelectServicesForAttachToPackage {
  background: #F6F6F6;
  border: 1px solid #C5C5C5;
  border-radius: 16px;
  padding: 24px;
  position: relative;
  .serviceRow {
    margin-bottom: 36px;
    .serviceCol {
      .label {
        height: 22px;
      }
      .input {}
    }
  }
  .addRowActionSection {
    display: flex;
    flex-flow: row;
    justify-content: flex-end;
    .q-btn {
      color: $primary;
      background: #FFFFFF;
    }
  }
}
</style>
