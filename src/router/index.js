import Vue from "vue"
import Router from "vue-router"
import Home from "../views/Home.vue"
import MarketRates from "../components/Cards/MarketRatesCards.vue"
import Indexes from "../views/Indexes/Indexes.vue"
import FixedTerm from "../views/FixedTerm/FixedTerm.vue"
import BugReport from "../views/BugReport/BugReport.vue"
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
            path: "/Donations",
            name: "Donations",
            component: InConstrunction,
        },
        {
            path: "/Currencies",
            name: "Currencies",
            component: MarketRates,
        },
        {
            path: "/Historic",
            name: "Historic",
            component: InConstrunction,
        },
        {
            path: "/BugReport",
            name: "BugReport",
            component: BugReport,
        },
        {
            path: "/Indexes",
            name: "Indexes",
            component: Indexes,
        },
        {
            path: "/FixedTerm",
            name: "FixedTerm",
            component: FixedTerm,
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