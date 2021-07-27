<template>
  <q-btn-dropdown
    v-show="isVisible"
    :color="this.isFiltered ? 'grey-3' : 'grey-9'"
    flat
    dense
    size="7px"
    icon="fas fa-filter"
    @show="openDialog()"
    ref="filter"
  >
    <q-list>
      <div class="q-pa-md text-bold text-primary">Filtrando {{ col.label }}</div>
      <q-item>
        <q-item-section>
          <q-select
            style="min-width: 150px"
            square
            filled
            outlined
            v-model="localFilterType"
            :options="options"
            label="Filtro"
            map-options
            emit-value
          />
        </q-item-section>
        <q-item-section>
          <q-input
            style="min-width: 150px"
            square
            filled
            outlined
            v-model="localFilterValue"
            label="Busqueda"
          />
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section align="center">
          <q-btn
            color="primary"
            text-color="white"
            label="Buscar"
            @click="applyFilter(col, localFilterType, localFilterValue)"
          />
          <q-btn
            color="primary"
            flat
            label="Limpar Filtros"
            @click="resetFilter(col)"
            v-if="isFiltered"
          />
        </q-item-section>
      </q-item>
    </q-list>
  </q-btn-dropdown>
</template>

<script>
export default {
  props: {
    col: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      visible: false,
      localFilterType: null,
      localFilterValue: null,
      stringOptions: [
        {
          value: 'icontains',
          label: 'Contiene'
        },
        {
          value: 'exact',
          label: 'Igual a'
        },
        {
          value: 'istartswith',
          label: 'Empieza con'
        },
        {
          value: 'iendswith',
          label: 'Termina con'
        }
      ],
      numberOptions: [
        {
          value: 'exact',
          label: 'Igual a'
        },
        {
          value: 'gte',
          label: 'Mayor o Igual'
        },
        {
          value: 'gt',
          label: 'Mayor'
        },
        {
          value: 'lte',
          label: 'Menor o Igual'
        },
        {
          value: 'lt',
          label: 'Menor'
        }
      ]
    }
  },
  methods: {
    openDialog () {
      this.localFilterType = this.col.filter_type
      this.localFilterValue = this.col.filter_value
    },
    showIcon () {
      if (!this.isFiltered) {
        this.visible = true
      }
    },
    hideIcon () {
      if (!this.isFiltered) {
        this.visible = false
      }
    },
    resetFilter (col) {
      this.applyFilter(col, null, null)
    },
    applyFilter (col, filterType, filterValue) {
      this.$emit('applyFilter', col, filterType, filterValue)
      this.$refs.filter.hide()
    }
  },
  computed: {
    isFiltered () {
      if (this.col.filter_value !== null && this.col.filter_type !== null) {
        return true
      }
      return false
    },
    isVisible () {
      if (this.isFiltered) {
        return true
      }
      return this.visible
    },
    options () {
      if (this.col.data_type === 'string') {
        return this.stringOptions
      }
      if (this.col.data_type === 'number') {
        return this.numberOptions
      }
      return []
    }
  }
}
</script>
