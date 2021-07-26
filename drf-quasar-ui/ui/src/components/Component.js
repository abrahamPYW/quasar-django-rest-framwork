import { h } from 'vue'
import { QBadge } from 'quasar'

export default {
  name: 'DrfQuasarUi',

  setup () {
    return () => h(QBadge, {
      class: 'DrfQuasarUi',
      label: 'DrfQuasarUi'
    })
  }
}
