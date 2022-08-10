<template>
  <q-icon
    @click="addToWishlist"
    class="wishlist"
    :name="wishlist ? 'favorite' : 'favorite_border'"
    size="40px"
  />
<!--  favorite-->
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name: "WishlistIcon",

  computed: mapState('wishlist', ['wishlist']),

  data() {
    return {
      wishlist: false
    }
  },

  methods: {
    ...mapActions('wishlist', ['']),

    addToWishlist() {
      this.wishlist = !this.wishlist
    }
  },

  created() {
    // this.getWishlist()
  }
}
</script>

<style scoped>

.wishlist {
  color: #f83f3f;
  cursor: pointer;
}

</style>
