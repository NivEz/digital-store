<template>
  <div class="page-layout">
    <section>
      <div class="wrapper">
        <div @click="goTo('/admin/stock')">
          <p class="admin-card-text">Stock management</p>
          <q-icon class="admin-card-icon" name="inventory" size="40px"></q-icon>
        </div>
        <div @click="goTo('/admin/orders')">
          <p class="admin-card-text">Orders</p>
          <q-icon class="admin-card-icon" name="receipt_long" size="40px"></q-icon>
        </div>
        <div @click="goTo('/admin/users')">
          <p class="admin-card-text">Users and permissions</p>
          <q-icon class="admin-card-icon" name="manage_accounts" size="40px"></q-icon>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import AddItem from "components/admin/AddItem";

import firebaseInstance from "../../middleware/firebase"
import firebase from "app/firebase.json";

export default {
  name: "Admin",
  components: {
    AddItem,
  }
}
</script>

<style lang="css" scoped>

.page-layout {
  /*position: relative;*/
  /*background: #1D1D1D;*/
}

section {
  /*position: absolute;*/
  /*top: 30px;*/
}

.wrapper {
  display: flex;
  justify-content: space-around;
  position: relative;
  flex-wrap: wrap;
  /*width: 100%;*/
  top: 100px;
}

.wrapper > div {
  height: 250px;
  width: 250px;
  background: #c8c9c8;
  border-radius: 7px;
  box-shadow: 0 0 10px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.admin-card-text {
  font-size: 18px;
  transform: translateY(-100%);
}

.admin-card-icon {

}


.wrapper > div:hover {
  opacity: 0.85;
  transition: 0.1s;
}

.wrapper > div:hover .admin-card-icon {
  transform: scale(2, 2);
  transition: 0.75s;
  opacity: 1;
  text-shadow: 0 0 5px black;
}
</style>
