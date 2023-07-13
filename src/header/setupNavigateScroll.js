"use strict";

import addEventForClickAndEnter from "../utils/addEventForClickAndEnter.js";

const setupNavigateScroll = () => {
  const calcPosition = (section) => {
    const windowHeight = window.innerHeight;
    const headerHeight = document.querySelector("header").offsetHeight;
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    return sectionTop - (windowHeight - sectionHeight) / 2 - headerHeight + 25;
  };

  const scrollToPosition = (position) => {
    scrollTo(0, position);
  };

  const homeLogo = document.querySelector(".header__logo");
  const tabs = document.querySelectorAll(".header-nav-list__item");
  const [aboutLink, projectsLink, contactLink] = tabs;
  const about = document.getElementById("about");
  const project = document.getElementById("project");
  const contact = document.getElementById("contact");
  const navToProject = document.querySelector(".about__nav");
  const aboutPosition = calcPosition(about);
  const projectPosition = calcPosition(project);
  const contactPosition = calcPosition(contact);

  addEventForClickAndEnter(homeLogo)(scrollToPosition, 0);
  addEventForClickAndEnter(aboutLink)(scrollToPosition, aboutPosition);
  addEventForClickAndEnter(projectsLink)(scrollToPosition, projectPosition);
  addEventForClickAndEnter(contactLink)(scrollToPosition, contactPosition);
  addEventForClickAndEnter(navToProject)(scrollToPosition, projectPosition);
};

export default setupNavigateScroll;
