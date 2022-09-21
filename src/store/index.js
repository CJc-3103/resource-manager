import { createStore } from 'vuex'
import * as modules from './modules/index'

export default createStore({
    // state: {
    // },
    // getters: {
    // },
    // mutations: {
    // },
    // actions: {
    // },
    // modules: modules

    state() {
        return {
            currentNav: '', // 顶部导航
            // currentTopic: '', // 资源管理页，左侧栏主题导航
        }
    },
    // getters: {
    // },
    mutations: {
        setCurrentNav(state, navItem) {
            state.currentNav = navItem;
        },
        // setCurrentTopic(state, topic) {
        //     state.currentTopic = topic;
        // },
    },
    actions: {
        updateCurrentNav({ commit }, navItem) {
            commit('setCurrentNav', navItem);
        },
        // updateCurrentTopic({ commit }, topic) {
        //     commit('setCurrentTopic', topic);
        // },
    },
    modules: {}
})
