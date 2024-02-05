// import { usersAPI } from '@/api';
import rolePermissionMap from '../../rolesMapping.json';

const state = () => ({
    user: {},
    role: '',
    users: [],
});

const getters = {
    can: state => permission => {
        let isPermitted = false;
        const roleObject = rolePermissionMap[state.role];
        if (roleObject) {
            roleObject.actions.forEach(action => {
                if (action.name === permission) {
                    isPermitted = true;
                }
            });
        }
        return isPermitted;
    },
};

const mutations = {
    setCurrentUser(state, user) {
        state.user = user;
    },
    setCurrentUserRole(state, role) {
        state.role = role;
    },
    setUsers(state, users) {
        state.users = users;
    },
};

const actions = {
    async getCurrentUser({ commit }) {
        // Need proper Endpoint
        const response = {
            data: {"status":"success","email":"con-akhan@accelerate360.com","oid":"32ca85f6-0179-4bcd-ad3b-b8d09338d714","id":519,"name":"Aamir khan","role":99,"user_role":"admin"}
        }
        commit('setCurrentUser', response.data);
        commit('setCurrentUserRole', response.data.user_role);
        return response.data;
    },
    async getAllUsers({ commit }, params) {
        commit('setUsers', []);
        const response = await usersAPI.getAllUsersAPI(params);
        commit('setUsers', response.data.data);
        return response.data.totalrows;
    },
    async getAllRoles(_) {
        return await usersAPI.getAllRolesAPI();
    },
    async updateUserRole(context, payload) {
        await usersAPI.updateUserRoleAPI(payload);
    },
};

export default {
    state,
    getters,
    mutations,
    actions,
};
