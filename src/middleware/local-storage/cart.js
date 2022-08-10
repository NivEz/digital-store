import ls from "./index"

function createNewCart() {
  const userCartObj = {}
  userCartObj.items = []
  userCartObj.summary = 0
  userCartObj.totalNumOfProducts = 0
  ls.setItems('cart', userCartObj)
  return userCartObj
}


function addToCart(itemToAdd) {
  const cartObj = ls.getItems('cart');

   for (let cartItem of cartObj.items) {
    if (cartItem.itemId === itemToAdd.itemId) {
      // updating the specific item in the cart object
      cartItem.quantity += 1
      cartItem.itemTotalPrice += cartItem.salePrice
      cartItem.itemTotalPrice = _roundPrice(cartItem.itemTotalPrice)
      // updating the cart object
      cartObj.summary += cartItem.salePrice;
      cartObj.totalNumOfProducts += 1

      cartObj.summary = _roundPrice(cartObj.summary)

      ls.setItems('cart', cartObj)
      return cartObj
    }
  }
  // If got till here, that means that the array is empty or there was not any match -
  // the item added to the cart is not in the cart items array.
  cartObj.items.push({
    itemId: itemToAdd.itemId,
    productName: itemToAdd.productName,
    imageUrl: itemToAdd.imageUrl,
    salePrice: itemToAdd.salePrice,
    quantity: 1,
    itemTotalPrice: itemToAdd.salePrice,
    productPageRoute: itemToAdd.productPageRoute
  })

  cartObj.summary += itemToAdd.salePrice;
  cartObj.totalNumOfProducts += 1

  cartObj.summary = _roundPrice(cartObj.summary)

  ls.setItems('cart', cartObj)
  return cartObj
}

function removeItem(itemId) {
  const userCartObj = ls.getItems('cart');
  userCartObj.items = userCartObj.items.filter(item => item.itemId !== itemId)
}

function _roundPrice(price) {
  var re = /\d+\.\d{2}/g
  var matches = price.toString().match(re)
  if (matches) {
    return Number(matches[0]) // returns the rounded summary
  } else return 0
}



export default {
  addToCart,
  createNewCart,
  removeItem
}
