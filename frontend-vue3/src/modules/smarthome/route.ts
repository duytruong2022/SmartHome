import { RouteRecordRaw } from 'vue-router';
import home from './home.vue';

export default [
    {
        path: '/',
        name: 'Home',
        component: home,
        meta: {
            public: false,
            name: 'home',
        },
    },
] as RouteRecordRaw[];
