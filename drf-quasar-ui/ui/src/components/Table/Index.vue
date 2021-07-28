<template>
  <q-virtual-scroll
      type="table"
      style="max-height: 76vh"
      :virtual-scroll-item-size="8"
      :virtual-scroll-sticky-size-start="8"
      :virtual-scroll-sticky-size-end="32"
      :items="localData"
      :flat="flat"
    >
      <template v-slot:before>
        <thead class="thead-sticky text-left">
          <tr :style="`${ dense ? 'height: 8px' : ''}`">
            <th
              v-for="(col, index) in localColumns"
              :key="index"
              @mouseenter="mouseOverHeader(col)"
              @mouseleave="mouseLeaveHeader(col)"
            >
              <div class="row">
                <div>
                  <base-table-order
                    :col="col"
                    ref="order_icon"
                    @setOrder="setOrder"
                  />
                </div>
                <div class="col text-center text-bold">{{ col.label }}</div>
                <base-table-filter
                  :ref="setFilterRef"
                  :col="col"
                  class="col-1"
                  @applyFilter="applyFilter"
                />
              </div>
            </th>
          </tr>
        </thead>
      </template>

      <template v-slot:after>
        <tr
          v-if="fetchedData"
        >
          <td
            colspan="100"
            v-if="fetchedData.count === 0"
            class="q-pa-lg text-center text-h5 text-bold text-grey-5"
          >
            No se encontraron resultados!
          </td>
        </tr>
        <tfoot class="tfoot-sticky text-left" v-if="url !== null">
          <tr v-if="fetchedData">
            <th colspan="100">
              <div class="row">
                <div class="col text-left">
                  <span>Resultados: {{ fetchedData.count }} Registros</span>
                </div>
                <div class="col text-right q-gutter-sm">
                  <q-btn
                    v-if="fetchedData.previous"
                    size="sm"
                    dense
                    color="primary"
                    text-color="white"
                    label="Previous"
                    @click="staticGetData(fetchedData.previous)"
                  />
                  <q-btn
                    v-if="fetchedData.next"
                    size="sm"
                    dense
                    color="primary"
                    text-color="white"
                    label="Next"
                    @click="staticGetData(fetchedData.next)"
                  />
                </div>
              </div>
            </th>
          </tr>
        </tfoot>
      </template>

      <template v-slot="{ item: row, index }">
        <tr
          :key="index"
          @click="$emit(`row-click`, row)"
          @dblclick="$emit(`row-dbclick`, row)"
          :style="localRowStyle(row)"
          :class="localRowClass(row)"
        >
          <td
            :style="localCellStyle(col.style, row)"
            @click="$emit(`cell-click-${col.name}`, row, col)"
            @dblclick="$emit(`cell-dbclick-${col.name}`, row, col)"
            v-for="(col, colIndex) in localColumns"
            :key="'1-' + colIndex"
            :class="localCellClass(col.class, row, col)"
          >{{ baseGetFormatedValue(col.field, row, col.format) }}</td>
        </tr>
      </template>
    </q-virtual-scroll>
</template>

