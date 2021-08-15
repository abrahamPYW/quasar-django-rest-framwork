<template>
  <div>
    <qd-select
      url="/users/"
      option-label="username"
      option-value="id"
      v-model="model"
      @update:modelValue="input()"
      label="Select User"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      model: null
    }
  },
  methods: {
    input () {
      console.log('Input')
    }
  }
}
</script>
