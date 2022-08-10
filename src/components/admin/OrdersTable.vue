<template>
  <div class="q-pa-md">
    <h6 class="text-center">Orders</h6>
    <div>
      <q-table
        :rows="extractedOrders"
        :columns="columns"
        row-key="name"
        ref="pagination"
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="date" :props="props" @dblclick="goToItem(props.row.id)">{{ unixToDate(props.row.timestamp) }}
            </q-td>
            <q-td key="orderId" :props="props">{{ props.row.orderId }}</q-td>
            <q-td key="buyer" :props="props">{{ props.row.buyer }}</q-td>
            <q-td key="productName" :props="props" @dblclick="openItem(props.row.id)">{{ props.row.productName }}</q-td>
            <q-td key="productId" :props="props">{{ props.row.itemId }}</q-td>
            <q-td key="salePrice" :props="props">$ {{ props.row.salePrice }}</q-td>
            <q-td key="quantity" :props="props">{{ props.row.quantity }}</q-td>
            <q-td key="totalPrice" :props="props" style="background: lightgreen; text-align: center">$
              {{ props.row.itemTotalPrice }}
            </q-td>
          </q-tr>
        </template>
      </q-table>


    </div>

  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import firebaseInstance from "../../middleware/firebase/index"

export default {
  name: "OrdersTable",

  computed: mapGetters('orders', ['extractedOrders']),

  methods: {
    ...mapActions('orders', ['getOrdersAC']),

    unixToDate(timestamp) {
      return new Date(timestamp).toDateString()
    },

    openItem(itemId) {
      this.goTo(`/item/${itemId}`)
    }
  },

  data() {
    return {
      selected: [],
      columns: [
        {name: 'date', label: 'Date', align: 'left', field: 'date', sortable: true},
        {name: 'orderId', label: 'Order ID', align: 'left', field: 'productName'},
        {name: 'buyer', label: 'Buyer', align: 'left', field: 'buyer'},
        {name: 'productName', label: 'Product', align: 'left', field: 'productName', sortable: true},
        {name: 'productId', align: 'left', label: 'Product ID', field: 'productId'},
        {name: 'salePrice', align: 'left', label: 'Price', field: 'salePrice', sortable: true},
        {
          name: 'quantity', align: 'left', label: 'Quantity', field: 'quantity', sortable: true,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
        },
        {name: 'totalPrice', align: 'center', label: 'Total'}
      ],
      data: [],
    }
  },

  created() {
    this.getOrdersAC()
    .catch(err => console.error(err))
  }
}
</script>

<style scoped>

</style>
