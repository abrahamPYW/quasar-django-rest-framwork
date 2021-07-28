<template>
  <q-btn
    flat
    :icon="col.order === 'asc' ? 'fas fa-arrow-up' : 'fas fa-arrow-down'"
    :color="isOrdered ? 'white' : 'grey-9'"
    dense
    size="7px"
    v-show="isVisible"
    @click="setOrder"
  />
</template>

<script>
export default {
  props: {
    col: {
      type: Object
    }
  },
  data () {
    return {
      visible: false
    }
  },
  computed: {
    isOrdered () {
      if (this.col.order !== null) {
        return true
      }
      return false
    },
    isVisible () {
      if (this.isOrdered) {
        return true
      }
      return this.visible
    }
  },
  methods: {
    showIcon () {
      if (!this.isOrdered) {
        this.visible = true
      }
    },
    hideIcon () {
      if (!this.isOrdered) {
        this.visible = false
      }
    },
    setOrder () {
      var order = 'asc'
      if (this.col.order === 'desc') {
        order = null
      }
      if (this.col.order === 'asc') {
        order = 'desc'
      }
      this.$emit('setOrder', this.col, order)
    }
  }
}
</script>
