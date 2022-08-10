import firebaseInstance from "../index"
import {Notify} from 'quasar'

const collectionName = 'users'

async function getCartItemsFB() {
  const userId = localStorage.getItem('id')
  if (userId) {
    const docSnapshot = await firebaseInstance.firebase.firestore().collection(collectionName).doc(userId).get()
    const userCartObj = docSnapshot.data().cart
    return userCartObj
  }
}

async function addToCartFB(itemToAdd) {
  const userId = localStorage.getItem('id')
  if (userId) {
    const docRef = await firebaseInstance.firebase.firestore().collection('users').doc(userId)
    const docSnapshot = await docRef.get()
    let userCartObj = await docSnapshot.data().cart
    // if the userCartObj is undefined create a new one and attach an empty array of items in it.
    if (!userCartObj) {
      userCartObj = {}
      userCartObj.items = []
      userCartObj.summary = 0
      userCartObj.totalNumOfProducts = 0
    }
    for (let cartItem of userCartObj.items) {
      if (cartItem.itemId === itemToAdd.itemId) {
        // updating the specific item in the cart object
        cartItem.quantity += 1
        cartItem.itemTotalPrice += cartItem.salePrice
        cartItem.itemTotalPrice = _roundPrice(cartItem.itemTotalPrice)
        // updating the cart object
        userCartObj.summary += cartItem.salePrice;
        userCartObj.totalNumOfProducts += 1

        // sending the update to firestore and finishing the function
        userCartObj.summary = _roundPrice(userCartObj.summary)
        docRef.update({cart: userCartObj})
        return userCartObj
      }
    }
    // If got till here, that means that the array is empty or there was not any match -
    // the item added to the cart is not in the cart items array.
    userCartObj.items.push({
      itemId: itemToAdd.itemId,
      productName: itemToAdd.productName,
      imageUrl: itemToAdd.imageUrl,
      salePrice: itemToAdd.salePrice,
      quantity: 1,
      itemTotalPrice: itemToAdd.salePrice,
      productPageRoute: itemToAdd.productPageRoute
    })

    userCartObj.summary += itemToAdd.salePrice;
    userCartObj.totalNumOfProducts += 1

    // update firestore and finish the function with return
    userCartObj.summary = _roundPrice(userCartObj.summary)
    docRef.update({cart: userCartObj})
    return userCartObj
  }
}


async function removeItemFromCart(itemId) {
  const userId = localStorage.getItem('id')
  if (!userId) return;
  const docRef = await firebaseInstance.firebase.firestore().collection('users').doc(userId)
  const docSnapshot = await docRef.get()
  let userCartObj = docSnapshot.data().cart
  // const itemToRemoveIdx = userCartObj.items.findIndex(item => item.id === itemId)
  //
  // const totalItemPrice = userCartObj.items[itemToRemoveIdx].itemTotalPrice
  // const quantity = userCartObj.items[itemToRemoveIdx].quantity
  //
  // userCartObj.summary -= totalItemPrice;
  // // userCartObj.summary = userCartObj.summary.toFixed(2) // rounding 2 decimal places
  // userCartObj.totalNumOfProducts -= quantity;
  // if (userCartObj.summary === 0 && userCartObj.totalNumOfProducts === 0) {
  //   // that means the cart is empty and the regex round will lead to an error (no matches).
  // }
  // var re = /\d+\.\d{2}/g
  // var matches = userCartObj.summary.toString().match(re)
  // if (matches) {
  //   var roundedSummary = Number(matches[0])
  //   userCartObj.summary = roundedSummary
  // }
  //
  // userCartObj.items.splice(itemToRemoveIdx, 1)
  docRef.update({cart: userCartObj})
  return userCartObj
}


async function updateCartPriceAndQuantity(updatedCartObj) {
  const userId = localStorage.getItem('id')
  if (!userId) return;
  const docRef = await firebaseInstance.firebase.firestore().collection('users').doc(userId)
  // const docSnapshot = await docRef.get()
  docRef.update({cart: updatedCartObj})
    .catch(error => {
      console.error(error)
      Notify.create({
        message: "Something went wrong. Please refresh the page and try again later.",
        color: "negative",
        timeout: 3000
      })
    })
}


async function decrementOneItem(itemId) {
  /**
   * this function will remove only one copy of item from the cart.
   * When the item reaches 1 quantity this function will not be triggered anymore.
   * @type {string}
   */
  const userId = localStorage.getItem('id')
  if (!userId) return;
  const docRef = await firebaseInstance.firebase.firestore().collection('users').doc(userId)
  const docSnapshot = await docRef.get()
}

function _roundPrice(price) {
  var re = /\d+\.\d{0,2}/g
  var matches = price.toString().match(re)
  if (matches) {
    return Number(matches[0]) // returns the rounded summary
  } else return 0
}


export default {
  getCartItemsFB,
  addToCartFB,
  removeItemFromCart,
  updateCartPriceAndQuantity
}
