<template>
  <div>
    <!--    {{ $route.params.id }}-->
    <br>
    <!--    {{ this.item }}-->
      <AddItem></AddItem>
    </div>
</template>

<script>
import AddItem from "../../components/admin/AddItem";

export default {
  name: "Item",
  components: {
    AddItem
  },
  data() {
    return {
      tableName: 'games'
    }
  },
}
</script>

<style scoped>

</style>
