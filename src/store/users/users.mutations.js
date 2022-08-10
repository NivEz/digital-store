
export default {
  setUser: (state, userDetails) => state.user = userDetails,

  resetUser: (state) => {
    console.log("reset user mutation")
    console.log(state.user)
    for (let key in state.user) {
      // console.log(key)
      state.user[key] = ''
    }
  }
}

