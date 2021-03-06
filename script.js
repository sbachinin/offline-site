let scale = 1

document.querySelector('img').addEventListener('click', e => {
    e.target.style.transform = 'scale(' + (scale += 0.1) + ')'
})
document.querySelector('img').addEventListener('contextmenu', e => {
    e.preventDefault()
    e.target.style.transform = 'scale(' + (scale -= 0.1) + ')'
})

navigator.serviceWorker.addEventListener('message', event => {
    setTimeout(() => {
        const div = document.createElement('div')
        div.innerHTML = '<button onclick="location.reload()">Refresh to get an update</button>'
        document.body.append(div)
    }, 2000)
})