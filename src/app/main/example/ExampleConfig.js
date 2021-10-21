// import i18next from 'i18next';
// import Example from './Example';
// import en from './i18n/en';
// import tr from './i18n/tr';
// import ar from './i18n/ar';

// i18next.addResourceBundle('en', 'examplePage', en);
// i18next.addResourceBundle('tr', 'examplePage', tr);
// i18next.addResourceBundle('ar', 'examplePage', ar);
// import Example from './Example';

// const ExampleConfig = {
// 	settings: {
// 		layout: {
// 			config: {}
// 		}
// 	},
// 	routes: [
// 		{
// 			path: '/example',
// 			component: Example
// 		}
// 	]
// };

// export default ExampleConfig;

/**
 * Lazy load Example
 */

import React from 'react';

const ExampleConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth: ['view-authorization'],
	routes: [
		{
			path: '/example',
			component: React.lazy(() => import('./Example'))
		}
	]
};

export default ExampleConfig;
