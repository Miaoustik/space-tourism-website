/**
 *
 * @param {Event} e
 * @param {Array<Object>} destinations
 */
const listener = (e, destinations) => {
  const name =
    e.currentTarget.innerText[0] +
    e.currentTarget.innerText
      .slice(1)
      .toLowerCase();

  const destination = destinations.filter((d) => d.name === name)[0];

  const info = document.querySelector(".destination-info");
  info.setAttribute("aria-labelledby", "#" + destination.name);

  const h2 = info.querySelector("h2");
  const p = info.querySelector("p");

  const metas = document.querySelectorAll(".destination-meta p");

  h2.innerText = destination.name;
  p.innerText = destination.description;

  metas[0].innerText = destination.distance;
  metas[1].innerText = destination.travel;

  const img = document.querySelector(".destination-img");

  const path = "./assets/destination/image-" + name.toLowerCase();
  img.children[0].setAttribute("srcset", path + ".webp");
  img.children[1].setAttribute("src", path + ".png");
  img.children[1].setAttribute("alt", destination.name);
};

const buttons = document.querySelectorAll(".tab-list > button");

buttons.forEach((b) => b.setAttribute("disabled", true));

fetch("./data/destination.json")
  .then((res) => res.json())
  .then((destinations) => {
    buttons.forEach((b) => b.removeAttribute("disabled"));
    buttons.forEach((b) =>
      b.addEventListener("click", (e) => listener(e, destinations))
    );
  });
