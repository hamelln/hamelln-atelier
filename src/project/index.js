"use strict";

import data from "../data/project.json" assert { type: "json" };
import addKeyboardNavigationWithScroll from "../ui/addKeyboardNavigationWithScroll.js";
import { addFocus, removeFocus } from "../utils/focus.js";
import { play } from "../utils/sound.js";
import Project from "./Project.js";
import Selection from "./Selection.js";

const setupChangeProjectSkill = () => {
  const isMobileDevice = /Mobi/i.test(navigator.userAgent);
  const main = document.querySelector(".project-content");
  const selectSound = document.getElementById("project-sound");
  const startSound = document.getElementById("game-start");
  const skills = document.querySelector(".project__skills");

  const displayProjectSkill = (projectTitle) => {
    const skillText = data[projectTitle].spec.skill;
    skills.textContent = skillText;
  };

  const mutationCallback = (mutationList) => {
    const changedClassName = mutationList[1].addedNodes[0].className;
    if (changedClassName === "project-content__selection") {
      const projectList = document.querySelectorAll(
        ".project-content__selection__item"
      );

      projectList.forEach((project) => {
        const projectTitle = project.textContent.trim();

        project.addEventListener("focus", () => {
          displayProjectSkill(projectTitle);
          isMobileDevice && addFocus(project);
          play(selectSound);
        });
        project.addEventListener("blur", () => {
          skills.textContent = "";
          removeFocus(project);
        });
        project.addEventListener("click", () => {
          const projectData = data[projectTitle];
          play(startSound);
          Project(projectData);
        });
      });

      isMobileDevice || addKeyboardNavigationWithScroll();
    }
  };

  const observer = new MutationObserver(mutationCallback);
  const config = { childList: true, subtree: true };
  observer.observe(main, config);

  Selection();
};

export default setupChangeProjectSkill;
