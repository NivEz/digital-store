import firebaseAuth from '../../middleware/firebase/auth/index-auth'


export default {
  createUser: async ({commit}, userDetails) => {
    await firebaseAuth.setUser(userDetails)
    commit('setUser', userDetails)
  },

  loginAC: async ({dispatch}, {email, password}) => {
    if (await firebaseAuth.loginFB(email, password)) {
      dispatch('getUserFromFrAC')
      dispatch('cart/getCartItemsAC', null, {root: true})
      return true
    }
  },

  logoutAC: ({commit}) => {
    firebaseAuth.logoutFB();
    commit('resetUser')
    commit('cart/resetCart', null, {root: true})

  },

  getUserFromFrAC: async ({commit}) => {
    const userId = localStorage.getItem('id')
    if (!userId) {
      this.goTo('/Error404')
    } else {
      const userDetails = await firebaseAuth.getUserFromFrFB(userId)
      commit('setUser', userDetails)
    }
  },

  updateUser: async ({commit, state}, profileUpdates) => {
    await firebaseAuth.updateUser('users', localStorage.getItem('id'), profileUpdates)
    const newProfile = Object.assign({}, state.user, profileUpdates)
    commit('setUser', profileUpdates)
  },

  reAuthenticateAC: async ({}, currentPassword) => {
    return await firebaseAuth.reAuthenticate(currentPassword)
  },

  changePasswordAC: async ({}, {user, newPassword}) => {
    firebaseAuth.changePassword(user, newPassword)
  },

  resetPasswordAC: ({}, email) => {
    firebaseAuth.resetPassword(email)
  }
}
