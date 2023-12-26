"use strict";

import { addFocus } from "./focus-handler.js";

const calcCenterPositionOfSection = (section) => {
  const windowHeight = window.innerHeight;
  const sectionTop = section.offsetTop;
  const sectionHeight = section.offsetHeight;
  const position = sectionTop - (windowHeight - sectionHeight) / 2;
  return position;
};

const project = document.getElementById("project");
const PROJECT_POSITION = calcCenterPositionOfSection(project);

const focusOnFirstItem = (section) => {
  addFocus(section.querySelector(".focusable"));
};

const scrollToSection = (sectionId, isEnter) => {
  switch (sectionId) {
    case "about":
      scrollTo(0, 0);
      break;
    case "project":
      scrollTo(0, PROJECT_POSITION);
      isEnter && focusOnFirstItem(project);
      break;
    default:
      break;
  }
};

export default scrollToSection;
