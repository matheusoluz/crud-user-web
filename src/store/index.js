import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import session from './session'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    session
  },
  plugins: [createPersistedState()]
})

export default store
