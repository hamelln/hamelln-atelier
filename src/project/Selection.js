import data from "../data/project.json" assert { type: "json" };

export default function Selection() {
  const makeBox = () => {
    const boxElem = document.createElement("div");
    boxElem.classList.add("project-content__selection");
    return boxElem;
  };

  const makeTitle = () => {
    const titleElem = document.createElement("h2");
    titleElem.textContent = "Project Select";
    titleElem.classList.add("project-content__selection__title");
    return titleElem;
  };

  const makeProjectList = () => {
    const ulElem = document.createElement("ul");
    ulElem.classList.add("project-content__selection__list");
    const keys = Object.keys(data);
    keys.map((key) => {
      const liElem = makeProjectItem(key);
      ulElem.appendChild(liElem);
    });
    return ulElem;
  };

  const makeProjectItem = (projectTitle) => {
    const liElem = document.createElement("li");
    liElem.classList.add("project-content__selection__item");
    liElem.classList.add("focusable");
    liElem.tabIndex = 0;
    liElem.textContent = projectTitle;

    return liElem;
  };

  const makeFigure = () => {
    const figureElem = document.createElement("figure");
    const imgElem = document.createElement("img");
    figureElem.classList.add("project-content__overview");
    imgElem.classList.add("project-content__overview__image");
    imgElem.src = "./public/img/cafe.png";
    imgElem.alt = "project image";
    figureElem.appendChild(imgElem);
    return figureElem;
  };

  const makeSelectionBox = () => {
    const boxElem = makeBox();
    const listElem = makeProjectList();
    const titleElem = makeTitle();
    boxElem.appendChild(titleElem);
    boxElem.appendChild(listElem);
    return boxElem;
  };

  const render = () => {
    const elem = document.querySelector(".project-content");
    elem.innerHTML = "";
    const box = makeSelectionBox();
    const figure = makeFigure();
    elem.appendChild(box);
    elem.appendChild(figure);
  };
  render();
}
