'use strict';
import MSALInstance from '@/auth/auth';
import { store } from '@/store';
import rolePermissionMap from '../rolesMapping.json';

export const handleUnauthRoute = (to, from, next) => {
    MSALInstance.checkAuth()
        // eslint-disable-next-line promise/no-callback-in-promise
        .then(() => next('/'))
        .catch(e => {
            console.log('handleUnauthRoute', e);
            // eslint-disable-next-line promise/no-callback-in-promise
            next();
        });
};

export const handleAuthRoute = (to, from, next) => {
    MSALInstance.checkAuth()
        // eslint-disable-next-line promise/no-callback-in-promise
        .then(() => next())
        .catch(e => {
            console.log('handleAuthRoute', e);
            // eslint-disable-next-line promise/no-callback-in-promise
            next({ path: '/login' });
        });
};

export const handleRouteAccess = route => {
    return new Promise((resolve, reject) => {
        let isPermitted = false;
        const role = store.state.users.role;
        const roleObject = rolePermissionMap[role];
        // eslint-disable-next-line sonarjs/no-collapsible-if
        if (roleObject) {
            if (roleObject.routes.includes(route)) {
                isPermitted = true;
            }
        }
        if (isPermitted) {
            resolve();
        } else {
            reject(role);
        }
    });
};
