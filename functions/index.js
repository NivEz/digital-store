const functions = require("firebase-functions");
const admin = require('firebase-admin');
const orderHandler = require('./orders/index')
// const orderManagement = require('./orders/management')
const permissions = require('./auth/index')

admin.initializeApp();


// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions



// exports.addMessage = functions.https.onRequest(async (req, res) => {
//   const original = req.query.text;
//   const writeResult = await admin.firestore().collection('messages').add({original: original});
//   res.json({result: `Message with ID: ${writeResult.id} added.`});
// });


// exports.getImageFromUrl = functions.firestore.document('games/{gameId}').onCreate((snap, context) => {
//   console.log(snap.data().link, 'I AM TE BEST LINK EVER')
//   console.log(context.params.gameId, 'I AM CONTEXT')
// })



// email verfication
// exports.sendVarification = functions.auth.user().onCreate(user => {
  // admin.auth().
// })



// test function for emulator
exports.testEmulator = functions.https.onCall(async (req, res) => {
  console.log("Emulator works!")
  functions.logger.log("Test passed")
  console.log("nivvvvv")
})


// exports.scheduleScan = functions.pubsub.schedule('* * * * *').timeZone('Asia/Jerusalem').onRun((context) => {
//   console.log("ssssssssss")
//   functions.logger.info("My new update", context)
//   functions.logger.log("This functions is scheduled to run every 1 minutes!")
// })


// exports.checkPic = functions.https.onCall(async (data, context) => {
//   const storage = await admin.storage().bucket()
//   return storage.ref()
// })



/// final functions
// user orders
exports.placeOrder = orderHandler.order.placeOrder

// admin manage orders
exports.getOrders = orderHandler.manage.getOrders

// permissions
// exports.addAdminRole = permissions.addAdminRole
// exports.getUserRecord = permissions.getUserRecord
// exports.deleteAdmin = permissions.deleteAdmin

