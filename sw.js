self.addEventListener('install', e => {
    caches.open('offline-site')
        .then(cache => cache.addAll([
            './',
            './styles.css',
            './script.js',
            './image.jpg',
        ])
    )
})

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                const fetchPromise = fetch(event.request)
                    .then(freshResponse => {
                        return caches.open('offline-site')
                            .then(cache => {
                                cache.put(event.request, freshResponse.clone())
                                return freshResponse
                            })
                    })
                
                return response || fetchPromise
            })
    )
})
