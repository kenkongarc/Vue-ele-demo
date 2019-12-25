import Vue from 'vue'
import Vuex from 'vuex'
import state from './states'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import consType from './const'


Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  consType
})