const navigationConfig = [
	{
		id: 'applications',
		title: 'Applications',
		translate: 'APPLICATIONS',
		type: 'group',
		icon: 'apps',
		children: [
			{
				id: 'example-component',
				title: 'Example',
				translate: 'EXAMPLE',
				type: 'item',
				icon: 'whatshot',
				url: '/example'
			},




			{
				id: 'add-component',
				title: 'All Role Details',
				translate: 'All Role Details',
				type: 'item',
				icon: 'whatshot',
				url: '/allRoles'
			},
		]
	},
	{
		id: 'applications',
		title: 'Applications',
		translate: 'APPLICATIONS',
		type: 'group',
		icon: 'apps',
		children: [
			{

				id: 'example-component',
				title: 'Log In',
				translate: 'EXAMPLE',
				type: 'item',
				icon: 'whatshot',
				url: '/login'
			}
		]
	}
];

export default navigationConfig;
