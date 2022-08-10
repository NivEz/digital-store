import firebaseInstance from '../'
import database from 'firebase/database'


// firebaseInstance.firebase.auth().onAuthStateChanged((user) => {
//     const ref = firebaseInstance.firebase.database().ref('tableGames')
//     ref.on('value',
//         snapshot => {
//             const data = snapshot.val()
//             alert(JSON.stringify(data))
//         })
// })

function getRef(path) {
    return firebaseInstance.firebase.database().ref(path)
}

function read(options) {
    return firebaseInstance.firebase.database().ref(options.entity).once('value')
        // return getRef(options.entity).once('value')
        .then(res => {
            const arr = []
            const map = res.val()
            for (const keyId in map) {
                const item = map[keyId];
                //item.id = keyId
                arr.push(map[keyId])
            }
            return arr
        })
}

function selectById(options) {
    return firebaseInstance.db().ref(options.entity + '/' + options.id).once('value')
        .then(res => {
            const resObj = res.val()
            return resObj
        })
}

function create(options) {
    //TODO adjust this function to users not only games (or create new function)
    return firebaseInstance.firebase.database().ref(options.entity).push(options.item)
        .then(pushRes => {
            const newItemRefId = pushRes.key
            Object.assign(options.item, {id: newItemRefId})
            return pushRes.update({id: newItemRefId})
                .then(() => pushRes.once('value'))
        })
}

function remove(options) {
    if (!options.id) return;
    return firebaseInstance.firebase.database().ref(options.entity + '/' + options.id).remove();
}

function update(options) {
    return firebaseInstance.firebase.database().ref(options.entity + '/' + options.id).set(options.updates)
        .then(res => {
            return res
        })
}


export default {
    read,
    create,
    remove,
    update,
    selectById,
    getRef
}