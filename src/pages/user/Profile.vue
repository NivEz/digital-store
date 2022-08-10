<template>
  <div class="q-pa-md">
    <h4>Welcome {{ localUser.firstName }}!</h4>
    <h5>Edit profile</h5>
    <div class="row q-gutter-md">
      <div :class="$q.screen.width > 600 ? 'col-6' : 'col-12'">
        <p>First name</p>
        <q-input v-model="localUser.firstName" filled dense/>
      </div>
      <div :class="$q.screen.width > 600 ? 'col-6' : 'col-12'">
        <p>Surname</p>
        <q-input v-model="localUser.surname" filled dense/>
      </div>
      <div :class="$q.screen.width > 600 ? 'col-6' : 'col-12'">
        <p>Country</p>
        <q-select v-model="localUser.country" :options="countriesList" filled dense/>
      </div>
      <div :class="$q.screen.width > 600 ? 'col-6' : 'col-12'">
        <p>Phone number</p>
        <q-input v-model="text" filled dense/>
      </div>
      <div :class="$q.screen.width > 600 ? 'col-6 row' : 'col-12 row'">
        <q-btn @click="submit" class="q-mr-md col-4" color="primary" label="Submit" no-caps/>
        <q-btn @click="cleanFields()" color="white" text-color="black" label="Clean" no-caps/>
      </div>

      <div class="q-mt-xl"></div>

      <div :class="$q.screen.width > 600 ? 'col-6' : 'col-12'">
        <p>Current password</p>
        <q-input
          v-model="currentPassword"
          filled dense
          type="password"
          ref="currentPassword"
          :rules="generalRule"
        />
      </div>
      <div :class="$q.screen.width > 600 ? 'col-6' : 'col-12'">
        <p>New password</p>
        <q-input
          v-model="newPassword"
          filled dense
          type="password"
          ref="newPassword"
          :rules="[
            ...generalRule,
            val => val !== currentPassword || 'The new password must not match the old password'
          ]"
        />
      </div>
      <div :class="$q.screen.width > 600 ? 'col-6' : 'col-12'">
        <p>Repeat new password</p>
        <q-input
          v-model="newPasswordRepeat"
          filled dense
          type="password"
          ref="newPasswordRepeat"
          :rules="[
            ...generalRule,
            val => val === newPassword || 'The passwords do not match'
          ]"
        />
      </div>

      <div :class="$q.screen.width > 600 ? 'col-6 row' : 'col-12 row'">
        <q-btn @click="updatePassword" class="q-mr-md col-4" color="primary" label="Update password" no-caps/>
        <q-btn @click="cleanPasswordFields()" color="white" text-color="black"
               label="Clean" no-caps/>
      </div>

    </div>
  </div>
</template>

<script>
import {mapActions, mapMutations, mapState} from 'vuex'

export default {
  name: "Profile",
  data() {
    return {
      localUser: {
        firstName: "",
        surname: "",
        country: ""
      },
      currentPassword: "",
      newPassword: "",
      newPasswordRepeat: "",

      generalRule: [val => (val && val.length > 5) || 'Enter a valid password']
    }
  },

  computed: mapState('users', ['user', 'countriesList']),

  methods: {
    ...mapActions('users', ['getUserFromFrAC', 'updateUser', 'reAuthenticateAC', 'changePasswordAC']),

    assignLocalUser() {
      Object.assign(this.localUser, this.user)
    },

    submit() {
      this.updateUser(this.localUser)
    },

    cleanFields() {
      this.assignLocalUser()
    },

    async cleanPasswordFields() {
      var scopedThis = this
      const waitForResetValidation = () => {
        scopedThis.currentPassword = ""
        scopedThis.newPassword = ""
        scopedThis.newPasswordRepeat = ""
      }
      await waitForResetValidation()
      // resetting the validation rules with the ref property
      Object.keys(this.$refs).forEach((keyRef) => this.$refs[keyRef].resetValidation())
    },

    async updatePassword() {
      // validation of the password inputs based on the :rules properties in the q-input elements
      const validationArr = Object.keys(this.$refs).filter((keyRef) => {
        return !this.$refs[keyRef].validate()
      })
      if (validationArr.length === 0) {
        console.log("chanign password!")
        const user = await this.reAuthenticateAC(this.currentPassword)
        if (user) {
          const newPassword = this.newPassword
          this.changePasswordAC({user, newPassword})
        }
      }
    }
  },

  async created() {
    if (localStorage.getItem('id')) {
      await this.getUserFromFrAC()
      this.assignLocalUser()
    }
  }
}
</script>

<style scoped lang="css">


</style>
