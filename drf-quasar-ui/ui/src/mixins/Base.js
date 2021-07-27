var BaseMixin = {
    methods: {
      baseFilter (data, val, field) {
        return data.filter(obj => {
          return obj[field].toLowerCase().includes(val.toLowerCase())
        })
      },
      baseGetValue (val, obj) {
        return typeof val === 'function' ? val(obj) : obj[val]
      },
      baseGetFormatedValue (val, obj, format) {
        const value = this.baseGetValue(val, obj)
        var formatedValue = null
        if (format !== null) {
          if (format === 'decimal') {
            formatedValue = this.$filters.decimals(value)
          }
          if (format === 'price') {
            formatedValue = this.$filters.price(value)
          }
          if (format === 'date') {
            formatedValue = this.$filters.date(value)
          }
          if (format === 'datetime') {
            formatedValue = this.$filters.datetime(value)
          }
          if (format === 'productMovement') {
            formatedValue = this.$filters.productMovement(value)
          }
          if (format === 'animalStatus') {
            formatedValue = this.$filters.animalStatus(value)
          }
        }
        return format === null ? value : formatedValue
      },
      notifyErrorMessage (res) {
        if (typeof res === 'object') {
          const vm = this
          Object.keys(res).forEach(key => {
            res[key].forEach(item => {
              vm.$q.notify(key === 'non_field_errors' ? item : key.toUpperCase() + ': ' + item)
            })
          })
        }
      },
      baseResetData () {
        Object.assign(this.$data, this.$options.data.apply(this))
      },
      baseModelToForm (model, skippedField = []) {
        var form = {}
        for (const [key, value] of Object.entries(model)) {
          if (typeof value === 'object' && value !== null && !skippedField.includes(key)) {
            form[key] = value.id
          } else {
            form[key] = value
          }
        }
        return form
      }
    }
  }
  
  export default BaseMixin
