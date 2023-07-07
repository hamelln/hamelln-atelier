"use strict";

import { addFocus, removeFocus } from "../utils/focus.js";

const setupChangeProjectSkill = () => {
  const projects = new Map();
  projects.set("COFFEEN", {
    uuid: "95000cc1-beb9-4c77-8812-13a8be2d5a16",
    skills: "Next.js React TypeScript",
    member: 1,
    period: "6개월",
  });
  projects.set("반려in", {
    uuid: "6bb4b7ce-a576-423c-96d1-95fc5f376f35",
    skills: "HTML CSS JavaScript",
    member: 6,
    period: "2주",
  });
  projects.set("Modak", {
    uuid: "2d36e029-2d89-48a0-a919-7ad06030fe9b",
    skills: "Next.js React TypeScript Redux",
    member: 5,
    period: "1개월",
  });

  const isMobileDevice = /Mobi/i.test(navigator.userAgent);
  const event = isMobileDevice ? "click" : "focus";
  const skills = document.querySelector(".project__skills");
  const projectItems = document.querySelectorAll(
    ".project-content__selection__item"
  );

  const changeProjectSkill = (project) => {
    const projectTitle = project.textContent.trim();
    const skillText = projects.get(projectTitle)["skills"];
    skills.textContent = skillText;
  };

  projectItems.forEach((project) => {
    project.addEventListener(event, () => {
      changeProjectSkill(project);
      isMobileDevice && addFocus(project);
    });
    project.addEventListener("blur", () => {
      skills.textContent = "";
      removeFocus(project);
    });
  });
};

export default setupChangeProjectSkill;
