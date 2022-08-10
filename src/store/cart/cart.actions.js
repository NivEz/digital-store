import firestoreCart from '../../middleware/firebase/database/firestore-cart'
import ls from '../../middleware/local-storage'
import cartLS from '../../middleware/local-storage/cart'


export default {
  getCartItemsAC: async ({commit}) => {
    let cartObj;
    if (localStorage.getItem('id')) {
      cartObj = await firestoreCart.getCartItemsFB()
      // ls.setItems('cart', cartObj)
    } else {
      cartObj = ls.getItems('cart')
      if (!cartObj) {
        cartObj = cartLS.createNewCart()
      }
    }
    commit('setCart', cartObj)

    // const cartObj = await firestoreCart.getCartItemsFB()
    // dispatch('_adjustCartPriceAndQuantity', cartObj)
  },

  addToCartAC: async ({commit, dispatch, state}, itemToAdd) => {
    let updatedCart;
    if (localStorage.getItem('id')) {
      updatedCart = await firestoreCart.addToCartFB(itemToAdd)
    } else {
      updatedCart = cartLS.addToCart(itemToAdd)
    }

    commit('setCart', updatedCart)
  },

  removeFromCart: async ({commit, dispatch, state}, itemId) => {
    let userCartObj = JSON.parse(JSON.stringify(state.cart))
    const itemToRemoveIdx = userCartObj.items.findIndex(item => item.itemId === itemId)

    const totalItemPrice = userCartObj.items[itemToRemoveIdx].itemTotalPrice
    const quantity = userCartObj.items[itemToRemoveIdx].quantity

    userCartObj.summary -= totalItemPrice;
    // userCartObj.summary = userCartObj.summary.toFixed(2) // rounding 2 decimal places
    userCartObj.totalNumOfProducts -= quantity;

    if (userCartObj.totalNumOfProducts === 0) userCartObj.summary = 0

    userCartObj.summary = await dispatch('_roundPrice', userCartObj.summary)

    userCartObj.items.splice(itemToRemoveIdx, 1)


    dispatch('updateCart', userCartObj)
  },

  updateCart: async ({commit}, cartObj) => {
    if (localStorage.getItem('id')) {
      await firestoreCart.updateCartPriceAndQuantity(cartObj)
    } else {
      ls.setItems('cart', cartObj)
    }
    commit('setCart', cartObj)
  },


  removeOnlyOneItem: async ({commit, state, dispatch}, {itemId, salePrice}) => {
    const cartObj = JSON.parse(JSON.stringify(state.cart))
    for (let item of cartObj.items) {
      if (item.itemId === itemId) {
        if (item.quantity === 1) return; // last item - don't continue execution.
        item.quantity -= 1;
        item.itemTotalPrice -= salePrice
        item.itemTotalPrice = await dispatch('_roundPrice', item.itemTotalPrice)
        break;
      }
    }
    cartObj.summary -= salePrice;
    cartObj.totalNumOfProducts -= 1;
    // await firestoreCart.updateCartPriceAndQuantity(cartObj)
    // commit('setCart', cartObj)

    cartObj.summary = await dispatch('_roundPrice', cartObj.summary)
    dispatch('updateCart', cartObj)
  },

  _adjustCartPriceAndQuantity: async ({commit, dispatch}, cartObj) => {
    let summary = 0;
    let totalNumOfProducts = 0;
    // if (!cartObj || !cartObj.items.length) return;
    for (let item of cartObj.items) {
      const salePrice = await dispatch('items/getItemPriceById', item.itemId, {root: true})
      item.salePrice = salePrice;
      item.itemTotalPrice = salePrice * item.quantity;
      summary += item.itemTotalPrice;
      totalNumOfProducts += item.quantity;
    }
    cartObj.summary = summary
    cartObj.totalNumOfProducts = totalNumOfProducts
    await firestoreCart.updateCartPriceAndQuantity(cartObj)
    commit('setCart', cartObj)
  },

  _roundPrice: ({}, price) => {
    var re = /\d+\.\d{0,2}/g
    var matches = price.toString().match(re)
    if (matches) {
      return Number(matches[0]) // returns the rounded summary
    } else return 0
  }
}

