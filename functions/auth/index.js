// import {error} from "firebase-functions/lib/logger";

const functions = require('firebase-functions');
const admin = require('firebase-admin');

exports.addAdminRole = functions.https.onCall((data, context) => {
  return admin.auth().setCustomUserClaims(context.auth.uid, {
    admin: true
  }).then(() => {
    functions.logger.log(context.auth.uid)
    return 'Success!'
  })
    .catch(err => err)
})


exports.getUserRecord = functions.https.onCall((data, context) => {
  return admin.auth().getUser(context.auth.uid)
    .then(userRecord => {
      functions.logger.log(context.auth.uid)
      functions.logger.log(userRecord)
      return userRecord.customClaims
    })
    .catch(err => functions.logger.error(err))
})


exports.deleteAdmin = functions.https.onCall((data, context) => {
  return admin.auth().setCustomUserClaims(context.auth.uid, null)
    .then(() => 'Deleted admin!')
    .catch(err => err)
})

exports.setUser = functions.https.onCall(async (data, context) => {
  await admin.auth.createUserWithEmailAndPassword(data.email, data.password)
    .catch(err => error(err))
  delete data.password;
  delete data.rePassword;

  return await admin.firestore.collection('users').doc(context.auth.uid)
    .set(data)
    .then(() => true)
    .catch((error) => {
      console.error(error)
    })
  }
)
