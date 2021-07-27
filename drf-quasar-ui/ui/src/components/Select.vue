<template>
  <q-select
    :value="value"
    :label="label"
    :option-label="optionLabel"
    :option-value="optionValue"
    :map-options="mapOptions"
    :clearable="clearable"
    :options="myOptions"
    @filter="filterFn"
    :use-input="useInput"
    @input="changeVal"
    :filled="filled"
    :error="error"
    :error-message="errorMessage"
    ref="select"
    :placeholder="placeholder"
    :dense="dense"
    hide-bottom-space
    :outlined="outlined"
    :readonly="readonly"
    @clear="$emit('clear')"
  >
    <template v-slot:append v-if="addButton">
      <q-btn icon="add" @click.stop="$emit('new')" flat dense />
    </template>
    <template v-slot:no-option>
      <div class="q-pa-md text-grey-6 text-bold">
        No se econtraton resultados
      </div>
    </template>
    <template v-slot:option="scope">
      <q-item
        v-bind="scope.itemProps"
        v-on="scope.itemEvents"
      >
        <q-item-section avatar v-if="optionAvatar !== null">
          {{ baseGetValue(optionAvatar, scope.opt) }}
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ baseGetValue(optionLabel, scope.opt) }}</q-item-label>
          <q-item-label v-if="optionCaption !== null" caption>{{ baseGetValue(optionCaption, scope.opt) }}</q-item-label>
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script>
import QdMixinBase from '../mixins/Base.js'
export default {
  name: 'QdSelect',
  mixins: [QdMixinBase],
  props: {
    value: [Object, String, Number],
    label: String,
    optionLabel: {
      type: [String, Function],
      default: 'label'
    },
    optionValue: {
      type: [String, Function],
      default: 'value'
    },
    optionAvatar: {
      type: String,
      default: null
    },
    optionCaption: {
      type: String,
      default: null
    },
    emitValue: {
      type: Boolean,
      default: true
    },
    mapOptions: {
      type: Boolean,
      default: true
    },
    options: {
      type: Array,
      default: obj => []
    },
    url: {
      type: String,
      default: null
    },
    clearable: {
      type: Boolean,
      default: true
    },
    useInput: {
      type: Boolean,
      default: true
    },
    orderBy: {
      type: String,
      default: ''
    },
    addButton: Boolean,
    filled: Boolean,
    error: Boolean,
    errorMessage: String,
    placeholder: String,
    dense: Boolean,
    outlined: Boolean,
    readonly: Boolean,
    query: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      localOptions: []
    }
  },
  computed: {
    myOptions () {
      return this.url === null ? this.options : this.localOptions
    }
  },
  methods: {
    getData () {
      this.localOptions = []
      if (this.url === null) {
        return
      }
      this.$api.get(`${this.url}?ordering=${this.orderBy}`).then(res => {
        this.$emit('results', res.data.results)
        this.localOptions = res.data.results
      })
    },
    filterFn (val, update) {
      update(() => {
        if (this.url === null) {
          this.localOptions = this.baseFilter(this.localOptions, val, this.optionLabel)
        } else {
          var payload = val === '' ? `${this.optionLabel}=` : `${this.optionLabel}__icontains=${val}`
          if (this.query !== null) {
            payload = `${this.query}&` + payload
          }
          this.$api.get(`${this.url}?${payload}&ordering=${this.orderBy}`).then(res => {
            this.localOptions = res.data.results
          })
        }
      })
    },
    changeVal (newVal) {
      if (newVal === null) {
        this.$emit('input_full', null)
        this.$emit('input', null)
        return
      }
      if (this.emitValue) {
        this.$emit('input_full', newVal)
        this.$emit('input', newVal[this.optionValue])
      } else {
        this.$emit('input', newVal)
      }
    },
    focus () {
      this.$refs.select.focus()
    },
    setValueById (id) {
      this.localOptions = []
      this.$api.get(`${this.url}${id}/`).then(res => {
        this.localOptions.push(res.data)
        this.$emit('input', id)
      })
    }
  },
  mounted () {
    this.getData()
  }
}
</script>
