import { createI18n } from 'vue-i18n'
import { zhCN, en } from './locale'
import el_zhCN from 'element-plus/lib/locale/lang/zh-cn'
import el_en from 'element-plus/lib/locale/lang/en'
import store from '@/store'
import { backupFromLocal } from '@/utils/storage/backup';

const defaultLang = 'zhCN'; // defaultLang 的值必须与 messages 对象的属性同名
const langs = ['zhCN', 'en'];

backupFromLocal(); // 刷新后，先从本地备份恢复状态
if (!store.state.currentLang) store.commit('setCurrentLang', defaultLang);
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

const i18nLocal = createI18n({
    legacy: false,
    globalInjection: true, // 全局模式，可以直接使用 $t
    locale,
    messages,
});

export default i18nLocal;
export { langs }