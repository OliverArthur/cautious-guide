import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userId: localStorage.getItem('user-id'),
    activeWidget: null,
    activeSideBar: null
  },
  mutations: {
    changeActiveWidget (state, key) {
      state.activeWidget = state.activeWidget === key ? null : key
    },
    changeActiveSideBar (state, key) {
      state.activeSideBar = state.activeSideBar === key ? null : key
    }
  },
  actions: {
    changeActiveWidget ({ state, commit }, key) {
      commit('changeActiveWidget', key)
    },
    changeActiveSideBar ({ state, commit }, key) {
      commit('changeActiveSideBar', key)
    }
  }
})
