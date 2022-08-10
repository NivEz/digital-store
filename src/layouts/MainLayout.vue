<template>
  <q-layout view="lHh Lpr lFf" class="main-layout">
    <header>
      <q-icon name="home" size="30px" @click="goTo('/')" class="cursor-pointer"></q-icon>
      <div class="navbar">

        <div class="navbar-item" v-if="isAdmin">
          <a class="hoverable-inner-item">
            <q-icon name="admin_panel_settings" size="30px"
                    @click="goTo('/admin')"
            />
          </a>
        </div>


        <div class="navbar-item">
          <a class="hoverable-inner-item" @click="goTo('/cart')">
            <q-icon name="shopping_cart" size="30px" id="cart-icon"/>
          </a>
          <div class="minicart-quantity">
            <span>{{ cart.cart.totalNumOfProducts }}</span>
          </div>
        </div>

        <div class="navbar-item" id="logged-in-hover">
          <a class="hoverable-inner-item" @click="openLogInPopupIfNotUser">
            <span v-if="users.user.firstName">Howdy {{ users.user.firstName }}?</span>
            <!--            TODO check if needs property in data section below-->
            <span v-else>Login / Register</span>
            <q-icon class="profile-tab" name="account_circle" size="30px"/>
          </a>
          <!--            We actually dont need the tabindex in this specific case-->
          <section class="login-form"
                   ref="loginPopup"
                   tabindex="1"
          >


            <LoginForm v-if="isLoginPopupActive" @userLoggedIn="closePopup" @sign-up-clicked="closePopup"/>
          </section>


          <div class="dropdown" v-if="users.user.firstName">
            <a @click="goTo('/account/inventory')">Inventory</a>
<!--            <a @click="goTo('/account/wishlist')">Wishlist</a>-->
            <a @click="goTo('/account/profile')">Profile</a>
            <a>Lorem ipsum</a>
<!--            <a @click="goTo('/contact')">Contact</a>-->
            <a @click="logout">Logout</a>
          </div>

        </div>
      </div>

    </header>

    <q-page-container class="main-content q-pa-md">
      <router-view/>
    </q-page-container>

  </q-layout>
</template>

<script>

import LoginForm from "../components/auth/LoginForm";
import {mapState, mapActions} from "vuex"

export default {
  name: 'MainLayout',
  components: {LoginForm},

  data() {
    return {
      isLoginPopupActive: false,
      myClass: 'hidden-profile-menu',
      isAdmin: false
    }
  },

  computed: {
    // ...mapState('users', ['user']),
    // ...mapState('cart', ['cart']),
    // The same as above
    ...mapState(['cart', 'users'])
  },

  methods: {
    ...mapActions('users', ['getUserFromFrAC', 'logoutAC']),
    ...mapActions('cart', ['getCartItemsAC']),


    async openLogInPopupIfNotUser() {
      /**
       * click on the login / register button triggers this function.
       * if user is not logged in - this function will render the LoginForm component which
       * is dependent on the isLoginPopupActive property to be true.
       * when opening the login component the function will add an event listener on click event (handlePopupFocusEv) -
       * if clicked outside the Login component isLoginPopupActive will set to false and the login box will remove itself.
       * if user is logged in - the button will do nothing and LoginForm won't be generated.
       */
      if (!localStorage.getItem('id')) {
        if (this.isLoginPopupActive) return
        this.isLoginPopupActive = true;
        setTimeout(() => {
          addEventListener('click', this.handlePopupFocusEv)
        }, 200)
      }
    },

    handlePopupFocusEv() {
      /**
       * document.activeElement.tagName === 'BODY' is the default element to be focused in no focus detected.
       */
      if (document.activeElement.tagName === 'BODY' && this.isLoginPopupActive) {
        this.closePopup()
      }
    },

    closePopup() {
      this.isLoginPopupActive = false;
      removeEventListener('click', this.handlePopupFocusEv)
    },

    logout() {
      this.logoutAC()
    }
  },

  created() {
    this.getCartItemsAC()
  },

  mounted() {
    /**
     * adding event listener to the verified-admin custom event.
     * the event is dispatched in the serviceConnection.js (boot file)
     */
    window.addEventListener('verified-admin', () => {
      this.isAdmin = true
    }, {once: true})
  }

}

</script>

<style scoped lang="css">

.main-layout {
  background: var(--background);
  overflow: auto;
}

.main-content {
  margin-top: 80px;
}

header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  height: 80px;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 111;
  background: var(--primary);
  border-radius: 0 0 3px 3px;
  box-shadow: 0 0 10px black;
}

header div {
  margin: 0 10px;
}


.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style: none;
  padding: 0;
  height: 80px;
  max-height: 80px;
}

.navbar-item {
  margin: 0 10px;
  cursor: pointer;
  height: inherit;
  display: flex;
  align-items: center;
  position: relative;
}

/* rotates the cart!*/
#cart-icon {
  transform: rotateY(180deg);
}

.minicart-quantity {
  background: #ff363b;
  position: absolute;
  border-radius: 50%;
  padding: 0.6em;
  right: 16px;
  top: 12px;
  box-shadow: 0 0 8px #3e3e3e;
}

.minicart-quantity > span {
  color: white;
  position: absolute;
  transform: translate(-50%, -50%);
  font-size: 10px;
}


.navbar-item > a > span {
  margin-right: 10px;
  margin-left: 20px;
}


.login-form {
  position: absolute;

  z-index: 1;
  right: 0;
  align-self: flex-end;
  transform: translateY(100%);
}


.dropdown {
  display: none;
  width: 150px;
  position: absolute;
  background: var(--secondary);
  right: 0;
  margin: 0;
  align-self: flex-end;
  transform: translateY(100%);
}

.dropdown > a {
  display: block;
  padding: 20px 40px;
  text-align: center;
}


div > .hoverable-inner-item:hover {
  transition: 0.2s;
  opacity: 80%;
  text-shadow: 2px 2px 5px black;
  border-radius: 5px;
  background: var(--primary-hover);
  padding: 2px;
}


#logged-in-hover:hover > .dropdown {
  display: block;
}


.dropdown > a:hover {
  background: var(--primary);
}

</style>
