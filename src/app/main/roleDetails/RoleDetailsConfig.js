import RoleDetails from "./RoleDetails";

const RoleDetailsConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    auth: ['role-list', 'role-edit', 'role-delete', 'role-create'],
    routes: [
        {
            path: '/role_details/:id',
            component: RoleDetails,
        }
    ]
};

export default RoleDetailsConfig;