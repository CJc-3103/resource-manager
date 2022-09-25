import { createApp } from 'vue';
import App from './App.vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import router from './router';
import store from './store';
import '@/assets/styles/normalize.scss';
import '@/assets/styles/index.scss';
import i18nLocal from '@/i18n';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

const app = createApp(App).use(ElementPlus).use(store).use(router).use(i18nLocal);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.mount('#app');