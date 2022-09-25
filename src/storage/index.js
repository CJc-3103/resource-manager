const getItem = (key) => localStorage.getItem(key);
const setItem = (key, value) => localStorage.setItem(key, value);

const langKey = 'lang';
const currentNavKey = 'currentNav';
const currentTopicKey = 'currentTopic';
const currentTagsKey = 'currentTags';

let currentLang = {
    get currentLang() {
        return getItem(langKey);
    },
    set currentLang(value) {
        setItem(langKey, value);
    },
}
let currentNav = {
    get currentNav() {
        return getItem(currentNavKey);
    },
    set currentNav(value) {
        setItem(currentNavKey, value);
    },
}

let currentTopic = {
    get currentTopic() {
        return getItem(currentTopicKey);
    },
    set currentTopic(value) {
        setItem(currentTopicKey, value);
    },
}
let currentTags = {
    get currentTags() {
        return getItem(currentTagsKey);
    },
    set currentTags(value) {
        setItem(currentTagsKey, value);
    },
}

const localStore = {
    ...currentLang,
    ...currentNav,
    ...currentTopic,
    ...currentTags,
};

export default localStore