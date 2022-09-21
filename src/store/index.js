import { createStore } from 'vuex'
import modules from './modules'

export default createStore({
    state() {
        return {
            currentNav: '', // 顶部导航
            // currentNav: {
            //     get() {
            //         return localStorage.getItem('currentNav');
            //     },
            //     set(value) {
            //         localStorage.setItem('currentNav', value);
            //     },
            // },
            // ...currentNav,
        }
    },
    mutations: {
        setCurrentNav(state, navItem) {
            state.currentNav = navItem;
        },
    },
    actions: {
        updateCurrentNav({ commit }, navItem) {
            commit('setCurrentNav', navItem);
        },
    },
    modules: modules,
})
