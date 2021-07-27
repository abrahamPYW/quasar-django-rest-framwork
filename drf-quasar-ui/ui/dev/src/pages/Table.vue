<template>
  <qd-table
    :columns="columns"
    url="test"
    title="test"
  />
</template>

<script>
export default {
  data () {
    return {
      columns: [
        {
          name: 'Test',
          field: 'Test'
        }
      ]
    }
  }
}
</script>
