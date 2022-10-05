const navbar = {
    resources: {
        title: 'Resources',
    },
    tags: {
        title: 'Tags',
    },
    settings: {
        title: 'Settings',
    },
    dropdown: {
        title: 'Language',
        langs: {
            zhCN: 'Chinese',
            en: 'English',
        }
    },
}
const topicPicker = {
    placeholder: 'Input topic name',
    title: 'Select topic',
    all: 'All',
    noTopic: 'No Topic',
    actions: {
        multiCheck: 'Multi-Select',
        add: 'Add New',
        delete: 'Delete',
    },
    customized: 'Customized',
    checkAll: 'Check All',
};
const bookMark = {
    placeholder: 'Input bookmark name',
    title: 'Select bookmark',
};
const tagPicker = {
    placeholder: 'Input tag name',
    searchSelections: {
        title: 'Select',
        group: 'group',
        tag: 'tag',
    },
    pickedTitle: 'Picked',
    clearAll: 'Clear All',
}
const resourceGallery = {
    emptyDescription: 'No resources',
    resourceItem: {
        noPicture: 'No picture',
        noIcon: 'No icon',
    },
}

const setting = {
    view: {
        darkMode: 'Dark Mode',
    },
}

export default {
    navbar,
    topicPicker,
    bookMark,
    tagPicker,
    resourceGallery,
    setting,
}