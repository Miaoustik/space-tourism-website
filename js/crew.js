/**
 *
 * @param {Event} e
 * @param {Array<Object>} crew
 */
const listener = (e, crew) => {
  const role = e.currentTarget.childNodes[1].innerText;
  const data = crew.filter((c) => c.role === role)[0];
  const key = crew.indexOf(data);

  const panel = document.querySelector("#crewPanel");
  panel.setAttribute("aria-labelledby", `#tab-${key + 1}`);

  const h2 = panel.querySelector("h2");
  const span = h2.childNodes[1];

  h2.innerText = data.role;
  span.innerText = data.name;
  h2.appendChild(span);

  const p = panel.querySelector("p");
  p.innerText = data.bio;

  const img = document.querySelector(".crew-img");

  const path =
    "./assets/crew/image-" + data.name.toLowerCase().replace(" ", "-");

  img.children[0].setAttribute("srcset", path + ".webp");
  img.children[1].setAttribute("src", path + ".png");
  img.children[1].setAttribute("alt", data.name);
};

fetch("./data/crew.json")
  .then((res) => res.json())
  .then((crew) => {
    const buttons = document.querySelectorAll(".dot-indicators > button");

    buttons.forEach((b) =>
      b.addEventListener("click", (e) => listener(e, crew))
    );
  });
