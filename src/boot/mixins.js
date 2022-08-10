import {boot} from 'quasar/wrappers'


// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({app, router}) => {
  app.mixin({
    methods: {
      goTo(path) {
        /**
         * going to the given path.
         */
        if (this.$route.path !== path) {
          router.push(path)
        }
      },

      resetInputs: (objReference) => {
        /**
         * gets an obj and clean it's fields.
         * to avoid Vuex error with this method send a copied obj!
         */
        for (const key in objReference) {
          objReference[key] = ''
        }
      },

      styledLog: (text, fontSize=14, color="black") => {
        // if (typeof text === "object") text = JSON.stringify(text, null, 4)
        if (typeof text === "object") {
          console.group()
          for (const key in text) {
            console.log("%c" + `${key}: ${text[key]}`, `font-size: ${fontSize}px; color: ${color}`)
          }
          console.groupEnd()
        } else {
          console.log("%c" + text, `font-size: ${fontSize}px; color: ${color}`)
        }
      }
    }
  })
})


