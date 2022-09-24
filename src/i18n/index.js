import { createI18n } from 'vue-i18n'
import { zhCN, en } from './locale'
import el_zhCN from 'element-plus/lib/locale/lang/zh-cn'
import el_en from 'element-plus/lib/locale/lang/en'
import localStore from '@/storage'

let { lang } = localStore;
const defaultLang = 'zh-CN';
Promise.resolve().then(() => {
    if (!lang) lang = defaultLang;
});

let locale = lang ?? defaultLang; // 默认中文

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
    locale: locale,
    messages: messages,
});

export default i18n;