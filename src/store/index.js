import { createStore } from 'vuex'
import * as modules from './modules'

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
            currentMenu: '', // 顶部导航
            currentTopic: '', // 资源管理页，左侧栏主题导航
        }
    },
    // getters: {
    // },
    mutations: {
        setCurrentMenu(state, menuItem) {
            state.currentMenu = menuItem;
        },
        setCurrentTopic(state, topic) {
            state.currentTopic = topic;
        },
    },
    actions: {
        updateCurrentMenu({ commit }, menuItem) {
            commit('setCurrentMenu', menuItem);
        },
        updateCurrentTopic({ commit }, topic) {
            commit('setCurrentTopic', topic);
        },
    },
    // modules: {}
})