<script>
import BaseTableFilter from './Filter.vue'
import BaseTableOrder from './Order.vue'
import BaseMixin from '../../mixins/Base.js'
export default {
  name: 'QdTable',
  props: {
    separator: {
      type: String,
      default: 'cell'
    },
    flat: {
      type: Boolean,
      default: true
    },
    bordered: {
      type: Boolean,
      default: true
    },
    columns: {
      type: Array,
      default: obj => []
    },
    data: {
      type: Array,
      default: obj => []
    },
    url: {
      type: String,
      default: null
    },
    cursorPointer: Boolean,
    rowStyle: {
      type: [String, Function],
      default: null
    },
    rowClass: {
      type: [String, Function],
      default: null
    },
    rowsOffset: {
      type: Boolean,
      default: true
    },
    dense: {
      type: Boolean,
      default: true
    },
    query: {
      type: String,
      default: null
    }
  },
  mixins: [BaseMixin],
  components: {
    BaseTableFilter,
    BaseTableOrder
  },
  data () {
    return {
      fetchedData: {},
      localColumns: [],
      search: '',
      filterRefs: []
    }
  },
  computed: {
    localData () {
      this.$emit('localData', this.url === null ? this.data : this.fetchedData.results)
      return this.url === null ? this.data : this.fetchedData.results
    }
  },
  watch: {
    columns () {
      this.contructLocalColumns()
    }
  },
  methods: {
    localRowClass (row) {
      var result = ''
      if (this.rowClass !== null) {
        result += typeof this.rowClass === 'function' ? this.rowClass(row) : this.rowClass
      }
      return result
    },
    localRowStyle (row) {
      var style = ''
      if (this.cursorPointer) {
        style += 'cursor: pointer; '
      }
      if (this.rowStyle !== null) {
        style += typeof this.rowStyle === 'function' ? this.rowStyle(row) : this.rowStyle
      }
      return style
    },
    localCellClass (field, row, col) {
      var style = ''
      if (field !== null) {
        style += typeof field === 'function' ? field(row) : field
        style += ' '
      }
      if (col.align === null) {
        if (col.data_type === 'number') {
          style += 'text-right '
        }
      } else {
        style += `text-${col.align} `
      }
      return style
    },
    localCellStyle (field, row) {
      var style = ''
      if (field !== null) {
        style += typeof field === 'function' ? field(row) : field
        style += ' '
      }
      if (this.dense) {
        style += 'height: 8px; '
      }
      return style
    },
    mouseOverHeader (col) {
      if (typeof this.$refs.filter_icon[index] !== 'undefined') {
        this.$refs.filter_icon[index].showIcon()
        this.$refs.order_icon[index].showIcon()
      }
    },
    mouseLeaveHeader (index) {
      if (typeof this.$refs.filter_icon[index] !== 'undefined') {
        this.$refs.filter_icon[index].hideIcon()
        this.$refs.order_icon[index].hideIcon()
      }
    },
    contructLocalColumns () {
      var columns = []
      this.columns.forEach((o, index) => {
        var dataType = this.getDataType(o)
        columns.push({
          colIndex: index,
          name: (typeof o.name === 'undefined' && typeof o.name !== 'function') ? o.field : o.name,
          label: typeof o.label === 'undefined' ? o.field : o.label,
          field: o.field,
          show_filter_icon: typeof o.show_filter_icon === 'undefined' ? false : o.show_filter_icon,
          filter_type: typeof o.filter_type === 'undefined' ? null : o.filter_type,
          filter_value: typeof o.filter_value === 'undefined' ? null : o.filter_value,
          order: typeof o.order === 'undefined' ? null : o.order,
          data_type: dataType,
          order_name: typeof o.order_name === 'undefined' ? (typeof o.name === 'undefined' && typeof o.name !== 'function') ? o.field : o.name : o.order_name,
          align: typeof o.align === 'undefined' ? null : o.align,
          format: typeof o.format === 'undefined' ? null : o.format,
          class: typeof o.class === 'undefined' ? null : o.class,
          style: typeof o.style === 'undefined' ? null : o.style
        })
      })
      this.localColumns = columns
    },
    urlConstructor (columns) {
      // Obj must contain: field_name, filter_type
      var url = ''
      columns.forEach(o => {
        if (o.filter_type !== null && o.filter_value !== null) {
          if (url !== '' || this.query !== null) {
            url += '&'
          }
          if (o.filter_type === 'exact') {
            url += o.name + '=' + o.filter_value
          } else {
            url += o.name + '__' + o.filter_type + '=' + o.filter_value
          }
        }
      })
      var orderedColumns = columns.filter(obj => {
        return obj.order !== null
      })
      var order = ''
      if (orderedColumns.length > 0) {
        if (url !== '' || this.query !== null) {
          order += '&'
        }
        order += 'ordering='
        orderedColumns.forEach(obj => {
          if (obj.order === 'asc') {
            order += obj.order_name
          } else {
            order += '-' + obj.order_name
          }
        })
      }
      if (url !== '' || order !== '' || this.query !== null) {
        var query = this.query === null ? '' : this.query
        return '?' + query + url + order
      } else {
        return ''
      }
    },
    getData (constructColumns = false) {
      if (this.url === null) {
        return
      }
      this.$api.get(this.url + this.urlConstructor(this.localColumns)).then(res => {
        this.fetchedData = res.data
        if (constructColumns) {
          this.contructLocalColumns()
        }
      })
    },
    staticGetData (url = null) {
      if (url === null) {
        return
      }
      this.$api.get(url).then(res => {
        this.fetchedData = res.data
      })
    },
    getDataType (col) {
      if (typeof this.localData === 'undefined') {
        return null
      }
      var dataType = null
      this.localData.forEach(o => {
        if (dataType === null) {
          var val = o[col.field]
          dataType = typeof val
          if (dataType === 'undefined') {
            dataType = 'string'
          }
        }
      })
      return dataType
    },
    applyFilter (col, filterType, filterValue) {
      var columns = this.localColumns
      var index = this.localColumns.indexOf(col)
      columns[index].filter_type = filterType
      columns[index].filter_value = filterValue
      this.$set(this.localColumns, columns)
      this.getData()
    },
    setOrder (col, order) {
      var columns = this.localColumns
      var index = this.localColumns.indexOf(col)
      columns[index].order = order
      this.$set(this.localColumns, columns)
      this.getData()
    },
    setFilterRef (el) {
      if (el) {
        this.filterRefs.push(el)
      }
    }
  },
  mounted () {
    this.contructLocalColumns()
    this.getData(true)
  },
  beforeUpdate () {
    this.filterRefs = []
  }
}
</script>

<style lang="sass">
.thead-sticky tr > *,
.tfoot-sticky tr > *
  position: sticky
  opacity: 1
  z-index: 1
  background: #717786
  color: white

.thead-sticky tr:last-child > *
  top: 0

.tfoot-sticky tr:first-child > *
  bottom: 0
</style>
