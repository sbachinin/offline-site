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
        fetch(event.request)
            .then(freshResponse => {
                caches.open('offline-site')
                    .then(cache => {
                        cache.put(event.request, freshResponse.clone())
                    })
                return freshResponse.clone()
            })
            .catch(() => caches.match(event.request))
    )
})