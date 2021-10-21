import React from 'react';
// const id = props

const UpdateRoleConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    auth: ['role-list', 'role-edit', 'role-delete', 'role-create'],
    routes: [
        {
            path: '/update/:id',
            component: React.lazy(() => import('./UpdateNew')),
        }
    ]
};

export default UpdateRoleConfig;