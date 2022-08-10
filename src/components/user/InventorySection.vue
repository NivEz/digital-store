<template>
  <section v-if="myInventory.length">
    <UserOrderTable v-if="loaded" :order="order" v-for="order in myInventory"></UserOrderTable>
  </section>

  <div v-else-if="loaded">Nothing in here...</div>
</template>

<script>
import UserOrderTable from "components/user/UserOrderTable";
import {mapActions, mapState} from "vuex"

export default {
  name: "InventorySection",
  components: {UserOrderTable},

  data() {
    return {
      loaded: false
    }
  },

  computed: mapState('orders', ['myInventory']),
  methods: {
    ...mapActions('orders', ['getUserInventory'])

  },
  async created() {
    await this.getUserInventory()
    this.loaded = true
  }
}
</script>

<style scoped>

section {
  padding: 5px;
  border: 1.25px solid black;
  border-radius: 3px;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}

@media only screen and  (min-width: 801px) {
  section {
    width: 90%;
  }
}

@media only screen and  (min-width: 950px) {
  section {
    width: 80%;
  }
}

</style>
