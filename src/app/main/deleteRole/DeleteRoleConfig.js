import React from 'react';

const DeleteRoleConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    auth: ['role-list', 'role-edit', 'role-delete', 'role-create'],
    routes: [
        {
            path: '/delete_user/:id',
            component: React.lazy(() => import('./DeleteRole')),
        }
    ]
};

export default DeleteRoleConfig;