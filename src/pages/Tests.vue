<template>
  <div>
    <h1>Tests page</h1>

    <a href="http://www.google.com" @click="scrapingTest" style="width: 100px ; height: 100px; background: #9C27B0">
      Go to google
    </a>

    <button @click="scrapingTest">My scraping test</button>

    <q-btn @click="scrape" label="scraping test"/>

    <br><br>
    <button @click="storageTest">Storage test</button>
    <br><br>
    <button @click="calculateTimes">Dates test</button>
    <br><br>
    <button @click="emulatorTest">Functions emulator test</button>

    <div class="q-mt-xl row">
      <!--      <q-btn @update:model-value="val => { file = val[0] }" @click="upload" type="file" class="col" label="Upload picture">-->
      <!--      </q-btn>-->
      <!--      <q-btn @click="download" type="file" class="col" label="Download picture"/>-->

      <q-file v-model="file" label="Upload file" class="col-4"/>
      <q-btn @click="upload(file)" class="col-2 bg-red-3" label="Upload file"/>
      <!--      <div class="col-6"></div>-->
      <div class="bg-purple col">
        <!--        <q-linear-progress stripe rounded size="15px" :value="progress"/>-->

        <q-circular-progress
          :value="progress"
          size="50px"
          :thickness="0.22"
          color="teal"
          track-color="grey-3"
          class="q-ma-md"
        />

      </div>

    </div>

    <div style="margin-top: 100px">
      <h4>Picture</h4>
      <q-img :src="imgSrc">

      </q-img>

      <q-btn @click="removeFile" label="Delete"/>
    </div>

    <h5>ADMIN</h5>

    <button @click="setUserAdmin">Set user admin by email</button>
    <button @click="getUserRecords">Get user records</button>
    <button @click="deleteAdmin">Cancel admin permission</button>
    <button @click="getRecords">Get records from client</button>

  </div>
</template>

<script>
import firebaseStorage from '../middleware/firebase/storage/index-storage'
import firebaseInstance from '../middleware/firebase'
import 'firebase/storage'

const axios = require("axios")


export default {
  name: "Tests",

  data() {
    return {
      file: null,
      progress: 0,
      imgSrc: ''
    }
  },

  methods: {
    // upload(file) {
    //   // if (this.file === null) return;
    //   console.log("upload")
    //   firebaseStorage.upload(file)
    //   console.log("x", firebaseStorage.progressPercentage)
    //
    // },

    async setUserAdmin() {
      const user = await firebaseInstance.firebase.functions().httpsCallable('addAdminRole')()
      console.log("user", user)
    },

    async getUserRecords() {
      const records = await firebaseInstance.functions.httpsCallable('getUserRecord')()
      console.log("records:", records)
    },

    async deleteAdmin() {
      const deleted = await firebaseInstance.functions.httpsCallable('deleteAdmin')()
      console.log(deleted)
    },

    getRecords() {
      firebaseInstance.auth.currentUser.getIdTokenResult(true)
      .then(idTokenResult => {console.log("ADMIN:", idTokenResult)})
      .catch(err => console.error(err))
    },


    upload(file) {
      if (this.file === null) return;
      const uploadTaskRef = firebaseInstance.firebase.storage()
      uploadTaskRef.ref(file.name).put(file).on('stateChanged', this.onProgress, null, () => this.onComplete(uploadTaskRef, file.name))
    },

    onProgress(snapshot) {
      this.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    },

    onComplete(uploadTaskRef, fileName) {
      uploadTaskRef.ref(fileName).getDownloadURL().then(result => result)
        .then((imgUrl) => this.imgSrc = imgUrl)
      //this.imgSrc = imgUrl
    },

    async removeFile() {
      console.log("delete")
      if (!this.file) return
      await firebaseInstance.firebase.storage().ref(this.file.name).delete()
      this.imgSrc = null
    },

    scrape() {
      console.log("Scraping")
      axios({
        method: "GET",
        url: "https://www.imdb.com/title/tt0163651/?ref_=fn_al_tt_3",
        headers: "Access-Control-Allow-Origin: *"
      })
        .then((res) => {
          // accessing all the HTML in the document
          console.log(res)
          //console.log(res.data)
          const html = res.data
          // loading cheerio with the HTML
          // const $ = cheerio.load(html)
          // accessing the class="title_wrapper"
          // let title = $('.title_wrapper')
          // console.log(title)
          // the class's text
          // console.log(title.text())

          // the class's html
          // console.log(title.html())

          // getting the element's children
          // console.log(title.children())

          // console.log(title.find('h1').text())
          //next
          // console.log(title.children('h1').next().html())

          // console.log($('#title-overview-widget > div.vital > div.title_block > div > div.titleBar > div.title_wrapper > h1'))


        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response.data)
          }
        })
    },

    scrapingTest() {
      console.log("xasdasd")
      setTimeout(() => {
        console.log("waited")
      },)
      window.location = 'http://www.google.com';
      setTimeout(() => {
        console.log("asdasdasdasd")
        // document.querySelector("body > div.L3eUgb > div.o3j99.c93Gbe > div.KxwPGc.SSwjIe > div.KxwPGc.AghGtd > a:nth-child(1)").click()
      }, 3000)
    },

    async storageTest() {
      console.log("Storage test")
      const storage = firebaseInstance.firebase.storage()
      var image = storage.ref('battelfield1.PNG')
      const timeCreated = await image.getMetadata()
        .then((data) => {
          // console.log(data)
          console.log("time created:", data.generation)
          return data.generation
        })
      .catch((error) => {
        console.log("error", error)
      })
      // check how old is the file:
      this.calculateTimes(timeCreated)
    },

    calculateTimes(fileTimeCreated) {
      var timeNow = new Date().getMilliseconds()
      console.log("Time now:", timeNow)
      var timeAge = timeNow - fileTimeCreated
      console.log("File age:", timeAge)
    },

    async emulatorTest() {
      console.log("xxxxx")
      const result = await firebaseInstance.functions.httpsCallable('testEmulator')()
      console.log(result)
      console.log(result.data)
    }

  },


  created() {
  }
}
</script>

<style scoped>

</style>
