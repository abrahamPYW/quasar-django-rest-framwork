<template>
  <div>
    <qd-select
      url="/api/users/"
      option-label="username"
      option-value="id"
      v-model="model"
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
  }
}
</script>
