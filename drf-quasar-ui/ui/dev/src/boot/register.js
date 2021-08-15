import { boot } from 'quasar/wrappers'
import VuePlugin from 'ui' // "ui" is aliased in quasar.conf.js
import axios from 'axios'

const api = axios.create({ baseURL: 'http://localhost:8000' })

api.defaults.headers.common['Authorization'] = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjMxNTQ3NTU2LCJqdGkiOiI2YzdlNjg2YTQzMTI0MmJhODgwZjhmYjA4NDU3ZWFiMSIsInVzZXJfaWQiOjEsImNsaWVudF9pZCI6MSwiaXNfc3RhZmYiOnRydWUsImlzX2RyaXZlciI6dHJ1ZSwiaXNfc3VwZXJfc3RhZmYiOnRydWV9.N0Ui_1CFQ60MuS5NUcxh8j_PCgJm1QQNB_ZqxhkP0mM'

export default boot(({ app }) => {
  app.config.globalProperties.$api = api
  app.use(VuePlugin)
})
