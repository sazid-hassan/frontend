import CheckRoleList from "./CheckRoleList";

const CheckRoleListConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    auth: ['role-list', 'role-edit', 'role-delete', 'role-create'],
    routes: [
        {
            path: '/roles',
            component: CheckRoleList,
        }
    ]
};

export default CheckRoleListConfig;