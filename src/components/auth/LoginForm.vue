<template>
  <div class="popup-login" ref="wrapper">
    <q-form
      @submit="login"
      @reset="onReset"
      class="q-gutter-md"
    >
      <q-input
        filled
        v-model="user.email"
        label="Email *"
      />

      <q-input
        filled
        type="password"
        v-model="user.password"
        label="Password *"
      />
      <div class="buttons-wrapper">
        <q-btn label="Login" type="submit" class="button"/>
        <q-btn label="Reset" type="reset" flat class="q-ml-sm"/>
        <a @click="forgotPassword">Forgot password?</a>
      </div>
    </q-form>

    <div v-if="isForgotPasswordClicked" class="q-mt-lg row">
      <q-input
        class="col-11"
        filled
        dense
        v-model="user.resetPasswordEmail"
        label="Type in the email you signed up with and click on the button"
      />
      <q-btn icon="send" dense class="col-1 button" size="sm" @click="sendPasswordResetEmail"/>
    </div>

    <div class="q-mt-lg">
      New user?
      <a @click="register" class="q-ml-xs">
        Sign up here
      </a>
    </div>
  </div>

</template>

<script>
import {mapActions} from 'vuex'


export default {
  name: "LoginForm",
  props: ['tableName', 'auto-close'],
  data() {
    return {
      isForgotPasswordClicked: false,
      user: {
        email: null,
        password: null,
        resetPasswordEmail: null
      }
    }
  },

  methods: {
    ...mapActions('users', ['loginAC', 'resetPasswordAC']),

    async login() {
      /**
       * checks if the user typed in email and password, if so,
       * will call the user.actions.
       */
      if (this.user.email && this.user.password) {
        const isLoggedIn = await this.loginAC(this.user);
        if (isLoggedIn) {
          await this.$emit('userLoggedIn')
        }
      }
    },

    onReset() {
      this.user.email = null
      this.user.password = null
    },

    forgotPassword() {
      this.isForgotPasswordClicked = true;
      this.$refs.wrapper.style.height = '330px'
    },

    sendPasswordResetEmail() {
      /**
       * using regex to check if entered valid email address,
       * if so, calling the reset password function from users.actions.
       * @type {RegExp}
       */
      var re = /.*@+.+\.+.+/
      if (re.test(this.user.resetPasswordEmail)) {
        this.resetPasswordAC(this.user.resetPasswordEmail)
      }
    },

    register() {
      /**
       * routing to the register page and emits an event to close the login pop up.
       */
      this.goTo('/register')
      this.$emit('sign-up-clicked')
    }

  },
}
</script>

<style scoped>

@media only screen and (max-width: 600px) {
  .popup-login {
    width: calc(100vw - 40px);
  }
}

@media only screen and (min-width: 601px) {
  .popup-login {
    width: 500px;
  }
}


.popup-login {
  position: relative;
  height: 280px;
  background: var(--secondary);
  border-radius: 10px 0 10px 10px;
  margin: 0;
  padding: 28px;
}

a {
  cursor: pointer;
  text-decoration: underline;
}

.buttons-wrapper {
  display: flex;
  align-items: center;
}

.button {
  background: var(--button);
}

.buttons-wrapper > a {
  margin-left: auto;
}

a:hover {
  color: var(--links-hover);
}

</style>
