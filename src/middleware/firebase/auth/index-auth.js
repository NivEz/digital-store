import firebaseInstance from '../index'
import {Notify} from 'quasar'

const collectionName = 'users'

async function setUser(userDetails) {
  const {email, password} = userDetails;
  const userResult = await firebaseInstance.firebase.auth().createUserWithEmailAndPassword(email, password)
  delete userDetails.password;
  delete userDetails.rePassword;

  userDetails.cart = {
    items: [],
    summary: 0,
    totalNumOfProducts: 0
  }
  await firebaseInstance.firebase.firestore().collection(collectionName).doc(userResult.user.uid)
    .set(userDetails)
    .then(() => true)
    .catch((error) => {
      console.error(error)
      return false
    })
}

function loginFB(email, password) {
  return firebaseInstance.firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCreds) => {
      _addNotify('Logged in successfully', 'positive')
      return true
    })
    .catch((error) => {
      _addNotify(error.message, 'negative')
    })
}

function logoutFB() {
  firebaseInstance.firebase.auth().signOut()
    .catch((error) => {
      console.error(error)
    })
}

async function getUserFromFrFB(userId) {
  let userDetails = {}
  const querySnapshot = await firebaseInstance.firebase.firestore().doc(`users/${userId}`).get()
  userDetails = querySnapshot.data()
  // querySnapshot.((doc) => {
  //   if (doc.id === userId) {
  //     userDetails = doc.data()
  //   }
  // })
  if (userDetails) return userDetails
}


async function updateUser(collectionName, itemId, newUpdates) {
  await firebaseInstance.firebase.firestore().collection(collectionName).doc(itemId).update(newUpdates)
    .catch((error) => {
      console.error(error)
    })
}

async function reAuthenticate(currentPassword) {
  const user = await firebaseInstance.firebase.auth().currentUser;
  const credentials = await firebaseInstance.firebase.auth.EmailAuthProvider.credential(user.email, currentPassword);
  return user.reauthenticateWithCredential(credentials).then(() => {
    return user
  }).catch((error) => {
    if (error.code === 'auth/wrong-password') {
      _addNotify('Incorrect password!', 'negative')
    }
    return false
  });
}


function changePassword(user, newPassword) {
  user.updatePassword(newPassword)
    .then(() => {
      _addNotify('Password updated successfully.', 'positive')
    })
    .catch((error) => {
      console.error(error)
    })
}


function resetPassword(email) {
  firebaseInstance.firebase.auth().sendPasswordResetEmail(email)
    .then(() => {
      _addNotify('Password reset email sent successfully.', 'positive')
    })
    .catch(error => {
      _addNotify(error.message, 'negative')
    })
}

function _addNotify(message, color, timeout = 3000) {
  Notify.create({
    message,
    color,
    timeout
  })
}


export default {
  setUser,
  loginFB,
  logoutFB,
  getUserFromFrFB,
  updateUser,
  reAuthenticate,
  changePassword,
  resetPassword,
  _addNotify
}
