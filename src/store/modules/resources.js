
export default {
    namespaced: true,
    state: {
        currentTopic: '', // 资源管理页，左侧栏主题导航
        pickedTags: [], // 资源管理页，左侧栏主题导航
        // pickedTagsCount: 0,
        // isPickedList: [],
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
        setIsPickedInList(state, id, isPicked) {
            state.isPickedList[id] = isPicked;
        },
        setPickedTagsCount(state, count) {
            state.pickedTagsCount = count;
        },
    },
    actions: {
        updateCurrentTopic({ commit }, topic) {
            commit('setCurrentTopic', topic);
        },
        removeClosedTag({ commit, dispatch }, tagId) {
            dispatch('decrementPickedTags');
            commit('setTagInPickedTags', tagId, '');
        },
        incrementPickedTags({ commit, state }) {
            let count = state.pickedTagsCount + 1;
            commit('setPickedTagsCount', count);
        },
        decrementPickedTags({ commit, state }) {
            let count = state.pickedTagsCount - 1;
            commit('setPickedTagsCount', count);
        },
        resetPickedTags({ commit }) {
            commit('setPickedTagsCount', 0);
        },
        getTag({ state }, id) {
            return state.pickedTags[id];
        },
    },
};
