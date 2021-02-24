self.addEventListener('install', e => {
    caches
    .open('offline-site')
    .then(
        function(cache) {
            return cache.addAll([
                './',
                './styles.css',
                './script.js',
                './image.jpg',
            ])
        }
    )
})

self.addEventListener('fetch', event => {
    event.respondWith(
        caches
        .match(event.request)
        .then(
            function(response) {
                return response || fetch(event.request)
            }
        )
    )
})