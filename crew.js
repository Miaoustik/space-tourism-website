
/**
 * 
 * @param {Event} e 
 * @param {Array<Object>} crew 
 * @param {Array} buttons 
 */
const listener = (e, crew, buttons) => {

    buttons.forEach(button => {
        if (button === e.currentTarget) {
            button.setAttribute("aria-selected", true)
        } else {
            button.setAttribute("aria-selected", false)
        }
    })

    const role = e.currentTarget.childNodes[1].innerText
    const data = crew.filter(c => c.role === role)[0]

    const h2 = document.querySelector(".crew-info > h2")
    const span = h2.childNodes[1]

    h2.innerText = data.role
    span.innerText = data.name
    h2.appendChild(span)
    
    const p = document.querySelector(".crew-info > p")
    p.innerText = data.bio
    
    const img = document.querySelector(".crew-img")

    const path = './assets/crew/image-' + (data.name.toLowerCase().replace(' ', '-'))
    
    img.children[0].setAttribute('srcset', path + '.webp')
    img.children[1].setAttribute('src', path + ".png")
    img.children[1].setAttribute('alt', data.name)
}

fetch('./crew.json')
    .then(res => res.json())
    .then(crew => {
        const buttons = document.querySelectorAll(".dot-indicators > button")

        buttons.forEach(b => b.addEventListener("click", (e) => listener(e, crew, buttons)))
    })

