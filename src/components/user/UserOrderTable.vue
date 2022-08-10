<template>
  <div class="q-pa-md">
    <section class="order-summary" @click="displayOrder">
      <div>
        <span style="flex-basis: 40%">#Order: {{ order.orderId }}</span>
      </div>
      <div>
        <span style="flex-basis: 20%">{{ new Date(order.timestamp).toDateString() }}</span>
      </div>
      <div>
        <span style="flex-basis: 20%">Items: {{ order.totalNumOfProducts }}</span>
      </div>
      <div>
        <span style="flex-basis: 20%">Total: ${{ order.summary }}</span>
      </div>
      <div>
        <q-icon v-if="displayOrderContent" name="expand_less" class="self-center"/>
        <q-icon v-else name="expand_more" class="self-center"/>
      </div>
    </section>

    <q-table
      :class="[displayOrderContent ? 'order-table active' : 'order-table']"
      dense
      style="background: transparent"
      :rows="order.items"
      :columns="columns"
      row-key="name"
      hide-bottom
      v-slot:body="props"
    >
      <q-tr :props="props">
        <q-td :props="props" key="gamePic" auto-width>
          <ItemImage
            style="box-shadow: 0 0 5px black; border-radius: 3px"
            :props="props"
            :image-url="props.row.imageUrl"
            :size="{width: '60px', height: '80px'}"
            @click="goTo(props.row.productPageRoute)"
            class="cursor-pointer"></ItemImage>
        </q-td>
        <q-td key="productName" :props="props">{{ props.row.productName }}</q-td>
        <q-td key="price" :props="props">$ {{ props.row.salePrice }}</q-td>
        <q-td key="x" auto-width :props="props">x</q-td>
        <q-td key="quantity" :props="props">{{ props.row.quantity }}</q-td>
        <q-td key="itemTotalPrice" auto-width :props="props" style="text-align: center">
          $ {{ props.row.itemTotalPrice }}
        </q-td>
      </q-tr>
    </q-table>
  </div>

</template>

<script>
import ItemImage from "components/items/ItemImage";

export default {
  name: "OrderTable",
  components: {ItemImage},
  props: ['order'],

  data() {
    return {
      columns: [
        {name: 'gamePic', field: '', align: 'left'},
        {name: 'productName', label: 'Product', field: 'product', align: 'left'},
        {name: 'price', label: 'Price', field: 'price', align: 'left'},
        {name: 'x', label: '', align: 'center'},
        {name: 'quantity', label: 'Quantity', field: 'quantity', align: "center"},
        {name: 'itemTotalPrice', label: 'Total Price', field: 'totalPrice', align: "left"}
      ],

      orderContentClass: 'order-table',
      displayOrderContent: false
    }
  },

  methods: {
    displayOrder() {
      this.displayOrderContent = !this.displayOrderContent;
    }
  }
}
</script>

<style>

.order-table {
  max-height: 0;
  transition: 0.7s ease-out;
  left: 50%;
  transform: translateX(-50%);
}

@media only screen and (min-width: 601px) {
  .order-table {
    width: 80%;
  }
}

.active {
  max-height: 100vh;
  transition: 0.7s ease-in;
  margin-bottom: 30px;
}


.order-summary {
  position: relative;
  font-size: 17px;
  display: flex;
  border-radius: 5px;
  border: 1px solid black;
  padding: 10px;
  background: rgba(229, 224, 224, 0.18);
  box-shadow: 0 0 10px rgba(128, 128, 128, 0.62);
  cursor: pointer;
  margin-bottom: 10px;
}

.order-summary > div:first-child {
  word-wrap: break-word;
}

@media only screen and (max-width: 800px) {
  .order-summary {
    flex-direction: column;
  }
}


@media only screen and (min-width: 801px) {
  .order-summary > div:first-child {
    width: 50%;
  }

  .order-summary > div:nth-child(2) {
    width: 16%;
  }

  .order-summary > div:nth-child(3) {
    width: 14%;
    text-align: center;
  }

  .order-summary > div:nth-child(4) {
    width: 14%;
    text-align: center;
  }
}

.order-summary > div:last-child {
  margin-left: auto;
}

</style>
