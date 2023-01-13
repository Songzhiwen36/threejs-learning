import { createRouter, createWebHistory } from "vue-router"

const Chapter02 = () => import('../pages/Chapter02.vue')
const Chapter01 = () => import('../pages/Chapter01.vue')

const routes = [
    {
        path: '/',
        component: Chapter01
    },
    {
        path: '/chapter02',
        component: Chapter02
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router

