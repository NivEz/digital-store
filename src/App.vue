<template>
  <div id="q-app">
    <q-layout view="lHh Lpr lFf">
      <q-page-container>
        <router-view></router-view>
      </q-page-container>
    </q-layout>
  </div>
</template>
<script>
import {defineComponent} from 'vue';
import firebase from 'firebase'

export default defineComponent({
  name: 'App',

  data() {
    return {
      window: window,
      leftDrawerOpen: false,
      text: '',
      isReload: false,
      response: ''
    }
  },
})
</script>
