"use strict";

import addEventForClickAndEnter from "./addClickAndEnterHandler.js";
import { addFocus } from "./focus.js";

const navigateWithScroll = () => {
  const calcPosition = (element) => {
    const windowHeight = window.innerHeight;
    const headerHeight = document.querySelector("header").offsetHeight;
    const elementTop = element.offsetTop;
    const elementHeight = element.offsetHeight;
    return elementTop - (windowHeight - elementHeight) / 2 - headerHeight + 25;
  };

  const scrollToPosition = (element) => {
    const position = calcPosition(element);
    const firstFocusItem = element.querySelector(".focusable");
    addFocus(firstFocusItem);
    scrollTo(0, position);
  };

  const homeLogo = document.querySelector(".header__logo");
  const tabs = document.querySelectorAll(".header-nav-list__item");
  const [aboutLink, projectsLink, contactLink] = tabs;
  const header = document.querySelector(".header");
  const about = document.getElementById("about");
  const project = document.getElementById("project");
  const contact = document.getElementById("contact");
  const navToProject = document.querySelector(".about__nav");

  addEventForClickAndEnter(homeLogo)(scrollToPosition, header);
  addEventForClickAndEnter(aboutLink)(scrollToPosition, about);
  addEventForClickAndEnter(projectsLink)(scrollToPosition, project);
  addEventForClickAndEnter(contactLink)(scrollToPosition, contact);
  addEventForClickAndEnter(navToProject)(scrollToPosition, project);
};

export default navigateWithScroll;
