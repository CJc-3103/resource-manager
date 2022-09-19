
export default {
    namespaced: true,
    state: {
        currentMenu: '', // 顶部导航
        currentTopic: '', // 资源管理页，左侧栏主题导航
    },
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
        initCurrentMenu({ commit }, defaultMenuItem) {
            commit('setCurrentMenu', defaultMenuItem);
        },
        updateCurrentTopic({ commit }, topic) {
            commit('setCurrentTopic', topic);
        },
        initCurrentTopic({ commit }, defaultTopic) {
            commit('setCurrentMenu', defaultTopic);
        },
    },
};
