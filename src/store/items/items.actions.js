/**
 * firestoreDB - firestore database.
 * ls - (LS - local storage) module for handling the items in the local storage.
 */
import firestoreDB from '../../middleware/firebase/database/index-firestore'
import ls from '../../middleware/local-storage'

const collectionName = 'items'

export default {

  getItems: async ({commit}) => {
    let items = ls.getItems('items')
    if (!items) {
      items = await firestoreDB.read(collectionName)
      ls.setItems('items', items)
    }

    commit('setItems', items)
  },

  deleteItem: async ({state, commit}, itemId) => {
    //TODO check if there is no state.editedItemId and handle
    await firestoreDB.remove(collectionName, itemId)
    commit('deleteItem', itemId)
  },


  insertItem: async ({state, commit, dispatch}, item) => {
    /**
     * inserting the item to the firestore DB and then updating the state.
     */
    // saves in DB
    if (item.image) item.image = item.image.name;
    dispatch('_generateProductPageRoute', item)

    const savedItem = await firestoreDB.create(collectionName, item)
    // saves in store
    commit('insertItem', savedItem)
    commit('setEditedItem', savedItem)
    commit('setEditedItemId', savedItem.itemId)
  },


  updateItem: async ({state, commit, dispatch}, updatedItem) => {
    if (state.productPageRoute !== updatedItem.productPageRoute) dispatch('_generateProductPageRoute', updatedItem)
    // saves in fr DB
    await firestoreDB.update(collectionName, updatedItem.itemId, updatedItem)
    // saves in store
    commit('updateItemInArr', updatedItem)
    commit('setEditedItem', updatedItem)
    commit('setEditedItemId', updatedItem.itemId)
  },


  setEditedItemById: async ({state, commit}) => {
    let item = state.items.find(item => item.itemId === state.editedItemId);
    if (!state.items.length && !item) {
      item = await firestoreDB.getItemById(collectionName, state.editedItemId)
    }

    commit('setEditedItem', item)
  },

  setItemByPath: async ({state, commit}, itemPath) => {
    let item;
    // checks if the route property is  in the same as the itemPath param
    // if so the item is saved in the store
    if (state.editedItem.productPageRoute !== itemPath) {
      // otherwise find the item from the array (if the array is in the store)
      // if no match found - item will be undefined.
      item = state.items.find(item => item.productPageRoute === itemPath);
      console.log("from store")
      if (!item) {
        // if got till here the store is empty
        // we need to grub the item from firestore DB
        item = await firestoreDB.selectByPath(collectionName, itemPath)
      }
    }
    if (item) commit('setEditedItem', item)
  },


  getItemPriceById: async ({}, itemId) => {
    const item = await firestoreDB.getItemById('items', itemId)
    return Number(item.salePrice);
  },

  _generateProductPageRoute: ({}, item) => {
    /**
     * generating a product url when inserting or updating the product name field.
     */
    const productName = item.productName.toLowerCase()
    var re = /[ \-:!@#$%^&*()\[\]?,.]+/g
    item.productPageRoute = '/' + productName.replace(re, '-')
  }
}

