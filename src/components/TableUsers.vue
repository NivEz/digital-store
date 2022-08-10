<template>
  <div class="q-pa-md">
    <q-table

        :data="data"
        :columns="columns"
        row-key="name"
        :visible-columns="visibleColumns"
        style="background-color: #26A69A"
        :filter="filter"
    >
      <template v-slot:top="props" style="background-color: #9C27B0">
        <div class="col-6 q-table__title text-center">User management table</div>
        <q-space/>
        <q-btn
            flat round dense
            :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
            @click="props.toggleFullscreen"
            class="q-ml-md"
        />


        <div v-if="$q.screen.gt.xs" class="row">
          <q-toggle class="col" v-model="visibleColumns" val="email" label="email"/>
          <q-toggle class="col" v-model="visibleColumns" val="amountSpent" label="Amount spent"/>
          <q-toggle class="col" v-model="visibleColumns" val="numberOfProducts" label="Number of products"/>
          <q-toggle class="col" v-model="visibleColumns" val="numberOfTransactions" label="Number of transactions"/>
          <q-toggle class="col" v-model="visibleColumns" val="subscribed" label="Subscription"/>
          <q-space/>
          <q-input class="col-3" dense debounce="400" color="primary" v-model="filter"/>

        </div>


        <q-select
            v-else
            v-model="visibleColumns"
            multiple
            borderless
            dense
            options-dense
            :display-value="$q.lang.table.columns"
            emit-value
            map-options
            :options="columns"
            option-value="name"
            style="min-width: 150px"
        />

      </template>



    </q-table>
  </div>
</template>

<script>

const table = 'tableUsers'

export default {
  name: "TableUsers",
  props: ['isReload'],
  data() {
    return {
      visibleColumns: ['email', 'amountSpent', 'numberOfProducts', 'numberOfTransactions'],
      filter: '',
      columns: [
        {
          name: 'id',
          required: true,
          label: 'User ID',
          align: 'left',
          field: 'id',
          sortable: true,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
        },
        {name: 'firstName', required: true, align: 'center', label: 'First name', field: 'firstName', sortable: true},
        {name: 'lastName', required: true, label: 'Last name', field: 'lastName', sortable: true},
        {name: 'email', label: 'email', field: 'email', align: "center"},
        {name: 'amountSpent', label: 'Amount spent', field: 'amountSpent'},
        {name: 'numberOfProducts', label: 'Number of products', field: 'numberOfProducts'},
        {name: 'numberOfTransactions', label: 'Number of transactions', field: 'numberOfTransactions'},
        {name: 'subscribed', label: 'Subscribed?', field: 'subscribed'},
      ],
      data: []
    }
  },
  methods: {
    read() {
      this.data = localStorageDriver.select(table)
    }
  },
  created() {
    this.read()
    //console.log(this.visibleColumns)
  },
  watch: {
    isReload() {
      this.read()
    }
  }
}
</script>

<style scoped>

</style>
