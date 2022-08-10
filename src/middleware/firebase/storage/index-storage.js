import firebaseInstance from '../'
import 'firebase/storage'

let progressPercentage = 0

function getFiles() {
    const storage = firebaseInstance.firebase.storage();
    console.log(storage)
    // var storage = firebaseInstance.firebase.storage()
    // console.log("storage", storage)
}

function upload(file) {
    console.log(file)
    const uploadTask = firebaseInstance.firebase.storage().ref(file.name).put(file)
    uploadTask.on('stateChanged', onProgress, null, onComplete(uploadTask.snapshot))


    //console.log(file.name)
    // return storageRef.child(file.name)
}

function onProgress(snapshot) {
    progressPercentage = (snapshot.bytesTransferred / snapshot.totalBytes)
    // export default {
    //     progressPercentage
    // }
    console.log(progressPercentage)
    return (snapshot.bytesTransferred / snapshot.totalBytes)
}

function onComplete(snapshot) {
    console.log("complete")
    console.log(snapshot)
    return snapshot
}

export default {
    getFiles,
    upload,
    progressPercentage
}