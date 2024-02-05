import { createStore } from 'vuex';
import users from '@/store/modules/users';

export const store = createStore({
    modules: {
        users,
    },
});
