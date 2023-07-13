export default function Loading(loadingText) {
  const makeBox = () => {
    const boxElem = document.createElement("div");
    boxElem.classList.add("project-content__loading");
    return boxElem;
  };

  const makeText = () => {
    const textElem = document.createElement("h2");
    textElem.classList.add("project-content__loading__text");
    textElem.textContent = loadingText;
    return textElem;
  };

  const makeHTML = () => {
    const boxElem = makeBox();
    const textElem = makeText();
    boxElem.appendChild(textElem);
    return boxElem;
  };

  const render = () => {
    let elem = document.querySelector(".project-content");
    const boxElem = makeHTML();
    elem.innerHTML = "";
    elem.appendChild(boxElem);
  };

  render();
}
