
export default {
    namespaced: true,
    state: {
        currentTopic: '',
    },
    mutations: {
        setCurrentTopic(state, topic) {
            state.currentTopic = topic;
        },
    },
    actions: {
        updateCurrentTopic({ commit }, topic) {
            commit('setCurrentTopic', topic);
        },
    },
};
