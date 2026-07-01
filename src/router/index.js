import {createRouter, createWebHistory} from 'vue-router'
import store from '@/store'

const ifNotAuthenticated = (to, from, next) => {
    if (!store.getters.isAuthenticated) {
        next();
        return;
    }
    next('/');
};

const ifAuthenticated = (to, from, next) => {
    if (store.getters.isAuthenticated) {
        next();
        return;
    }
    next('/login');
};

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('../views/HomeView.vue'),
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../components/Login.vue'),
        beforeEnter: ifNotAuthenticated,
    },
    {
        path: "/register",
        name: "register",
        component: () => import("../components/Register.vue"),
        beforeEnter: ifNotAuthenticated,
    },
    {
        path: "/cart",
        name: "cart",
        component: () => import("../components/Cart.vue"),
        beforeEnter: ifAuthenticated,
    },
    {
        path: "/logout",
        name: "logout",
        component: () => import("../components/Logout.vue"),
        beforeEnter: ifAuthenticated,
    },
    {
        path: "/orders",
        name: "orders",
        component: () => import("../components/Orders.vue"),
        beforeEnter: ifAuthenticated
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;