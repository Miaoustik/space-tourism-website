
/**
 * 
 * @param {Event} e 
 * @param {Array<Object>} destinations 
 * @param {Array} buttons 
 */
const listener = (e, destinations, buttons) => {

    buttons.forEach(button => {
        if (button === e.currentTarget) {
            button.setAttribute("aria-selected", true)
        } else {
            button.setAttribute("aria-selected", false)
        }
    })

    const name = e.currentTarget.innerText[0] + e.currentTarget.innerText.slice(1).toLowerCase()

    const destination = destinations.filter(d => d.name === name)[0]

    const h2 = document.querySelector(".destination-info > h2")
    const p = document.querySelector(".destination-info > p")

    const metas = document.querySelectorAll(".destination-meta p")


    h2.innerText = destination.name
    p.innerText = destination.description

    metas[0].innerText = destination.distance
    metas[1].innerText = destination.travel

    const img = document.querySelector(".destination-img")

    const path = "./assets/destination/image-" + name.toLowerCase()
    img.children[0].setAttribute('srcset', path + ".webp")
    img.children[1].setAttribute('src', path + ".png")
    img.children[1].setAttribute('alt', destination.name)
}

fetch('./destination.json')
    .then(res => res.json())
    .then(destinations => {
        const buttons = document.querySelectorAll(".tab-list > button")

        buttons.forEach(b => b.addEventListener("click", (e) => listener(e, destinations, buttons)))
    })

