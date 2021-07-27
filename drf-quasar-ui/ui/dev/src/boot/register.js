import { boot } from 'quasar/wrappers'
import VuePlugin from 'ui' // "ui" is aliased in quasar.conf.js
import axios from 'axios'

const api = axios.create({ baseURL: 'http://localhost:8000' })

export default boot(({ app }) => {
  app.config.globalProperties.$api = api
  app.use(VuePlugin)
})
