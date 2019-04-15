import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import gw from './modules/gw'
import getters from './getters'


Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    gw
  },
  getters
})

export default store
