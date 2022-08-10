<template>

  <section class="card-container">
<!--    <WishlistIcon class="favorite"/>-->
    <div @click="goTo(currentItem.productPageRoute)">
      <div class="item-image-wrapper">

        <ItemImage
          class="item-image"
          :image-url="currentItem.imageUrl"
          :size="{height: 'inherit', width: 'inherit'}">
        </ItemImage>
<!--        <img :src="currentItem.imageUrl" alt="item image">-->
      </div>

      <div class="item-info">
        <span>{{ currentItem.productName }}</span>
        <div class="prices-wrapper">
          <span id="sale-price">$ {{ currentItem.salePrice }}</span>
          <span id="original-price">${{ currentItem.originalPrice }}</span>
        </div>
      </div>
    </div>

    <div class="buttons">
      <q-btn flat icon="add_shopping_cart" @click="addToCart"/>
      <q-btn flat @click="buyNow">Buy now</q-btn>
    </div>
  </section>
</template>

<script>
import WishlistIcon from "components/items/WishlistIcon";
import ItemImage from "components/items/ItemImage";
import {mapActions} from "vuex";

export default {
  name: "ItemCard",
  components: {ItemImage, WishlistIcon},
  props: ['currentItem'],

  methods: {
    ...mapActions('cart', ['addToCartAC']),

    addToCart() {
      this.addToCartAC(this.currentItem)
    },

    buyNow() {
      this.addToCart(this.currentItem)
      this.goTo('/cart')
    }
  },

}
</script>

<style scoped>

.card-container {
  width: 250px;
  height: 350px;
  background: var(--secondary);
  border-radius: 10px;
  position: relative;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
  cursor: pointer;
}

.item-image-wrapper {
  width: 100%;
  height: 300px;
  overflow: hidden;
  border-radius: 10px 10px 0 0;
}

.item-image {
  width: inherit;
  height: inherit;
  transition: 0.6s;
}

.item-image:hover {
  transition: 0.6s;
  transform: scale(1.15, 1.15);
}

.favorite {
  right: 0;
  z-index: 1;
  position: absolute;
}

.item-info {
  position: absolute;
  top: 230px;
  background: rgba(0, 0, 0, 0.5);
  height: 70px;
  width: 100%;
  display: flex;
  flex-direction: column;
  color: white;
}

.item-info > span {
  align-self: center;
  padding: 5px;
  font-size: 20px;
}

.item-info .prices-wrapper {
  display: flex;
  justify-content: space-evenly;
  font-size: 16px;
}

#sale-price {

}

#original-price {
  color: #f83f3f;
  text-decoration: line-through;
}


.buttons {
  display: flex;
  height: 50px;
}

.buttons > *:first-child {
  flex-grow: 1;
}

.buttons > *:nth-child(2) {
  flex-grow: 3;
}

</style>
