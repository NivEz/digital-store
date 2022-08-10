<template>
  <section class="product-wrapper">
    <div id="gap">
      <ItemImage
        class="product-img"
        :size="{height: '400px'}"
        :imageUrl="editedItem.imageUrl"
      />
    </div>


    <div class="product-info" ref="info">
      <span class="product-title">{{ editedItem.productName }}</span>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum facilisis quam tellus,
        non gravida sapien sagittis ac. Vivamus volutpat tellus eu lacus tempor, ut efficitur magna
        tincidunt. Nullam rutrum eros in orci ultricies rhoncus.
      </p>

      <div class="buttons-wrapper">
        <div class="q-mb-lg prices-text">
          <span>$ {{ editedItem.salePrice }}</span>
          <span>${{ editedItem.originalPrice }}</span>
          <!--          <WishlistIcon class="product-page-favorite"/>-->
        </div>
        <q-btn class="q-mb-md button" @click="addToCart">Add to cart</q-btn>
        <q-btn class="button" @click="buyNow">Buy now</q-btn>
      </div>
    </div>

  </section>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import ItemImage from "components/items/ItemImage";
import WishlistIcon from "components/items/WishlistIcon";


export default {
  name: "ProductPage",
  components: {WishlistIcon, ItemImage},
  computed: mapState('items', ['editedItem']),

  methods: {
    ...mapActions('items', ['setItemByPath']),
    ...mapActions('cart', ['addToCartAC']),

    addToCart() {
      this.addToCartAC(this.editedItem)
    },

    buyNow() {
      this.addToCart(this.editedItem)
      this.goTo('/cart')
    }
  },

  created() {
    this.setItemByPath(this.$route.path)
  }
}
</script>

<style scoped>

.product-wrapper {
}

.product-img {
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 10px;
  box-shadow: 5px -5px 10px rgba(0, 0, 0, 0.85);
}


.product-info {
  height: 400px;
  display: flex;
  flex-direction: column;
  position: relative;
}

.product-title {
  font-size: 36px;
  margin-bottom: 0.5em;
}


.prices-text {
  font-size: 20px;
  width: 60%;
  display: flex;
  gap: 3%;
  align-items: center;
}

.prices-text > span:nth-child(2) {
  margin-left: 10px;
  color: var(--red-price);
  font-size: 16px;
  text-decoration: line-through;
}

.buttons-wrapper {
  margin-top: auto;
  display: flex;
  flex-direction: inherit;
}

.button {
  background: var(--secondary);
  width: 60%;
}

.product-page-favorite {
  margin-left: auto;
}

@media only screen and (max-width: 600px) {

  .product-info {
    margin-top: 0.5em;
  }

  .prices-text {
    align-self: center;
  }

  .button {
    align-self: center;
  }

}

@media only screen and (min-width: 601px) {

  .product-wrapper {
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
  }

  #gap {
    flex-basis: 50%;
  }

  .product-info {
    flex-basis: 50%;
  }


  .product-info > p {
    max-width: 60%;
  }

}


</style>
