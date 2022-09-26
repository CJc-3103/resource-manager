import { createI18n } from 'vue-i18n'
import { zhCN, en } from './locale'
import el_zhCN from 'element-plus/lib/locale/lang/zh-cn'
import el_en from 'element-plus/lib/locale/lang/en'
import store from '@/store'


import { recoverFromLocal } from '@/utils/storage/backup';
recoverFromLocal(); // 刷新后，先从本地备份恢复状态

const defaultLang = 'zhCN'; // defaultLang 的值必须与 messages 对象的属性同名
const langs = ['zhCN', 'en'];
const elLocalLangs = { zhCN: el_zhCN, en: el_en };

if (!(store.state.currentLang)) store.commit('setCurrentLang', defaultLang);
let locale = store.state.currentLang || defaultLang;

const messages = {
    zhCN: {
        ...zhCN,
        ...el_zhCN,
    },
    en: {
        ...en,
        ...el_en,
    },
};

const i18n = createI18n({
    legacy: false,
    globalInjection: true, // 全局模式，可以直接使用 $t
    locale,
    messages,
});

export default i18n;
export { langs, elLocalLangs }