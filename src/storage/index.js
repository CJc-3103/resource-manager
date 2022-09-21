const getItem = (key) => localStorage.getItem(key);
const setItem = (key, value) => localStorage.setItem(key, value);

let currentNav = {
    get currentNav() {
        return localStorage.getItem('currentNav');
    },
    set currentNav(value) {
        localStorage.setItem('currentNav', value);
    },
}

let currentTopic = {
    get currentTopic() {
        return getItem('currentTopic');
    },
    set currentTopic(value) {
        setItem('currentTopic', value);
    },
}
let currentTags = {
    get currentTags() {
        return getItem('currentTags');
    },
    set currentTags(value) {
        setItem('currentTags', value);
    },
}


export default localStore = {
    ...currentNav,
    ...currentTopic,
    ...currentTags,
};

// export default currentNav