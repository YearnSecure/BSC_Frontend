import Vue from 'vue'
import Vuex from 'vuex'
import theme from './modules/theme'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    account: '',
    presale: {},
    pinnedPresales: [],
    yieldAllowance: false,
  },
  getters: {
    account: state => {
      return state.account
    },
    presale: state => {
      return state.presale
    },
    pinnedPresales: state => {
      return state.pinnedPresales
    },
    yieldAllowance: state => {
      return state.yieldAllowance
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    theme
  }
})
