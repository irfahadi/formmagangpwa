self.addEventListener('install', function(){
	console.log('SW Installed');
	event.waitUntil(caches.open('static')
	.then(function(cache){
		cache.addAll([
			'/',
			'/index.html',
			'/img/BI.jpg',
			'https://cdn.jsdelivr.net/npm/bulma@0.8.0/css/bulma.min.css',
			'https://use.fontawesome.com/releases/v5.3.1/js/all.js',
			'https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css',
			'https://code.jquery.com/jquery-1.12.4.js',
			'https://momentjs.com/downloads/moment.js',
			'https://code.jquery.com/ui/1.12.1/jquery-ui.js'
			]);
	})
	);
});

self.addEventListener('activate', function(){
	console.log('SW Activated')
})