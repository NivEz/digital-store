const cleanItem = {
  productName: '',
  originalPrice: '',
  salePrice: '',
  quantity: '',
  description: '',
  categories: [],
  platforms: [],
  image: '',
  url: '',
  codes: []
}

export default {

  setItems: ((state, items) => state.items = items),

  setEditedItemId: ((state, id) => state.editedItemId = id),

  setEditedItem: ((state, item) => state.editedItem = item),

  resetEditedItemId: ((state) => state.editedItemId = ''),

  resetEditedItem: ((state) => {
    Object.assign(state.editedItem, cleanItem)
    // for (const key in state.editedItem) {
    //   state.editedItem[key] = ''
    // }
    // // delete state.editedItem.id;
  }),

  updateItemInArr: ((state, item) => {
    const index = state.items.findIndex(i => i.itemId === item.itemId)
    state.items.splice(index, 1, item)
  }),

  deleteItem: ((state, itemId) => {
    const index = state.items.findIndex(i => i.itemId === itemId)
    state.items.splice(index, 1);
  }),

  insertItem: ((state, item) => {
    state.items.push(item)
  })

}
