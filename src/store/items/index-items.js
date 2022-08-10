import state from "./items.state"
import mutations from "./items.mutations"
import actions from "./items.actions"
import getters from "./items.getters"

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
