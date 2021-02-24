let scale = 1

document.querySelector('img').addEventListener('click', e => {
    e.target.style.transform = 'scale(' + (scale += 0.1) + ')'
})
document.querySelector('img').addEventListener('contextmenu', e => {
    e.preventDefault()
    e.target.style.transform = 'scale(' + (scale -= 0.1) + ')'
})
