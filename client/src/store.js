import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userId: localStorage.getItem('user-id'),
    activeWidget: null,
    changeStatus: null,
    taskId: null,
    userDetails: {}
  },
  mutations: {
    changeActiveWidget (state, key) {
      state.activeWidget = state.activeWidget === key ? null : key
    },
    changeActiveSideBar (state, key) {
      state.activeSideBar = state.activeSideBar === key ? null : key
    },
    setTaskWidget(state, key) {
      state.changeStatus = state.changeStatus === key ? null : key
    },
    setTaskID ( state, id) {
      state.taskId = state.taskId === id ? null : id
    },
    setUser ( state, data ) {
      state.userDetails = state.userDetails === data ? null : data
    }
  },
  actions: {
    changeActiveWidget ({ state, commit }, key) {
      commit('changeActiveWidget', key)
    },
    changeActiveSideBar ({ state, commit }, key) {
      commit('changeActiveSideBar', key)
    },
    setTaskWidget({ state, commit }, key) {
      commit('setTaskWidget', key)
    },
    setTaskID({ state, commit }, id) {
      commit('setTaskID', id)
    },
    setUser({ state, commit }, data) {
      commit('setUser', data)
    }
  }
})
