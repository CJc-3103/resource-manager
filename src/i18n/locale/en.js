// 通用
const form = {
    action: {
        submit: 'submit',
        cancel: 'cancel',
        confirm: 'confirm',
        reset: 'Reset',
    },
}
// 组件
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
    },
    customized: 'Customized',
    checkAll: 'Check All',
    ctxMenu: {
        view: 'View Detail',
        edit: 'Edit',
        delete: 'Delete',
    },
};
const topicFormDialog = {
    formTitle: {
        view: 'Topic Info',
        add: 'Create New Topic',
        edit: 'Edit Topic Info',
        delete: 'Delete the Topic?',
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
    message: {
        action: {
            add: {
                success: 'New topic added',
                fail: 'Failed to add new topic,',
            },
            edit: {
                success: 'Topic updated',
                fail: 'Failed to update topic,',
            },
            delete: {
                success: 'Topic deleted',
                fail: 'Failed to delete topic,',
            },
        },
        exception: {
            constraint: 'Same topic name existing'
        }
    },
}
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
    form,
    navbar,
    topicPicker,
    topicFormDialog,
    bookMark,
    tagPicker,
    resourceGallery,
    setting,
}