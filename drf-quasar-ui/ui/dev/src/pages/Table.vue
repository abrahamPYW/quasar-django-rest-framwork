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
          field: 'last_name'
        },
        {
          field: 'phone_number'
        },
        {
          name: 'firstName',
          field: 'first_name'
        },
        {
          name: 'Email',
          field: 'email'
        }
      ]
    }
  }
}
</script>
