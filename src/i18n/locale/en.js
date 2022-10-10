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
    defaultTopics: {
        all: 'All',
        noTopic: 'No Topic',
    },
    dropdownMenu: {
        multiCheck: 'Multi-Select',
        add: 'Add New',
        delete: 'Delete',
    },
    customized: 'Customized',
    checkAll: 'Check All',
    form: {
        formTitle: {
            add: 'Create New Topic',
            edit: 'Edit Topic Info',
        },
        fields: {
            topicName: {
                title: 'Topic Name',
                detail: 'Describe the main concept of the this group',
                message: {
                    require: 'Please input Topic name',
                    length: 'Length should be 1 to 20',
                },
            },
            pathType: {
                title: 'Path Type',
                detail: 'Allow url, local path or the above all',
                type: {
                    network: 'Network Url',
                    local: 'Local Path',
                    all: 'Above All',
                },
            },
        },
        footer: {
            confirm: 'Confirm',
            cancel: 'Cancel',
        },
    },
    ctxMenu: {
        view: 'View Detail',
        edit: 'Edit',
    },
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