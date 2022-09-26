import { createApp } from 'vue';
// 插件
import ElementPlus from 'element-plus';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import router from './router';
import store from './store';
// import { recoverFromLocal } from '@/utils/storage/backup';
// recoverFromLocal(); // 刷新后，先从本地备份恢复状态

import i18n from '@/i18n';
import App from './App.vue';
//  样式
import 'element-plus/dist/index.css';
import '@/assets/styles/normalize.scss';
import '@/assets/styles/index.scss';

const app = createApp(App).use(ElementPlus, {
    i18n: (key, value) => i18n.t(key, value),
}).use(store).use(router).use(i18n);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.mount('#app');