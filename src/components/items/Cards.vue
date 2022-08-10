<template>
  <div class="cards-wrapper" ref="wrapper">
    <ItemCard class="card-item" v-for="item of items" :currentItem="item"/>
    <div v-for="i of numOfElementsToAdd" aria-hidden="true"></div>
  </div>
</template>

<script>
import ItemCard from "components/items/ItemCard";
import {mapActions, mapState} from "vuex";


export default {
  name: "Cards",
  components: {ItemCard},

  computed: mapState('items', ['items']),

  data() {
    return {
      numOfCards: 0,
      cardsPerRow: 0,
      numOfElementsToAdd: 0,
    }
  },

  methods: {
    ...mapActions('items', ['getItems']),

    getCardsPerRow(cardWidth, gap) {
      /**
       * calculation of the number of cards per row based on the size of the wrapper element.
       * each screen size will have different wrapper element size.
       * @param {Number} cardWidth the width of the card (in px).
       * @param {Number} gap the size of the gap between each card (in px).
       */
      let cardsPerRow;
      for (let i = 1; i <= 5; i++) {
        const totalCardsWidth = cardWidth * i + gap * (i - 1)
        if (totalCardsWidth > this.$refs.wrapper.clientWidth) {
          break
        }
        cardsPerRow = i;
      }
      this.cardsPerRow = cardsPerRow
    },

    getElementsForLastRow() {
      /**
       * calculating how much hidden elements we need to add (to align the remainder cards in the start).
       * remainder - how much cards are needed to be added for the row to be full.
       * if remainder is 0 it means that no hidden cards need to be added so the v-for will run with 0 iterations.
       * with the cardsPerRow variable (-) remainder we can conclude how much cards we need to add as hidden elements.
       */
      var remainder = this.numOfCards % this.cardsPerRow
      if (remainder === 0) {
        this.numOfElementsToAdd = 0
      } else {
        this.numOfElementsToAdd = this.cardsPerRow - remainder
      }
    }
  },

  mounted() {
    // card width = 250px, gap = 30px
    // this.getCardsPerRow(250, 30)
    // this.getElementsForLastRow()
  },

  created() {
    this.getItems()
      .then(() => {
        this.numOfCards = this.items.length
        this.getCardsPerRow(250, 30)
        this.getElementsForLastRow()
      })
  }
}
</script>

<style scoped>

.cards-wrapper {
  max-width: 1370px;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
}

.cards-wrapper > div {
  height: 350px;
  width: 250px;
}

</style>
