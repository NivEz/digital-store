<template>
  <div :class="$q.screen.width > 800 ? 'q-pa-md q-pt-xl page-wrapper' : ''" v-if="cart.items.length">

    <div v-if="$q.screen.width <= 800" id="to-cart-summary" @click="scrollDown">
      <span>To payment</span>
      <q-icon name="arrow_downward"/>
      <q-icon name="payment"/>
    </div>

    <q-table
      class="cart-table"
      style="background: rgba(229,224,224,0.18)"
      :rows="cart.items"
      :columns="columns"
      row-key="name"
      v-slot:body="props"
    >
      <q-tr :props="props">
        <q-td :props="props" key="gamePic">
          <ItemImage
            class="productImage"
            :size="{height: '100px', width: '65px'}"
            :image-url="props.row.imageUrl"
            @click="goTo(props.row.productPageRoute)"></ItemImage>
        </q-td>
        <q-td key="productName" :props="props">{{ props.row.productName }}</q-td>
        <q-td key="price" :props="props">$ {{ props.row.salePrice }}</q-td>
        <q-td key="quantity" :props="props">
          <q-btn
            icon="remove" flat
            @click="removeOneItem(props.row.itemId, props.row.salePrice)"
            :class="[props.row.quantity > 1 ? 'cursor-pointer' : 'cursor-not-allowed']"
          />
          {{ props.row.quantity }}
          <q-btn
            icon="add" flat
            @click="addOneItem(props.row)"

          />
        </q-td>
        <q-td key="itemTotalPrice" :props="props">$ {{ props.row.itemTotalPrice }}</q-td>
        <q-td key="actions" :props="props">
          <q-icon
            class="text-grey-9 cursor-pointer"
            name="delete_forever"
            size="32px"
            @click="remove(props.row.itemId)"
          />
        </q-td>
      </q-tr>
    </q-table>

    <q-space/>

    <CartSummary
      :function="goToTrigger"
      :class="$q.screen.width <= 800 ? 'q-mt-lg' : ''"></CartSummary>

    <q-space/>

  </div>

  <div v-else class="empty-cart absolute-center">
    <q-icon name="remove_shopping_cart" size="xl" color="grey-9"/>
    <div class="q-mt-lg">You cart is empty!</div>
  </div>
</template>

<script>
import {mapState, mapActions, mapMutations} from 'vuex'
import ItemImage from "components/items/ItemImage";
import CartSummary from "components/CartSummary";


export default {
  name: "Cart",
  components: {CartSummary, ItemImage},
  computed: mapState('cart', ['cart']),

  data() {
    return {
      goToTrigger: 'someFunc',
      columns: [
        {name: 'gamePic', field: '', align: 'left'},
        {name: 'productName', label: 'Product', field: 'product', align: 'left'},
        {name: 'price', label: 'Price', field: 'price', align: 'left'},
        {name: 'quantity', label: 'Quantity', field: 'quantity', align: "center"},
        {name: 'itemTotalPrice', label: 'Total Price', field: 'totalPrice', align: "left"},
        {name: 'actions', label: '', align: 'center'}
      ],
      totalPrice: 0,
      text: ''
    }
  },
  methods: {
    ...mapActions('cart', ['getCartItemsAC', "addToCartAC", 'removeFromCart', 'removeOnlyOneItem']),
    ...mapMutations('cart', ['setCartSummary']),

    remove(id) {
      this.removeFromCart(id)
    },

    addOneItem(itemToAdd) {
      this.addToCartAC(itemToAdd)
    },

    removeOneItem(itemId, salePrice) {
      this.removeOnlyOneItem({itemId, salePrice})
    },

    checkout() {
      this.$router.push('/checkout')
    },

    scrollDown() {
      window.scrollTo({
        top: document.body.scrollHeight,
        left: 0,
        behavior: 'smooth'
      })
    }
  },

  created() {
    this.goToTrigger = () => {
      this.goTo('/checkout')
    }
  }


}
</script>

<style scoped>

.page-wrapper {
  display: flex;
}

.cart-table {
  flex-basis: 70%;
}

.productImage {
  border-radius: 5px;
  box-shadow: 0 0 5px black;
  cursor: pointer;
}


#to-cart-summary {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}


.empty-cart {
  position: absolute;
  top: 50%;
  left: 50%;
  text-align: center;
}


</style>
