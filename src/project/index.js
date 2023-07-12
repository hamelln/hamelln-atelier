"use strict";

import { addFocus, removeFocus } from "../utils/focus.js";
import data from "../data/project.json" assert { type: "json" };
import Project from "./Project.js";

const setupChangeProjectSkill = () => {
  const isMobileDevice = /Mobi/i.test(navigator.userAgent);
  const skills = document.querySelector(".project__skills");
  const projectItems = document.querySelectorAll(
    ".project-content__selection__item"
  );

  const changeProjectSkill = (project) => {
    const projectTitle = project.textContent.trim();
    const skillText = data[projectTitle].spec.skill;
    skills.textContent = skillText;
  };

  projectItems.forEach((project) => {
    project.addEventListener("focus", () => {
      changeProjectSkill(project);
      isMobileDevice && addFocus(project);
    });
    project.addEventListener("blur", () => {
      skills.textContent = "";
      removeFocus(project);
    });
    project.addEventListener("click", (e) => {
      const projectTitle = e.target.textContent.trim();
      const projectData = data[projectTitle];
      Project(projectData);
    });
  });
};

export default setupChangeProjectSkill;
