import data from "../data/project.json" assert { type: "json" };
import addKeyboardNavigationWithScroll from "../ui/addKeyboardNavigationWithScroll.js";
import addClickAndEnterHandler from "../utils/addClickAndEnterHandler.js";
import { addBlurHandler, addFocusHandler } from "../utils/focus.js";
import { play } from "../utils/sound.js";
import Project from "./Project.js";

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
      const projectItem = makeProjectItem(key);
      addEventProjectItem(projectItem, key);
      ulElem.appendChild(projectItem);
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

  const addEventProjectItem = (project, projectTitle) => {
    const projectData = data[projectTitle];
    const selectSound = document.getElementById("project-sound");
    const startSound = document.getElementById("game-start");
    const skills = document.querySelector(".project__skills");
    const startProject = () => {
      play(startSound);
      Project(projectData);
    };

    const handleFocus = () => {
      const skillText = projectData.spec.skill;
      skills.textContent = skillText;
      play(selectSound);
    };

    const handleBlur = () => {
      skills.textContent = "";
    };

    addFocusHandler(project)(handleFocus);
    addBlurHandler(project)(handleBlur);
    addClickAndEnterHandler(project)(startProject);
  };

  const render = () => {
    const elem = document.querySelector(".project-content");
    elem.innerHTML = "";
    const box = makeSelectionBox();
    const figure = makeFigure();
    elem.appendChild(box);
    elem.appendChild(figure);
    addKeyboardNavigationWithScroll();
  };
  render();
}
