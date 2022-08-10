import {boot} from 'quasar/wrappers'
import firebaseInstance from "../middleware/firebase"

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({store}) => {
  window.user = null
  firebaseInstance.auth.onAuthStateChanged((user) => {
      if (user) {
        window.user = user
        localStorage.setItem('id', user.uid)
        store.dispatch('users/getUserFromFrAC')

        // get firebase auth custom claims and check if admin
        user.getIdTokenResult().then(idTokenResult => {
          user.admin = idTokenResult.claims.admin
          if (user.admin) {
            // if the user.admin is true add new event and dispatch it.
            // the event listener is placed in the MainLayout component.
            const verifiedAdminEvent = new Event('verified-admin')
            window.dispatchEvent(verifiedAdminEvent)
          }
        })

      } else {
        window.user = null
        localStorage.setItem('id', '')
      }
    }
  )

})


