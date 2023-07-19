import data from "../data/project.json" assert { type: "json" };
import addClickAndEnterHandler from "../utils/addClickAndEnterHandler.js";
import addKeyboardController from "../utils/addKeyboardController.js";
import { addBlurHandler, addFocus, addFocusHandler } from "../utils/focus.js";
import { play } from "../utils/sound.js";
import Project from "./Project.js";
import Loading from "./Loading.js";
import createElement from "../utils/createElement.js";

const createSelectionBox = (selectionList) => {
  const selectionBox = createElement("div", {
    class: "project-content__selection",
  });
  const selectionTitle = createElement("h2", {
    class: "project-content__selection__title",
    textContent: "Project Select",
  });

  selectionBox.appendChild(selectionTitle);
  selectionBox.appendChild(selectionList);
  return selectionBox;
};

const createProjectList = () => {
  const projectTitles = Object.keys(data);
  const projectList = createElement("ul", {
    class: "project-content__selection__list",
  });

  projectTitles.map((projectTitle) => {
    const projectItem = createElement("li", {
      class: "project-content__selection__item focusable",
      tabIndex: 0,
      textContent: projectTitle,
    });
    projectList.appendChild(projectItem);
  });
  return projectList;
};

const createProjectFigure = () => {
  const figure = createElement("figure", {
    class: "project-content__overview",
  });
  const projectImg = createElement("img", {
    class: "project-content__overview__image",
  });
  const projectSkill = createElement("ul", {
    class: "project-content__overview__skill",
  });

  figure.appendChild(projectImg);
  figure.appendChild(projectSkill);
  return figure;
};

const addEventProjectItem = (project) => {
  const projectTitle = project.textContent.trim();
  const projectData = data[projectTitle];
  const projectSkillArray = projectData.spec.skill.split(", ");
  const selectSound = document.querySelector("#project-sound");
  const startSound = document.querySelector("#game-start");
  const describe = document.querySelector(".project__describe");
  const projectSkillList = document.querySelector(
    ".project-content__overview__skill"
  );

  const setProjectImage = (projectTitle) => {
    const oldImg = document.querySelector(".project-content__overview__image");
    const parent = oldImg.parentNode;
    const newImg = createElement("img", {
      class: "project-content__overview__image",
      src: data[projectTitle].backgroundImage,
      alt: `${projectTitle} image`,
    });
    parent.replaceChild(newImg, oldImg);
  };

  const clearProjectImage = () => {
    const oldImg = document.querySelector(".project-content__overview__image");
    const parent = oldImg.parentNode;
    const newImg = oldImg.cloneNode();
    newImg.classList.add("blink");
    parent.replaceChild(newImg, oldImg);
    setTimeout(() => {
      newImg.src = "";
      newImg.alt = "";
    }, 300);
  };

  const startProject = () => {
    play(startSound);
    Loading("Hamelln");
    setTimeout(() => {
      Project(projectData);
    }, 1000);
  };

  const handleFocus = () => {
    describe.textContent = projectData.describe;
    projectSkillArray.map((skill) => {
      const projectSkillItem = createElement("li", {
        class: "project-content__overview__skill__item",
        textContent: skill,
      });
      projectSkillList.appendChild(projectSkillItem);
      setProjectImage(projectTitle);
    });

    play(selectSound);
  };

  const handleBlur = () => {
    describe.textContent = "";
    projectSkillList.innerHTML = "";
    clearProjectImage();
  };

  addFocusHandler(project)(handleFocus);
  addBlurHandler(project)(handleBlur);
  addClickAndEnterHandler(project)(startProject);
};

const findPrevFocusItem = (className, textContent) => {
  const items = Array.from(document.querySelectorAll(className));
  return items.find((item) => item.textContent.trim() === textContent);
};

const focusPrevItem = (projectTitle) => {
  if (!projectTitle) return;
  const focusedItem = findPrevFocusItem(
    ".project-content__selection__item",
    projectTitle
  );
  addFocus(focusedItem);
};

const render = (parent, projectTitle) => {
  const selectionList = createProjectList();
  const selectionBox = createSelectionBox(selectionList);
  const projectFigure = createProjectFigure();

  parent.innerHTML = "";
  parent.appendChild(selectionBox);
  parent.appendChild(projectFigure);

  selectionList.childNodes.forEach((project) => {
    addEventProjectItem(project, projectTitle);
  });

  addKeyboardController();
  focusPrevItem(projectTitle);
};

export default function Selection(title = undefined) {
  const parent = document.querySelector(".project-content");
  render(parent, title);
}
