import data from "../data/project.json" assert { type: "json" };
import addClickAndEnterHandler from "../utils/addClickAndEnterHandler.js";
import addKeyboardController from "../utils/addKeyboardController.js";
import { addBlurHandler, addFocus, addFocusHandler } from "../utils/focus.js";
import { play } from "../utils/sound.js";
import Project from "./Project.js";
import Loading from "./Loading.js";
import {
  makeElementWithClasses,
  addAttribute,
  makeImg,
} from "../utils/controllDOM.js";

export default function Selection(projectTitle = undefined) {
  const makeTitle = (className) => {
    const titleElem = makeElementWithClasses("h2")(className);
    return addAttribute(titleElem)({ text: "Project Select" });
  };

  const makeProjectItem = (projectTitle) => {
    const projectItem = makeElementWithClasses("li")(
      "project-content__selection__item",
      "focusable"
    );
    return addAttribute(projectItem)({ tabIndex: 0, text: projectTitle });
  };

  const insertProjectsIntoList = (projectList) => {
    const projectArray = Object.keys(data);
    projectArray.map((projectTitle) => {
      const projectItem = makeProjectItem(projectTitle);
      projectList.appendChild(projectItem);
    });
    return projectList;
  };

  const addEventProjectItem = (project) => {
    const projectTitle = project.textContent.trim();
    const projectData = data[projectTitle];
    const projectSkill = projectData.spec.skill.split(", ");
    const selectSound = document.querySelector("#project-sound");
    const startSound = document.querySelector("#game-start");
    const describe = document.querySelector(".project__describe");
    const ulElem = document.querySelector(".project-content__overview__skill");
    const startProject = () => {
      play(startSound);
      Loading("Hamelln");
      setTimeout(() => {
        Project(projectData);
      }, 1000);
    };

    const handleFocus = () => {
      addAttribute(describe)({ text: projectData.describe });

      projectSkill.map((skill) => {
        const liElem = makeElementWithClasses("li")(
          "project-content__overview__skill__item"
        );
        addAttribute(liElem)({ text: skill });
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

  const prevFocus = (focusedProjectTitle) => {
    if (!focusedProjectTitle) return;

    const projectList = document.querySelectorAll(
      ".project-content__selection__item"
    );

    for (const project of projectList) {
      const title = project.textContent.trim();
      if (title === focusedProjectTitle) {
        addFocus(project);
        return;
      }
    }
  };

  const render = () => {
    const parent = document.querySelector(".project-content");
    const selectionBox = makeElementWithClasses("div")(
      "project-content__selection"
    );
    const selectionTitle = makeTitle("project-content__selection__title");
    const selectionList = makeElementWithClasses("ul")(
      "project-content__selection__list"
    );
    const figure = makeElementWithClasses("figure")(
      "project-content__overview"
    );
    const projectImg = makeImg("project-content__overview__image")(
      "./public/img/cafe.png"
    )("project image");
    const projectSkill = makeElementWithClasses("ul")(
      "project-content__overview__skill"
    );
    selectionBox.appendChild(selectionTitle);
    selectionBox.appendChild(selectionList);
    insertProjectsIntoList(selectionList);
    figure.appendChild(projectImg);
    figure.appendChild(projectSkill);
    parent.innerHTML = "";
    parent.appendChild(selectionBox);
    parent.appendChild(figure);
    selectionList.childNodes.forEach((project) => {
      addEventProjectItem(project, projectTitle);
    });
    addKeyboardController();
    prevFocus(projectTitle);
  };

  render();
}
