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

const createTitle = (className) => {
  const titleElem = makeElementWithClasses("h2")(className);
  return addAttribute(titleElem)({ text: "Project Select" });
};

const createProjectItem = (projectTitle) => {
  const projectItem = makeElementWithClasses("li")(
    "project-content__selection__item",
    "focusable"
  );
  return addAttribute(projectItem)({ tabIndex: 0, text: projectTitle });
};

const insertProjectsIntoList = (projectList) => {
  const projectArray = Object.keys(data);
  projectArray.map((projectTitle) => {
    const projectItem = createProjectItem(projectTitle);
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
      setProjectImage(projectTitle);
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

const findPrevFocusItem = (className, textContent) => {
  const items = Array.from(document.querySelectorAll(className));
  return items.find((item) => item.textContent.trim() === textContent);
};

const focusPreviousItem = (projectTitle) => {
  if (!projectTitle) return;
  const focusedItem = findPrevFocusItem(
    ".project-content__selection__item",
    projectTitle
  );
  addFocus(focusedItem);
};

const createSelections = () => {
  const selectionBox = makeElementWithClasses("div")(
    "project-content__selection"
  );
  const selectionTitle = createTitle("project-content__selection__title");
  const selectionList = makeElementWithClasses("ul")(
    "project-content__selection__list"
  );
  return { selectionBox, selectionTitle, selectionList };
};

const createFigureItems = () => {
  const figure = makeElementWithClasses("figure")("project-content__overview");
  const projectImg = makeImg("project-content__overview__image")("", "");
  const projectSkill = makeElementWithClasses("ul")(
    "project-content__overview__skill"
  );
  return { figure, projectImg, projectSkill };
};

const setProjectImage = (projectTitle) => {
  const imageSrc = data[projectTitle].backgroundImage;
  const imageAlt = `${projectTitle} image`;
  const imgElement = document.querySelector(
    ".project-content__overview__image"
  );
  imgElement.src = imageSrc;
  imgElement.alt = imageAlt;
};

const render = (parent, projectTitle) => {
  const { selectionBox, selectionTitle, selectionList } = createSelections();
  const { figure, projectImg, projectSkill } = createFigureItems();

  insertProjectsIntoList(selectionList);
  selectionBox.appendChild(selectionTitle);
  selectionBox.appendChild(selectionList);
  figure.appendChild(projectImg);
  figure.appendChild(projectSkill);

  parent.innerHTML = "";
  parent.appendChild(selectionBox);
  parent.appendChild(figure);

  selectionList.childNodes.forEach((project) => {
    addEventProjectItem(project, projectTitle);
  });
  addKeyboardController();
  focusPreviousItem(projectTitle);
};

export default function Selection(projectTitle = undefined) {
  const parent = document.querySelector(".project-content");
  render(parent, projectTitle);
}
