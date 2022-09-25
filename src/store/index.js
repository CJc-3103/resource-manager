import { createStore } from 'vuex'
import modules from './modules'
import localStore from '@/storage'

let { currentNav, currentLang } = localStore;

export default createStore({
    state() {
        return {
            currentNav: '', // 顶部导航
            currentLang: '',
        }
    },
    mutations: {
        setCurrentNav(state, navItem) {
            state.currentNav = navItem;
        },
        setCurrentLang(state, lang) {
            state.currentLang = lang;
        },
    },
    actions: {
        updateCurrentNav({ commit }, navItem) {
            commit('setCurrentNav', navItem);
            currentNav = navItem;
        },
        updateCurrentLang({ commit }, lang) {
            commit('setCurrentLang', lang);
            currentLang = lang;
        },
    },
    modules: modules,
})
