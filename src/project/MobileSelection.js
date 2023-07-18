import data from "../data/project.json" assert { type: "json" };
import {
  addAttribute,
  makeElementWithClasses,
  makeImg,
} from "../utils/controllDOM.js";
import { play } from "../utils/sound.js";
import Loading from "./Loading.js";
import Project from "./Project.js";

const SELECT_SOUND = document.querySelector("#project-sound");
const START_SOUND = document.querySelector("#game-start");
const PROJECT_ID_LIST = ["반려in", "Hamelln", "COFFEEN", "Modak"];
const DEFAULT_CHECKED_INPUT_NUMBER = 2;
let inputIndex = DEFAULT_CHECKED_INPUT_NUMBER - 1;

const inputList = () => document.querySelectorAll("input");
const labelList = () =>
  document.querySelectorAll(".project-content__carousel__card");
const labelLength = () => labelList().length;
const labelArr = () => Array.from(labelList());

const createInputElements = () => {
  return Object.keys(data).map((_, i) => {
    const inputElement = document.createElement("input");
    return addAttribute(inputElement)({
      type: "radio",
      name: "slider",
      id: `item-${i + 1}`,
    });
  });
};

const createImgElement = (projectTitle) => {
  const src = data[projectTitle].backgroundImage;
  const alt = "project image";
  return makeImg("project-content__carousel__card__image")(src, alt);
};

const createLabelElements = (inputElements) => {
  return inputElements.map((input, index) => {
    const projectTitle = PROJECT_ID_LIST[index];
    const labelElement = makeElementWithClasses("label")(
      "project-content__carousel__card",
      "focusable"
    );
    addAttribute(labelElement)({
      for: input.id,
      id: projectTitle,
      tabIndex: 0,
    });
    const imgElement = createImgElement(projectTitle);
    labelElement.appendChild(imgElement);
    return labelElement;
  });
};

const createTitleBoxElements = () => {
  const titleBox = makeElementWithClasses("div")(
    "project-content__carousel__title-box"
  );
  const prevButton = makeElementWithClasses("button")(
    "project-content__carousel__title-box__prev"
  );
  const titleElement = makeElementWithClasses("p")(
    "project-content__carousel__title-box__title"
  );
  const nextButton = makeElementWithClasses("button")(
    "project-content__carousel__title-box__next"
  );
  prevButton.textContent = "←";
  nextButton.textContent = "→";
  return { titleBox, prevButton, titleElement, nextButton };
};

const findLabelByInputId = (id) => document.querySelector(`label[for=${id}]`);
const resetClassesOfLabels = () => {
  labelList().forEach((label) => {
    label.classList.remove("prev");
    label.classList.remove("active");
    label.classList.remove("next");
  });
};

const startProject = (projectData) => {
  play(START_SOUND);
  Loading("Hamelln");
  setTimeout(() => {
    Project(projectData);
  }, 1000);
};

const displayContent = (element, content) => {
  element.textContent = content;
};

const findLabelByIndex = (index) => {
  if (index < 0) return labelArr()[labelLength() + index];
  else if (index >= labelLength()) return labelArr()[index % labelLength()];
  return labelArr()[index];
};

const changeClassFromPrevToNext = (labelElement, activeIndex) => {
  resetClassesOfLabels();
  labelElement.classList.add("active");
  findLabelByIndex(activeIndex - 1).classList.add("prev");
  findLabelByIndex(activeIndex + 1).classList.add("next");
};

const displayProjectSkill = (projectSkillList, projectData) => {
  projectSkillList.innerHTML = "";
  const projectSkillArray = projectData.spec.skill.split(", ");

  for (let i = 0; i < 3; i++) {
    const skill = projectSkillArray[i];
    const projectSkillItem = makeElementWithClasses("li")(
      "project-content__overview__skill__item"
    );
    projectSkillItem.textContent = skill;
    projectSkillList.appendChild(projectSkillItem);
  }
};

