import React from 'react';
const AllRoleConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    auth: ['role-list', 'role-edit', 'role-delete', 'role-create'],
    routes: [
        {
            path: '/allRoles',
            component: React.lazy(() => import('./AllRole')),
        }
    ]
};

export default AllRoleConfig;