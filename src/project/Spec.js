export default function Spec(
  { period, member, skill, role, characterImage },
  renderProject
) {
  const makeBox = () => {
    const boxElem = document.createElement("div");
    boxElem.classList.add("project-content__spec");
    return boxElem;
  };

  const makeFigure = () => {
    const figureElem = document.createElement("figure");
    const imgElem = document.createElement("img");
    figureElem.classList.add("project-content__spec__character");
    imgElem.classList.add("project-content__spec__character__image");
    imgElem.src = characterImage;
    imgElem.alt = ".project character image";
    figureElem.appendChild(imgElem);
    return figureElem;
  };

  const makeDescribe = () => {
    const describeElem = document.createElement("div");
    const pElem = document.createElement("p");
    const EnterElem = document.createElement("p");
    describeElem.classList.add("project-content__spec__box");
    pElem.classList.add("project-content__spec__box__describe");
    EnterElem.classList.add("project-content__spec__box__Enter");
    pElem.textContent = "안녕하세요.";
    EnterElem.textContent = "Enter";
    EnterElem.addEventListener("click", renderProject);
    describeElem.appendChild(pElem);
    describeElem.appendChild(EnterElem);
    return describeElem;
  };

  const makeHTML = () => {
    const boxElem = makeBox();
    const figureElem = makeFigure();
    const describeElem = makeDescribe();
    boxElem.appendChild(figureElem);
    boxElem.appendChild(describeElem);
    return boxElem;
  };

  const focus = () => {
    const list = document.querySelectorAll(".project-box__info__item");
    for (const item of list) {
      if (item.textContent === "spec") {
        addFocus(item);
        break;
      }
    }
  };

  const render = () => {
    let elem = document.querySelector(".project-content");
    elem.innerHTML = "";
    const boxElem = makeHTML();
    elem.appendChild(boxElem);
  };

  render();
}
