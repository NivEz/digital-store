import firebaseInstance from "../index"
import {Notify} from "quasar";
import firestoreCart from '../../../middleware/firebase/database/firestore-cart'


async function placeOrder(cartObj) {
  var placeOrder = firebaseInstance.functions.httpsCallable('placeOrder') // not calling yet
  const pendingNotify = Notify.create({
    type: 'ongoing',
    message: 'Processing order...',
    timeout: 0,
    position: 'top'
  })
  // executing the function from the cloud functions
  return placeOrder(cartObj)
    .then(async () => {
      await sleep(1200)
      pendingNotify() // this execution closes the notification
      Notify.create({
        message: 'Purchased successfully!',
        color: 'positive',
        position: 'top'
      })
      const newEmptyCart = {
        items: [],
        summary: 0,
        totalNumOfProducts: 0
      }
      await firestoreCart.updateCartPriceAndQuantity(newEmptyCart)
      return true;
    })

    .catch(error => {
      pendingNotify()
      console.error(error)
      Notify.create({
        message: 'An error has occurred',
        color: 'negative',
        position: 'top'
      })
      return false;
    })
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default {
  placeOrder
}
