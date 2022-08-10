import firebaseInstance from "../index"


function getDocRef(path) {
  return firebaseInstance.firebase.firestore().collection('test')
}

async function read(collectionName) {
  let itemsArr = [];
  await firebaseInstance.firebase.firestore().collection(collectionName)
    .orderBy("timestamp", "desc")
    .get()
    .then((docSnapshots) => {
      docSnapshots.forEach((doc) => {
        itemsArr.push(doc.data())
        return itemsArr
      })
    })
  return itemsArr
}

async function readDocField(docPath, field) {
  const querySnapshot = await firebaseInstance.firebase.firestore().doc(docPath).get()
  return querySnapshot.data()[field]
}

async function create(collectionName, item) {
  item.timestamp = new Date().getTime()
  const newDocRef = await firebaseInstance.firebase.firestore().collection(collectionName).add(item)
  await newDocRef.update({itemId: newDocRef.id})
  item.itemId = newDocRef.id;
  return item
}


async function remove(collectionName, itemId) {
  await firebaseInstance.firebase.firestore().collection(collectionName).doc(itemId).delete()
}

async function update(collectionName, itemId, newUpdates) {
  await firebaseInstance.firebase.firestore().collection(collectionName).doc(itemId).update(newUpdates)
    .catch((error) => {
      console.error(error)
    })
  return newUpdates
}

async function getItemById(collectionName, itemId) {
  const docSnapshot = await firebaseInstance.firebase.firestore().collection(collectionName).doc(itemId).get()
    .catch(error => console.error(error))
  return docSnapshot.data()
}


async function selectByPath(collectionName, itemPath) {
  const querySnapshot = await firebaseInstance.firebase.firestore().collection(collectionName)
    .where('productPageRoute', '==', itemPath).get();
  let snapshotData = [];
  // console.log("BEFORE")
  if (querySnapshot.empty) {
    location.replace('/404')
    return null;
  } else {
    querySnapshot.forEach(doc => {
      snapshotData.push(doc.data())
    })
    return snapshotData[0]
  }
}


export default {
  getDocRef,
  read,
  readDocField,
  create,
  remove,
  getItemById,
  selectByPath,
  update
}
