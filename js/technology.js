/**
 *
 * @param {Event} e
 * @param {Array<Object>} destinations
 * @param {Array} buttons
 */
const listener = (e, technologies) => {
  const key = parseInt(e.currentTarget.innerText) - 1;
  const technology = technologies[key];

  const article = document.querySelector(".technology-info");
  article.setAttribute("aria-labelledby", `#tab-${key + 1}`);

  const span = article.querySelector(" h2 > span");
  span.innerText = technology.name;

  const p = article.querySelector("p");
  p.innerText = technology.description;

  let path =
    "assets/technology/image-" +
    technology.name.replace(" ", "-").toLowerCase();

  const picture = document.querySelector(".grid-wrapper--technology > picture");

  const source = picture.children[0];
  const img = picture.children[1];

  source.setAttribute("srcset", path + "-portrait.jpg");
  img.setAttribute("src", path + "-landscape.jpg");
  img.setAttribute("alt", technology.name);
};

fetch("./data/technology.json")
  .then((res) => res.json())
  .then((technologies) => {
    const buttons = document.querySelectorAll(".number-indicators > button");

    buttons.forEach((b) =>
      b.addEventListener("click", (e) => listener(e, technologies))
    );
  });
