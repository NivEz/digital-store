export default {
  setCart: (state, cartObj) => state.cart = cartObj,

  setCartSummary: (state, cart) => {
    let summary = 0;
    cart.forEach((item) => {
      console.log(item.totalPrice)
      summary += item.totalPrice;
    })
    console.log("summary", summary)
    state.summary = summary;
  },

  resetCart: (state) => {
    state.cart = {
      items: [],
      summary: 0,
      totalNumOfProducts: 0,
    }
  }
}
