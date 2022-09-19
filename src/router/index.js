import { createRouter, createWebHashHistory } from 'vue-router'
import Index from '../layout/index.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: Index,
        redirect: '/resources',
        children: [
            {
                path: '/resources',
                name: 'resources',
                component: () => import('../views/resources/index.vue')
            },
            {
                path: '/tags',
                name: 'tags',
                component: () => import('../views/tags/index.vue')
            },
            {
                path: '/settings',
                name: 'settings',
                component: () => import('../views/settings/index.vue')
            },
        ],
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
