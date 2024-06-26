// import { handleUnauthRoute, handleAuthRoute } from './authGuard';
import Login from '@/views/Login.vue';
const MainLayout = () => import(/* webpackChunkName: "v-v" */ '@/layout/MainLayout.vue');
const Unauthorized = () => import(/* webpackChunkName: "v-v" */ '@/views/Unauthorized.vue');
const Dashboard = () => import(/* webpackChunkName: "v-v" */ '@/views/Dashboard.vue');


export default [
    {
        path: '/',
        component: MainLayout,
        // beforeEnter: handleAuthRoute,
        name: 'base',
        redirect: { name: 'dashboard' },
        children: [
            {
                path: '/',
                name: 'dashboard',
                component: Dashboard,
            }
        ],
    },
    // {
    //     path: '/login',
    //     name: 'login',
    //     component: Login,
    //     beforeEnter: handleUnauthRoute,
    // },
    // {
    //     path: '/unauthorized',
    //     name: 'unauthorized',
    //     component: Unauthorized,
    //     beforeEnter: handleAuthRoute,
    // },
];
