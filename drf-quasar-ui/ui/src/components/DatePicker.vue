<template>
  <q-input :readonly="readonly" square :error-message="errorMessage" :error="error" :label="label" filled :value="value" @input="$emit('input', $event)" :dense="dense">
    <template v-slot:append>
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
          <q-date v-if="!readonly" :value="value" @input="$emit('input', $event)" mask="YYYY-MM-DD">
            <div class="row items-center justify-end">
              <q-btn v-close-popup label="Close" color="primary" flat />
            </div>
          </q-date>
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<script>
export default {
  name: 'QdDatePicker',
  props: {
    value: String,
    label: String,
    error: Boolean,
    errorMessage: String,
    readonly: Boolean,
    autoNow: Boolean,
    dense: Boolean
  },
  methods: {
    today () {
      this.$emit('input', this.$moment().format('YYYY-MM-DD'))
    }
  },
  mounted () {
    if (this.autoNow) {
      if (this.value === null) {
        this.today()
      }
    }
  }
}
</script>
