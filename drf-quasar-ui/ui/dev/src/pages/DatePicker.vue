<template>
  <div>
    {{ date }}
    <qd-date-picker v-model="date" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      date: null
    }
  },
  methods: {
    test (event) {
      console.log(event)
    }
  }
}
</script>
