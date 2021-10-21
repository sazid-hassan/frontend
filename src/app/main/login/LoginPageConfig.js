import React from 'react';
import { authRoles } from 'app/auth';

const LoginPageConfig = {
	settings: {
		layout: {
			config: {
				navbar: {
					display: false
				},
				toolbar: {
					display: false
				},
				footer: {
					display: false
				}
			}
		}
	},
	auth: authRoles.onlyGuest,
	routes: [
		{
			path: '/login',
			component: React.lazy(() => import('./LoginPage'))
		}
	]
};

export default LoginPageConfig;
