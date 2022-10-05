const navbar = {
    resources: {
        title: '资源',
    },
    tags: {
        title: '标签',
    },
    settings: {
        title: '设置',
    },
    dropdown: {
        title: '语言',
        langs: {
            zhCN: '简体中文',
            en: '英文',
        }
    },
};
const topicPicker = {
    placeholder: '输入主题名',
    title: '选择主题',
    all: '全部',
    noTopic: '未分类',
    actions: {
        multiCheck: '多选',
        add: '新增',
        delete: '删除',
    },
    customized: '自定义主题',
    checkAll: '全选',
};
const bookMark = {
    placeholder: '输入收藏夹名称',
    title: '选择收藏夹',
};
const tagPicker = {
    placeholder: '输入标签名',
    searchSelections: {
        title: '筛选条件',
        group: '标签组',
        tag: '标签',
    },
    pickedTitle: '已选标签',
    clearAll: '清除全部',
}
const resourceGallery = {
    emptyDescription: '无资源',
    resourceItem: {
        noPicture: '无预览图',
        noIcon: '无图标',
    },
}

const setting = {
    view: {
        darkMode: '暗黑模式',
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