import { createApp } from 'vue';
// 插件
import ElementPlus from 'element-plus';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import router from './router';
import store from './store';
import { createI18n } from 'vue-i18n'
import { setupI18nConfig } from '@/i18n';
import App from './App.vue';
//  样式
import 'element-plus/dist/index.css';
import '@/assets/styles/normalize.scss';
import '@/assets/styles/index.scss';

// 初始化
import { recoverFromLocal } from '@/utils/storage/backupState/backupGlobalState';
recoverFromLocal(); // 刷新后，先从本地备份恢复状态
const i18n = createI18n(setupI18nConfig());

const app = createApp(App).use(ElementPlus, {
    i18n: (key, value) => i18n.t(key, value),
}).use(store).use(router).use(i18n);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.mount('#app');