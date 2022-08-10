import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'
import items from "./items/index-items"
import users from "./users/index-users"
import cart from "./cart/index-cart"
import orders from "./orders/orders.index"
import wishlist from "./wishlist/wishlist.index"

// import example from './module-example'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      store,
      items,
      users,
      cart,
      orders,
      wishlist
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING
  })

  return Store
})
