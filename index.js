const nav = document.querySelector("#primary-navigation")

const navToggle = document.querySelector(".mobile-nav-toggle")

navToggle.addEventListener("click", () => {

    if (nav.dataset.visible === "true") {
        navToggle.setAttribute("aria-expanded", false)
        nav.dataset.visible = false
    } else {
        navToggle.setAttribute("aria-expanded", true)
        nav.dataset.visible = true
    }
})