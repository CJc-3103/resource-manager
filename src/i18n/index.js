import { createI18n } from 'vue-i18n'
import { zhCN, en } from './locale'
import el_zhCN from 'element-plus/lib/locale/lang/zh-cn'
import el_en from 'element-plus/lib/locale/lang/en'
import store from '@/store'

const defaultLang = 'zhCN'; // zhCN 必须与 messages 对象的属性同名
const langs = ['zhCN', 'en'];

if (!store.state.currentLang) store.commit('setCurrentLang', defaultLang);
let locale = store.state.currentLang;

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
export { langs }