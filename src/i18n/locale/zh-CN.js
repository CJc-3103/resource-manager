const navbar = {
    resources: {
        title: '资源'
    },
    tags: {
        title: '标签'
    },
    settings: {
        title: '设置'
    },
    dropdown: {
        title: '语言',
        langs: {
            zhCN: '简体中文',
            en: '英文',
        }
    },
};
const topicMenu = {
    placeholder: '输入主题名',
    title: '选择主题',
    all: '全部',
    noTopic: '未分类'
};
const tagPicker = {
    placeholder: '输入标签名',
    pickedTitle: '已选标签'
}
const resourceContainer = {
    emptyDescription: '无资源',
    resourceItem: {
        noPicture: '无预览图',
        noIcon: '无图标'
    },
}

export default {
    navbar,
    topicMenu,
    tagPicker,
    resourceContainer,
}