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
            path: "/Register",
            name: "Register",
            component: () => import('./views/Register/Register.vue')
        },
        {
            path: "/Register/Success",
            name: "Success",
            component: () => import('./views/Register/Success.vue')
        },
        {
            path: "/Register/Confirm",
            name: "Confirm",
            component: () => import('./views/Register/Confirm.vue')
        },
        {
            path: "/Login",
            name: "Login",
            component: () => import('./views/Register/Login.vue')
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
        },
        {
            path: "/ForgotPassword",
            name: "ForgotPassword",
            component: () => import('./views/ForgotPassword/ForgotPassword.vue')
        },
        {
            path: "/ForgotPassword/Confirm",
            name: "ForgotPasswordConfirm",
            component: () => import('./views/ForgotPassword/Confirm.vue')
        },
        {
            path: "/ForgotPassword/Success",
            name: "ForgotPasswordSuccess",
            component: () => import('./views/ForgotPassword/Success.vue')
        },
        {
            path: "/Products",
            name: "Products",
            component: () => import('./views/Products.vue')
        },
        {
            path: "/LoadProducts",
            name: "LoadProducts",
            component: () => import('./views/Products/LoadProducts.vue')
        },
        {
            path: "/Categories",
            name: "Categories",
            component: () => import('./views/Categories.vue')
        },
        {
            path: "/Customers",
            name: "Customers",
            component: () => import('./views/Customers.vue')
        },
        {
            path: "/Users",
            name: "Users",
            component: () => import('./views/Users.vue')
        },
        {
            path: "/Shop",
            name: "Shop",
            component: () => import('./views/Shop.vue')
        },
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