const addEventToInputs = () => {
  inputList().forEach((input) => {
    const labelElement = findLabelByInputId(input.id);
    const projectId = labelElement.id;
    const projectData = data[projectId];
    const titleElement = document.querySelector(
      ".project-content__carousel__title-box__title"
    );
    const describeElement = document.querySelector(".project__describe");
    const projectSkillList = document.querySelector(
      ".project-content__overview__skill"
    );

    input.addEventListener("change", () => {
      setInputIndex(Number(input.id[5]) - 1);
      play(SELECT_SOUND);
      const projectTitle = projectData.title;
      const projectDescribe = projectData.describe;
      const activeIndex = labelArr().findIndex(
        (label) => label === labelElement
      );
      changeClassFromPrevToNext(labelElement, activeIndex);
      displayProjectSkill(projectSkillList, projectData);
      displayContent(titleElement, projectTitle);
      displayContent(describeElement, projectDescribe);
    });
  });
};

const fireChangeEvent = () => {
  const input = inputList()[inputIndex];
  input.checked = true;
  input.dispatchEvent(new Event("change"));
};

const setInputIndex = (currentIndex) => {
  const inputs = inputList();
  const length = inputs.length;
  if (currentIndex < 0) inputIndex = length + currentIndex;
  else if (currentIndex >= length) inputIndex = currentIndex % length;
  else inputIndex = currentIndex;
};

const nextProject = () => {
  setInputIndex(inputIndex + 1);
  fireChangeEvent();
};

const prevProject = () => {
  setInputIndex(inputIndex - 1);
  fireChangeEvent();
};

const addTouchEvent = () => {
  const carousel = document.querySelector(".project-content__carousel");
  const prevButton = document.querySelector(
    ".project-content__carousel__title-box__prev"
  );
  const nextButton = document.querySelector(
    ".project-content__carousel__title-box__next"
  );
  const titleElement = document.querySelector(
    ".project-content__carousel__title-box__title"
  );
  const projectData = data[titleElement.textContent.trim()];
  let beginX;
  let distance;

  carousel.addEventListener("touchstart", (e) => {
    beginX = e.touches[0].clientX;
    distance = 0;
  });
  carousel.addEventListener("touchmove", (e) => {
    const currentX = e.touches[0].clientX;
    distance = currentX - beginX;
  });
  carousel.addEventListener("touchend", () => {
    if (distance < 100 && distance > -100) return;
    if (distance >= 100) prevProject();
    else nextProject();
  });
  prevButton.addEventListener("click", prevProject);
  nextButton.addEventListener("click", nextProject);
  titleElement.addEventListener("click", () => {
    startProject(projectData);
  });
};

const checkInput = (title) => {
  const inputIdNumber = title
    ? PROJECT_ID_LIST.findIndex((projectTitle) => projectTitle === title) + 1
    : DEFAULT_CHECKED_INPUT_NUMBER;
  const inputId = `item-${inputIdNumber}`;
  const input = document.getElementById(inputId);
  input.checked = true;
  const labelElement = findLabelByInputId(inputId);
  changeClassFromPrevToNext(labelElement, inputIdNumber - 1);
};

const render = (projectTitle) => {
  const parent = document.querySelector(".project-content");
  const carousel = makeElementWithClasses("div")("project-content__carousel");
  const projectBox = makeElementWithClasses("div")(
    "project-content__carousel__cards"
  );
  const inputElements = createInputElements();
  const labelElements = createLabelElements(inputElements);
  const { titleBox, prevButton, titleElement, nextButton } =
    createTitleBoxElements();
  const describeElement = document.querySelector(".project__describe");
  const projectDescribe = data[projectTitle].describe;
  const projectSkillList = makeElementWithClasses("ul")(
    "project-content__overview__skill"
  );

  inputElements.map((inputElement) => {
    carousel.appendChild(inputElement);
  });
  labelElements.map((labelElement) => {
    projectBox.appendChild(labelElement);
  });
  titleBox.appendChild(prevButton);
  titleBox.appendChild(titleElement);
  titleBox.appendChild(nextButton);
  carousel.appendChild(projectBox);
  carousel.appendChild(projectSkillList);
  carousel.appendChild(titleBox);

  displayProjectSkill(projectSkillList, data[projectTitle]);
  displayContent(titleElement, projectTitle);
  displayContent(describeElement, projectDescribe);

  parent.innerHTML = "";
  parent.appendChild(carousel);
};

const MobileSelection = (title) => {
  const projectTitle = title ? title : "Hamelln";
  render(projectTitle);
  addEventToInputs();
  addTouchEvent();
  checkInput(projectTitle);
};

export default MobileSelection;
