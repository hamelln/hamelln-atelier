import data from "../data/project.json" assert { type: "json" };
import addClickAndEnterHandler from "../utils/addClickAndEnterHandler.js";
import addKeyboardController from "../utils/addKeyboardController.js";
import { addBlurHandler, addFocus, addFocusHandler } from "../utils/focus.js";
import { play } from "../utils/sound.js";
import Project from "./Project.js";
import Loading from "./Loading.js";
import {
  makeElementWithClasses,
  addSrcAndAlt,
  getByQuery,
  getByQueryAll,
} from "../utils/controllDOM.js";

export default function Selection(projectTitle = undefined) {
  const makeBox = () => {
    return makeElementWithClasses("div")("project-content__selection");
  };

  const makeTitle = () => {
    const titleElem = makeElementWithClasses("h2")(
      "project-content__selection__title"
    );
    titleElem.textContent = "Project Select";
    return titleElem;
  };

  const makeProjectList = () => {
    const ulElem = makeElementWithClasses("ul")(
      "project-content__selection__list"
    );
    const keys = Object.keys(data);
    keys.map((key) => {
      const projectItem = makeProjectItem(key);
      addEventProjectItem(projectItem, key);
      ulElem.appendChild(projectItem);
    });
    return ulElem;
  };

  const makeProjectItem = (projectTitle) => {
    const liElem = makeElementWithClasses("li")(
      "project-content__selection__item",
      "focusable"
    );
    liElem.tabIndex = 0;
    liElem.textContent = projectTitle;
    return liElem;
  };

  const makeFigure = () => {
    const src = "./public/img/cafe.png";
    const alt = "project image";
    const figureElem = makeElementWithClasses("figure")(
      "project-content__overview"
    );
    const imgElem = addSrcAndAlt(
      makeElementWithClasses("img")("project-content__overview__image")
    )(src)(alt);
    const ulElem = makeElementWithClasses("ul")(
      ".project-content__overview__skill"
    );

    figureElem.appendChild(imgElem);
    figureElem.appendChild(ulElem);
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
    const projectSkill = projectData.spec.skill.split(", ");
    const selectSound = getByQuery("#project-sound");
    const startSound = getByQuery("#game-start");
    const describe = getByQuery(".project__describe");
    const ulElem = getByQuery(".project-content__overview__skill");
    const startProject = () => {
      play(startSound);
      Loading("Hamelln");
      setTimeout(() => {
        Project(projectData);
      }, 1000);
    };

    const handleFocus = () => {
      const describeText = projectData.describe;
      describe.textContent = describeText;

      projectSkill.map((skill) => {
        const liElem = document.createElement("li");
        liElem.textContent = skill;
        ulElem.appendChild(liElem);
      });

      play(selectSound);
    };

    const handleBlur = () => {
      describe.textContent = "";
      ulElem.innerHTML = "";
    };

    addFocusHandler(project)(handleFocus);
    addBlurHandler(project)(handleBlur);
    addClickAndEnterHandler(project)(startProject);
  };

  const render = () => {
    const elem = getByQuery(".project-content");
    elem.innerHTML = "";
    const box = makeSelectionBox();
    const figure = makeFigure();
    elem.appendChild(box);
    elem.appendChild(figure);
    addKeyboardController();
    prevFocus(projectTitle);
  };

  const prevFocus = (focusedProjectTitle) => {
    if (!focusedProjectTitle) return;

    const list = getByQueryAll(".project-content__selection__item");
    for (const project of list) {
      const title = project.textContent.trim();
      if (title === focusedProjectTitle) {
        addFocus(project);
        break;
      }
    }
  };

  render();
}
