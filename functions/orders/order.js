const functions = require('firebase-functions');
const admin = require('firebase-admin');


const errorCodes = {
  permission: {
    code: "permission-denied",
    message: "The firewall has detected a try to abuse the ordering system."
  },
  firestoreError: {
    code: "internal",
    message: "An error has occurred, please try again later."
  }
}

//TODO add logs (with error code and level) to the admin collection
exports.placeOrder = functions.https.onCall(async (data, context) => {
  // const hasError = false;
  if (!await isPriceAndQuantityValid(data)) {
    throw new functions.https.HttpsError(errorCodes.permission.code, errorCodes.permission.message)
  }
  // const timestamp = new Date().getTime()
  // const orderId = timestamp + '-' + context.auth.uid
  data.timestamp = new Date().getTime()
  const buyerId = context.auth.uid;
  if (!buyerId) throw new functions.https.HttpsError(errorCodes.firestoreError.code, errorCodes.firestoreError.message)

  const newDocRef = await admin.firestore().doc(`users/${buyerId}`)
    .collection('orders').add(data)
    .catch((error) => {
      functions.logger.error(error)
      throw new functions.https.HttpsError(errorCodes.firestoreError.code, errorCodes.firestoreError.message)
    })
  const orderId = newDocRef.id
  await newDocRef.update({orderId})

  // modifying data for the admin orders collection
  data.orderId = orderId;
  data.buyerId = buyerId;
  data.buyer = context.auth.token.email;
  admin.firestore().doc(`orders/${orderId}`).set(data)
    .catch(error => {
      functions.logger.error(error)
      throw new functions.https.HttpsError(errorCodes.firestoreError.code, errorCodes.firestoreError.message)
    })
})


async function isPriceAndQuantityValid(cartObj) {
  let summary = 0;
  let finalQuantity = 0;
  for (let item of cartObj.items) {
    const itemDocData = (await admin.firestore().doc(`items/${item.itemId}`).get()).data()
    functions.logger.log("item", itemDocData)
    const originalSalePrice = itemDocData.salePrice;
    if (originalSalePrice !== item.salePrice) return;
    if (itemDocData.productName !== item.productName) return;

    summary += originalSalePrice * item.quantity;
    finalQuantity += item.quantity;
  }
  if (cartObj.summary - 1 <= summary <= cartObj.summary + 1
    && finalQuantity === cartObj.totalNumOfProducts) return true
}


async function addOrderToUser(orderData, buyerId) {
  admin.firestore().doc(`users/${buyerId}/orders`).add(orderData)
    .catch((error) => {
      functions.logger.error(error)
      throw new functions.https.HttpsError(errorCodes.firestoreError.code, errorCodes.firestoreError.message)
    })
}







async function addKeysToBuyerOrderSubcoll(itemId) {
  const docRef = admin.firestore().doc(`games/${itemId}/keys/unsold`)
  const docData = (await docRef.get()).data()
  const keys = docData.availableKeys
  const key = keys.shift() // grabs the first item in the array and deletes it.
  await docRef.update({
    "availableKeys": admin.firestore.FieldValue.arrayRemove(key)
  })

  const docRef2 = admin.firestore().doc(`games/${itemId}/keys/sold`)
  const docData2 = (await docRef.get()).data()
  const soldKeys = docData2.soldKeys
  if (soldKeys.includes(key)) throw new functions.https.HttpsError(errorCodes.firestoreError.code, errorCodes.firestoreError.message)
  await docRef2.update({
    "soldKeys": admin.firestore.FieldValue.arrayUnion({
      key,
      owner: 'uid',
      orderId: 'sdf321'
    })
  })
}
