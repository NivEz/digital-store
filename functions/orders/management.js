const functions = require('firebase-functions');
const admin = require('firebase-admin');

exports.getOrders = functions.https.onCall(async (data, context) => {
  if (context.auth.token.admin !== true) return error("Not admin")
  return admin.firestore().collection('orders').orderBy('timestamp', 'desc').get()
    .then(docSnapshots => {
      const arr = []
      docSnapshots.docs.forEach(doc => {arr.push(doc.data())})
      return arr;
    })
})









