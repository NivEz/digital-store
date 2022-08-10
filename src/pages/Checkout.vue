<template>

  <section class="summary-wrapper">

    <CartSummary class="summary" :function="buyNowTrigger"></CartSummary>

    <div class="payment-provider-wrapper">
      <q-radio class="radio" v-model="provider" val="paypal" label="PayPal"/>
      <q-radio class="radio" v-model="provider" val="creditCard" label="Credit Card"/>
      <q-radio class="radio" v-model="provider" val="bitcoin" label="Bitcoin"/>
    </div>
  </section>

</template>

<script>
import orderHandler from "/src/middleware/firebase/database/firestore.orders"
import CartSummary from "components/CartSummary";
import {mapMutations} from "vuex";

export default {
  name: "Checkout",
  components: {CartSummary},

  data() {
    return {
      buyNowTrigger: 'someFunc',
      provider: 'paypal'
    }
  },

  methods: {
    ...mapMutations('cart', ['setCart']),

    async checkout() {
      if (!localStorage.getItem('id')) {
        this.$q.notify({
          color: 'negative',
          message: 'You must be logged in to purchase.'
        })
      } else {
        if (this.$store.state.cart.cart.totalNumOfProducts === 0) return;
        const successfulOrder = await orderHandler.placeOrder(this.$store.state.cart.cart)
        if (successfulOrder) {
          const newEmptyCart = {
            items: [],
            summary: 0,
            totalNumOfProducts: 0
          }
          this.setCart(newEmptyCart)
          this.goTo('/thank-you')
        }
      }
    }
  },

  created() {
    this.buyNowTrigger = () => {
      this.checkout()
    }
  }
}
</script>

<style scoped>

@media only screen and (min-width: 800px) {
  .summary-wrapper {
    display: flex;
    justify-content: center;
    gap: 30px;
    flex-direction: row-reverse;
  }
}


.payment-provider-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  flex-basis: 30%;
  border: 1px solid black;
  border-radius: 8px;
}

.radio {
  border-radius: 5px;
  cursor: pointer;
  height: 100%;
  /*opacity: 0.6;*/
}


.radio:hover {
  transition: 0.4s;
  /*opacity: 1;*/
  background: var(--secondary);
}

.summary {
  flex-basis: 30%;
}

</style>
