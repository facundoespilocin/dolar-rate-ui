import Vue from "vue"
import Router from "vue-router"
import Home from "./views/Home.vue"

import store from "./store"

Vue.use(Router)

const router = new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
        {
            path: "/",
            name: "Home",
            component: Home,
        },
        {
            path: "/About",
            name: "About",
            component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        },
        {
            path: "/Notas",
            name: "Notas",
            component: () => import('./views/Notas.vue'),
            meta: { requireAuth: true }
        },
        {
            path: "/Login",
            name: "Login",
            component: () => import('./views/Login.vue')
        },
        {
            path: "/Pedidos",
            name: "Pedidos",
            component: () => import('./views/Pedidos.vue')
        },
        {
            path: "/Cadets",
            name: "Cadets",
            component: () => import('./views/Cadets.vue')
        },
        {
            path: "/Administracion",
            name: "Administracion",
            component: () => import('./views/Administracion.vue')
        }
    ]
})

router.beforeEach((to, from, next) => {
    const protectedRoute = to.matched.some(record => record.meta.requireAuth);
    
    if (protectedRoute && store.state.token === '') {
        next({ name: "Login" });
    } else {
        next();
    }
})

export default router