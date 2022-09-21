
export default {
    namespaced: true,
    state: {
        currentNav: '', // 顶部导航
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
};
