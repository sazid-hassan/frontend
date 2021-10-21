import React from 'react';
import { Redirect } from 'react-router-dom';
import FuseUtils from '@fuse/utils';
import LoginPageConfig from 'app/main/login/LoginPageConfig';
import ExampleConfig from 'app/main/example/ExampleConfig';
import InsertRoleConfig from 'app/main/CRUDs/InsertRoleConfig';
import CheckRoleListConfig from 'app/main/roleList/CheckRoleListConfig'
import DeleteRoleConfig from 'app/main/deleteRole/DeleteRoleConfig';
import UpdateRoleConfig from 'app/main/updateRole/UpdateRoleConfig';
import RoleDetailsConfig from 'app/main/roleDetails/RoleDetailsConfig';
import AllRoleConfig from 'app/main/allRole/AllRoleConfig';


const routeConfigs = [
	ExampleConfig,
	LoginPageConfig,
	InsertRoleConfig,
	CheckRoleListConfig,
	DeleteRoleConfig,
	UpdateRoleConfig,
	RoleDetailsConfig,
	AllRoleConfig,
];

const routes = [
	...FuseUtils.generateRoutesFromConfigs(routeConfigs),
	{
		path: '/',
		component: () => <Redirect to="/example" />
	},
	{
		path: '/login',
		component: () => <Redirect to="/login" />
	}
];

export default routes;
