import Vue from "vue"
import Router from "vue-router"
import Home from "../views/Home.vue"
import NotFound from '../components/Misc/NotFound.vue';
import InConstrunction from '../components/Misc/InConstruction.vue';

import store from "../store"

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
            component: () => import('../views/About.vue')
        },
        {
            path: "/Inflation",
            name: "Inflation",
            component: InConstrunction,
        },
        {
            path: "/Donations",
            name: "Donations",
            component: InConstrunction,
        },
        {
            path: "/Currencies",
            name: "Currencies",
            component: InConstrunction,
        },
        {
            path: "/Historic",
            name: "Historic",
            component: InConstrunction,
        },
        {
            path: "/BugReport",
            name: "BugReport",
            component: InConstrunction,
        },
        // {
        //     path: "/MyProfile",
        //     name: "MyProfile",
        //     component: () => import('../views/MyProfile/MyProfile.vue')
        // },
        {
            path: '*',
            name: 'NotFound',
            component: NotFound,
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