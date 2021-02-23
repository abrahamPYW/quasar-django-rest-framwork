import { QBadge } from 'quasar'

export default {
  name: 'QuasarDjangoRestFramework',

  render (h) {
    return h(QBadge, {
      staticClass: 'QuasarDjangoRestFramework',
      props: {
        label: 'QuasarDjangoRestFramework'
      }
    })
  }
}
