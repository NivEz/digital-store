import firebaseInstance from "../index"

async function getInventory(userId) {
  const querySnapshot = await firebaseInstance.firestore.doc(`users/${userId}`).collection('orders')
    .orderBy('timestamp', 'desc')
    .get()
  const inventory = []
  querySnapshot.forEach(doc => {
    inventory.push(doc.data())
  })
  return inventory
}

export default {
  getInventory
}
