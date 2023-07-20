"use strict";

import addEventForClickAndEnter from "./addClickAndEnterHandler.js";
import scrollToSection from "./scrollToPosition.js";

const navigateWithScroll = () => {
  const homeLogo = document.querySelector(".header__logo");
  const tabs = document.querySelectorAll(".header-nav-list__item");
  const [aboutLink, projectLink, contactLink] = tabs;
  const navToProject = document.querySelector(".about__nav");

  addEventForClickAndEnter(homeLogo)(scrollToSection, "home");
  addEventForClickAndEnter(aboutLink)(scrollToSection, "about");
  addEventForClickAndEnter(projectLink)(scrollToSection, "project");
  addEventForClickAndEnter(contactLink)(scrollToSection, "contact");
  addEventForClickAndEnter(navToProject)(scrollToSection, "project");
};

export default navigateWithScroll;
