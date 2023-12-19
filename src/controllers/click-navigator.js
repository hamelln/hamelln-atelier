"use strict";

import scrollToSection from "../handlers/section-scroller.js";

const navigateWithScroll = () => {
  const projectTab = document.querySelector(".header-nav-list__item");
  const navToProject = document.querySelector(".about__nav");

  projectTab.addEventListener("click", () => {
    scrollToSection("project");
  });

  navToProject.addEventListener("click", () => {
    scrollToSection("project");
  });

  projectTab.addEventListener("keydown", ({ key }) => {
    if (key === "Enter") scrollToSection("project", true);
  });

  navToProject.addEventListener("keydown", ({ key }) => {
    if (key === "Enter") scrollToSection("project", true);
  });
};

export default navigateWithScroll;
