<template>
  <q-dialog
    :value="value"
    @show="$emit('show')"
    @hide="hide()"
    :maximized="isMaximized"
  >
    <q-card
      :style="`min-width: ${minWidth}`"
      :class="minWidth === '' ? 'login_card_width' : ''"
    >
      <q-card-section v-if="header" class="row justify-between">
        <div class="text-h6">{{ title }}</div>
        <span>
          <q-btn size="10px" flat color="info" :icon="isMaximized ? 'fas fa-minus' : 'fas fa-window-maximize'" class="q-mr-sm" @click="isMaximized = !isMaximized" />
          <q-btn size="10px" flat color="info" icon="fas fa-times" dense @click="$emit('cancel')" v-close-popup/>
        </span>
      </q-card-section>
      <q-separator v-if="headerSeparator" />
      <q-card-section :style="isMaximized ? 'min-height: 83vh' : ''">
        <slot></slot>
      </q-card-section>
      <q-separator v-if="footerSeparator" />
      <q-card-actions :align="footerAlign">
        <q-btn color="negative" flat label="Eliminar" v-if="footerDelete" @click="$emit('delete')" />
        <q-btn color="info" flat label="Cancelar" v-if="footerCancel" @click="$emit('cancel')" v-close-popup />
        <q-btn color="positive" text-color="white" label="Guardar" v-if="footerOk" @click="$emit('ok')" />
      </q-card-actions>
      <slot name="footer"></slot>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'QdDialog',
  props: {
    value: Boolean,
    header: {
      type: Boolean,
      default: true
    },
    footerAlign: {
      type: String,
      default: 'right'
    },
    footerCancel: Boolean,
    footerOk: Boolean,
    footerDelete: Boolean,
    title: String,
    footerSeparator: Boolean,
    headerSeparator: Boolean,
    minWidth: {
      type: String,
      default: ''
    },
    maximized: Boolean
  },
  data () {
    return {
      isMaximized: this.maximized
    }
  },
  methods: {
    open () {
      this.opened = true
    },
    close () {
      this.opened = false
    },
    hide () {
      this.$emit('hide')
      this.$emit('input', false)
    }
  },
  mounted () {
    this.$emit('mounted')
  }
}
</script>
