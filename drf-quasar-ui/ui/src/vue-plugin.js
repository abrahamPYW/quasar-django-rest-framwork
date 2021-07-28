import Select from './components/Select.vue'
import Dialog from './components/Dialog.vue'
import Page from './components/Page.vue'
import DatePicker from './components/DatePicker.vue'
import Table from './components/Table/Index.vue'


const version = __UI_VERSION__

function install (app) {
  app.component(Select.name, Select)
  app.component(Dialog.name, Dialog)
  app.component(Page.name, Page)
  app.component(DatePicker.name, DatePicker)
  app.component(Table.name, Table)
}

export {
  version,
  Select,
  Dialog,
  Page,
  DatePicker,
  Table,

  install
}
