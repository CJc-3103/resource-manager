
export default {
    namespaced: true,
    state: {
        currentTopic: '', // 资源管理页，左侧栏主题导航
        currentTags: [], // 资源管理页，左侧栏主题导航
        pickedTagsCount: 0,
    },
    getters: {
    },
    mutations: {
        setCurrentTopic(state, topic) {
            state.currentTopic = topic;
        },
        setCurrentTags(state, tags) {
            state.currentTags = tags;
        },
        setTagInCurrentTags(state, tagId, tagVal) {
            state.currentTags[tagId] = tagVal;
        },
        setPickedTagsCount(state, count) {
            state.pickedTagsCount = count;
        },
    },
    actions: {
        updateCurrentTopic({ commit }, topic) {
            commit('setCurrentTopic', topic);
        },
        // initCurrentTags({ commit, state }, tagGroupCount) {
        //     if (!state.pickedTagsCount) {
        //         let currentTags = new Array(tagGroupCount).fill('');
        //         commit('setCurrentTags', currentTags);
        //     }
        // },
        // updateCurrentTags({ commit, dispatch, state }, tagId, tagVal) {
        //     // 既要负责添加，也要负责修改
        //     if (!state.currentTags[tagId]) dispatch('incrementPickedTags');
        //     commit('setTagInCurrentTags', tagId, tagVal);
        // },
        removeClosedTag({ commit, dispatch }, tagId) {
            dispatch('decrementPickedTags');
            commit('setTagInCurrentTags', tagId, '');
        },
        clearCurrentTags({ commit, dispatch, state }) {
            commit('setPickedTagsCount', 0);
            // dispatch('initCurrentTags', state.currentTags.length);
        },
        incrementPickedTags({ commit, state }) {
            let count = state.pickedTagsCount + 1;
            commit('setPickedTagsCount', count);
        },
        decrementPickedTags({ commit, state }) {
            let count = state.pickedTagsCount - 1;
            commit('setPickedTagsCount', count);
        },
        getTag({ state }, id) {
            return state.currentTags[id];
        },
    },
};
