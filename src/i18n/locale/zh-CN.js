// 通用
const form = {
    action: {
        submit: '提交',
        cancel: '取消',
        confirm: '确定',
        reset: '重置',
    },
}
const marks = {
    dot: '，',
}
// 组件
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
    defaultTopics: {
        all: '全部',
        noTopic: '未分类',
    },
    dropdownMenu: {
        multiCheck: '多选',
        add: '新增',
    },
    customized: '自定义主题',
    checkAll: '全选',
    ctxMenu: {
        view: '查看',
        edit: '编辑',
        delete: '删除',
    },
};
const topicFormDialog = {
    formTitle: {
        view: '主题信息',
        add: '新增主题',
        edit: '编辑主题',
        delete: '删除该主题？',
    },
    fields: {
        topicName: {
            title: '主题名称',
            detail: '概括主题下资源的共同点',
            message: {
                require: '主题名称不能为空',
                length: '长度不能拆超过 20 个字符',
            },
        },
        pathType: {
            title: '地址类型',
            detail: '允许使用 url 、本地路径，或以上全部',
            type: {
                network: '网络链接',
                local: '本地路径',
                all: '以上全部',
            },
        },
    },
    message: {
        action: {
            add: {
                success: '添加新主题成功',
                fail: '添加新主题失败，',
            },
            edit: {
                success: '编辑主题成功',
                fail: '编辑主题失败，',
            },
            delete: {
                success: '已删除主题',
                fail: '未成功删除主题，',
            },
        },
        exception: {
            constraint: '已存在同名主题',
        }
    },
}
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
    form,
    navbar,
    topicPicker,
    topicFormDialog,
    bookMark,
    tagPicker,
    resourceGallery,
    setting,
}