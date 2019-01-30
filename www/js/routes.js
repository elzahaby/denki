var routes = [
	// Index page
	{
		path: '/',
		componentUrl: './pages/home.htm',
	},
	{
		path: '/home/:id',
		componentUrl: './pages/home.htm',
	},
	{
		path: '/left',
		componentUrl: './pages/left.htm',
	},
	/* Default route (404 page). MUST BE THE LAST*/
	{
		path: '(.*)',
		url: './pages/404.htm',
	},
];