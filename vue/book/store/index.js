/**
 * Created by linfengluo@gmail.com on 2018/5/18.
 */
import Vuex from 'vuex'
import Vue from 'vue'
import state from './states'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
Vue.use(Vuex)

const store = () => new Vuex.Store({
    state,
    actions,
    mutations,
	getters
})


export default store
