<template>
  <div class="q-pa-md">
    <div class="row">

      <div class="col-12 row">
        <h6 class="col-6" style="margin-bottom: 0">Image URL:</h6>
        <h6 class="col-6" style="margin-bottom: 0">Title:</h6>

<!--        <q-file class="col-6 q-pa-lg" accept=".jpg, image/*" outlined v-model="localEditedItem.image" label="Image">-->
<!--          <q-icon name="attach_file" size="24px"/>-->
<!--        </q-file>-->
        <q-input class="col-6 q-pa-lg" outlined v-model="localEditedItem.imageUrl" label="Image URL"/>
        <q-input class="col-6 q-pa-lg" outlined v-model="localEditedItem.productName" label="Product name"/>
      </div>


      <div class="col-12 row">
        <h6 class="col-4" style="margin-bottom: 0">Original price:</h6>
        <h6 class="col-4" style="margin-bottom: 0">Sale price:</h6>
        <h6 class="col-4" style="margin-bottom: 0">Quantity:</h6>

        <q-input class="col-4 q-pa-lg" outlined v-model="localEditedItem.originalPrice" label="Original rice"/>
        <q-input class="col-4 q-pa-lg" outlined v-model="localEditedItem.salePrice" label="Sale price"/>
        <q-input class="col-4 q-pa-lg" outlined v-model="localEditedItem.quantity" label="Quantity"/>

      </div>



      <h6 style="margin-bottom: 0">Description:</h6>
      <div class="col-12 q-gutter-sm q-pa-lg">
        <q-input type="textarea" outlined filled v-model="localEditedItem.description"
                 label="Paste some product description here..."/>
      </div>

      <!--      <div>-->
      <!--        <q-file outlined v-model="file" label="Upload file">-->
      <!--          <q-icon name="attach_file"/>-->
      <!--        </q-file>-->
      <!--        <q-circular-progress-->
      <!--          value="progress"-->
      <!--          size="50px"-->
      <!--          :thickness="0.22"-->
      <!--          color="teal"-->
      <!--          track-color="grey-3"-->
      <!--          class="q-ma-md"-->
      <!--        />-->
      <!--      </div>-->
    </div>
    <q-btn v-if="$route.params.itemId === 'new'" color="white" text-color="black" label="Insert" @click="insert"/>
    <q-btn v-else-if="$route.params.itemId" color="white" text-color="black" label="Update" @click="update"/>
  </div>
</template>

<script>
import {mapState, mapActions, mapMutations} from 'vuex'
import firebaseDatabase from '../../middleware/firebase/database/index-db'
import fs from "../../middleware/firebase/database/index-firestore"

export default {
  name: "AddItem",
  props: ['tableName'],

  computed: mapState('items', ['editedItem']),

  data() {
    return {
      localEditedItem: {
        productName: '',
        imageUrl: '',
        originalPrice: '',
        salePrice: '',
        quantity: '',
        description: '',
        productPageRoute: '',
      }
    }
  },

  methods: {
    ...mapActions('items', ['insertItem', 'updateItem', 'setEditedItemById']),
    ...mapMutations('items', ['setEditedItem', 'setEditedItemId', 'resetEditedItem']),

    // setLocalEditedItem() {
    //   this.setEditedItem(this.localEditedItem);
    // },

    insert() {
      this.convertInputsToNumber()
      const copyLocalItem = Object.assign({}, this.localEditedItem)
      this.insertItem(copyLocalItem)
        .then(() => {
          this.$q.notify({
            color: 'positive',
            message: `Added ${this.localEditedItem.productName} to stock.`
          })
          this.resetInputs(this.localEditedItem)
        })
    },

    update() {
      this.convertInputsToNumber()
      const copyLocalItem = Object.assign({}, this.localEditedItem)
      this.updateItem(copyLocalItem)
    },

    convertInputsToNumber() {
      this.localEditedItem.salePrice = Number(this.localEditedItem.salePrice)
      this.localEditedItem.originalPrice = Number(this.localEditedItem.originalPrice)
      this.localEditedItem.quantity = Number(this.localEditedItem.quantity)
    }
  },

  created() {
    // check if we edit item or adding new based on the url.
    if (this.$route.params.itemId !== 'new') {
      // setting up the item ID in the store based on the id from the url.
      this.setEditedItemId(this.$route.params.itemId)
      // with the item ID we can now find the item in the store (if not we search in fr DB)
      this.setEditedItemById()
        .then(() => {
          Object.assign(this.localEditedItem, this.editedItem)
        })
    }
  }
}
</script>

<style scoped>

</style>
