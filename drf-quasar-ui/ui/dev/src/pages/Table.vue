<template>
  <qd-table
    :columns="columns"
    url="/api/users/"
    title="test"
  />
</template>

<script>
export default {
  data () {
    return {
      columns: [
        {
          name: 'username',
          field: 'username'
        },
        {
          name: 'firstName',
          field: 'first_name'
        }
      ]
    }
  }
}
</script>
