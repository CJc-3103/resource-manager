
export default {
    namespaced: true,
    state: {
        currentTopic: '', // 资源管理页，左侧栏主题导航
        pickedTags: [], // 资源管理页，左侧栏主题导航
    },
    getters: {
    },
    mutations: {
        setCurrentTopic(state, topic) {
            state.currentTopic = topic;
        },
        setPickedTags(state, tags) {
            state.pickedTags = tags;
        },
        setPickedTag(state, tagId, tag) {
            state.pickedTags[tagId] = tag;
        },
    },
    actions: {
        updateCurrentTopic({ commit }, topic) {
            commit('setCurrentTopic', topic);
        },
    },
};
