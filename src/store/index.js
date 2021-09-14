import { createStore } from 'vuex'
import state from './state'
import actions from './actions'
import mutations from './mutations'
import persistedState from 'vuex-persistedstate'
export default createStore({
  state,
  mutations,
  actions,
  modules: {},
  //plugins: [persistedState()] //添加插件
})