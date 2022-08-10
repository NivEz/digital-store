<template>
  <div class="q-pa-md">
    <h6 class="text-center">Products management</h6>
    <div>
      <q-table
        :rows="items"
        :columns="columns"
        row-key="name"
        :selected-rows-label="getSelectedString"
        selection="multiple"
        v-model:selected="selected"
        :selected.sync="selected"
        ref="pagination"
      >

        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="productName" :props="props">
              <q-checkbox v-model="props.selected" @update:model-value="alert('x')"/>
            </q-td>
            <q-td key="productName" :props="props" @dblclick="goTo('/item/' + props.row.itemId)">{{ props.row.productName }}</q-td>
            <q-td key="id" :props="props">{{ props.row.itemId }}</q-td>
            <q-td key="price" :props="props">$ {{ props.row.salePrice }}</q-td>
            <q-td key="quantity" :props="props" style="text-align: center">{{ props.row.quantity }}</q-td>
            <q-td key="actions" :props="props">{{ props.row.actions }}
              <q-icon
                class="text-grey-9 cursor-pointer"
                name="delete_forever"
                size="32px"
                @click="remove(props.row.itemId)"
              />
            </q-td>
          </q-tr>
        </template>
      </q-table>


    </div>

  </div>

</template>

<script>
import {mapState, mapActions, mapMutations} from 'vuex'

export default {
  name: "ItemsTable",
  data() {
    return {
      val: false,
      headerSelected: false,
      selected: [],
      columns: [
        {name: 'productName', required: true, label: 'Product', align: 'left', field: 'productName', sortable: true},
        {name: 'id', align: 'left', label: 'Game ID', field: 'id', sortable: true},
        {name: 'price', align: 'left', label: 'Price', field: 'price', sortable: true},
        {
          name: 'quantity', align: 'center', label: 'Quantity in stock', field: 'quantity', sortable: true,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
        },
        {name: 'actions', align: 'left', label: 'Actions'}
      ],
      data: [],

    }
  },

  computed: mapState('items', ['editedItemId', 'items']),

  methods: {
    ...mapActions('items', ['getItems', 'deleteItem']),
    ...mapMutations('items', ['resetEditedItem']),

    myFunc(something) {
      // console.log(something)
      // return
      console.log("clicked on row")
      console.log(something)
      if (something.vall) {
        this.selected.push(something)
      } else {
        let index = this.selected.indexOf(something)
        if (index !== -1) this.selected.splice(index, 1)
      }

    },

    getSelectedString() {
      return this.selected.length === 0 ? '' : `${this.selected.length} record${this.selected.length > 1 ? 's' : ''} selected of ${this.data.length}`
    },

    remove(itemId) {
      this.deleteItem(itemId)
    },


  },

  created() {
    console.log(this.$refs.pagination)
    // saves the items in the store
    this.getItems()
    // TODO check if resetEditedItem is needed
    // .then(()=>this.resetEditedItem())

  }
}

</script>

<style scoped>

.my-table-header {
  /*background: #9C27B0;*/
  /*height: 200px;*/
  /*width: 200px;*/
}


</style>
