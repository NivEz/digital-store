<template>
  <ItemsTable>
  </ItemsTable>

  <div class="add-item" @click="goTo('/item/new')">
    <q-icon name="add" size="50px"/>
  </div>

</template>

<script>
import ItemsTable from "components/admin/ItemsTable";

export default {
  name: "Stock",
  components: {ItemsTable}
}
</script>

<style scoped>

.add-item {
  position: fixed;
  right: 10px;
  bottom: 10px;
  width: 5%;
  padding: 10px;
  background: transparent;
  border: 1px solid grey;
  border-radius: 45%;
  box-shadow: 0 10px 10px lightgray;
  display: flex;
  justify-content: center;
  cursor: pointer;
}

.add-item:hover {
  transition: 0.5s;
  background: rgba(156, 156, 156, 0.13);
}

</style>
