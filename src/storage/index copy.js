const getItem = (key) => localStorage.getItem(key);
const setItem = (key, value) => localStorage.setItem(key, value);

let currentNav = {
    // get() {
    //     return getItem('currentNav');
    // },
    // set(value) {
    //     setItem('currentNav', value);
    // },
    get currentNav() {
        // console.log('get', getItem('currentNav'));
        return localStorage.getItem('currentNav');
    },
    set currentNav(value) {
        // console.log('set');
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


export {
    currentNav,
    currentTopic,
    currentTags,
};

// export default currentNav