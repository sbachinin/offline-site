const shellFilePaths = [
    './',
    './styles.css',
    './script.js',
    './image.jpg',
]

self.addEventListener('install', e => {
    caches.open('offline-site')
        .then(cache => cache.addAll(shellFilePaths)
    )
})

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                const fetchPromise = fetch(event.request)
                    .then(async freshResponse => {
                        const isShellFile = shellFilePaths.includes(event.request.url)
                        if (isShellFile) {
                            const oldHtmlText = await response.clone().text()
                            const htmlText = await freshResponse.clone().text()
                            if (oldHtmlText === htmlText) return
                            const clients = await self.clients.matchAll()
                            clients.forEach(client => client.postMessage({
                                msg: 'new HTML file received'
                            }))
                        }
                        const cache = await caches.open('offline-site')
                        cache.put(event.request, freshResponse.clone())
                        return freshResponse
                    })
                
                return response.clone() || fetchPromise
            })
    )
})
