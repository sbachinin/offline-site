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
                    .then(async freshResponse => {
                        if (event.request.mode === 'navigate') {
                            const htmlText = await freshResponse.clone().text()
                            
                            const clients = await self.clients.matchAll()
                            clients.forEach(client => client.postMessage({
                                msg: 'update HTML'
                            }))
                        }
                        const cache = await caches.open('offline-site')
                        cache.put(event.request, freshResponse.clone())
                        return freshResponse
                    })
                
                return response || fetchPromise
            })
    )
})
