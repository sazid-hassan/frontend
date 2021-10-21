import React from 'react';

const InsertRoleConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    auth: ['role-list', 'role-edit', 'role-delete', 'role-create'],
    routes: [
        {
            path: '/add_users',
            component: React.lazy(() => import('./Insert')),
        }
    ]
};

export default InsertRoleConfig;