<template>
    <Welcome></Welcome>
    <Cards></Cards>
</template>

<script>
// @ is an alias to /src
import Cards from "components/items/Cards";
import ItemCard from "components/items/ItemCard";
import Welcome from "components/Welcome";

export default {
  name: 'Home',
  components: {
    Welcome,
    Cards
  },
  data() {
    return {}
  },
  methods: {
  },

  created() {

  }
}
</script>

<style scoped>

</style>
