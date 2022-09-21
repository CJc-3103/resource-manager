
export default {
    namespaced: true,
    state: {
        currentTopic: '', // 资源管理页，左侧栏主题导航
        currentTags: [], // 资源管理页，左侧栏主题导航
    },
    mutations: {
        setCurrentTopic(state, topic) {
            state.currentTopic = topic;
        },
        setCurrentTags(state, tags) {
            state.currentTags = tags;
        },
    },
    actions: {
        updateCurrentTopic({ commit }, topic) {
            commit('setCurrentTopic', topic);
        },
        updateCurrentTags({ commit }, tags) {
            commit('setCurrentTags', tags);
        },
    },
};
