let sizeTimer = null
const sizeListener = () => {
    window.clearTimeout(sizeTimer)
    sizeTimer = window.setTimeout(() => {
        const img = document.querySelector(".grid-wrapper--technology > img")

        let newPath = img.getAttribute('src')

        if (window.matchMedia('(min-width: 45em)').matches) {
            newPath = newPath.replace('landscape', 'portrait')
        } else {
            newPath = newPath.replace('portrait', 'landscape')
        }

        img.setAttribute('src', newPath)
    }, 300)
}

/**
 * 
 * @param {Event} e 
 * @param {Array<Object>} destinations 
 * @param {Array} buttons 
 */
const listener = (e, technologies, buttons) => {

    window.removeEventListener('resize', sizeListener)

    buttons.forEach(button => {
        if (button === e.currentTarget) {
            button.setAttribute("aria-selected", true)
        } else {
            button.setAttribute("aria-selected", false)
        }
    })

    const technology = technologies[parseInt(e.currentTarget.innerText) - 1]
    
    const span = document.querySelector('.technology-info > h2 > span')
    span.innerText = technology.name

    const p = document.querySelector('.technology-info > p')
    p.innerText = technology.description

    let path = "assets/technology/image-" + technology.name.replace(' ', '-').toLowerCase()

    if (window.matchMedia('(min-width: 45em)').matches) {
        path += "-portrait.jpg"
    } else {
        path += "-landscape.jpg"
    }

    const img = document.querySelector(".grid-wrapper--technology > img")
    img.style.content = 'initial'
    img.setAttribute("src", path)
    img.setAttribute('alt', technology.name)

    window.addEventListener('resize', sizeListener)
}

fetch('./technology.json')
    .then(res => res.json())
    .then(technologies => {
        const buttons = document.querySelectorAll(".number-indicators > button")

        buttons.forEach(b => b.addEventListener("click", (e) => listener(e, technologies, buttons)))
    })

