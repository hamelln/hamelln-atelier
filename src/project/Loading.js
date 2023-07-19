import createElement from "../utils/createElement.js";

export default function Loading(textContent) {
  const render = () => {
    const parent = document.querySelector(".project-content");

    const loadingBox = createElement("div", {
      class: "project-content__loading",
    });

    const loadingContent = createElement("h2", {
      class: "project-content__loading__text",
      textContent,
    });

    parent.innerHTML = "";
    loadingBox.appendChild(loadingContent);
    parent.appendChild(loadingBox);
  };

  render();
}
