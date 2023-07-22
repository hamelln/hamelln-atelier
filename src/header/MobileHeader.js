"use strict";

import createElement from "../handlers/element-creater.js";

const headerNav = document.querySelector(".header-nav");
const modeElement = document.querySelector(".mode");

const openHeader = () => {
  headerNav.classList.add("active");
  modeElement.classList.add("active");
};
const closeHeader = () => {
  headerNav.classList.remove("active");
  modeElement.classList.remove("active");
};

const MobileHeader = () => {
  const header = document.querySelector(".header");
  const navList = document.querySelector(".header-nav-list");
  const hamburger = createElement("img", {
    class: "header__hamberger focusable",
    src: "/public/img/icons/hamburger.png",
    alt: "header navigation",
    onClick: [openHeader],
  });
  const closeButton = createElement("li", {
    class: "header-nav-list__item focusable",
    textContent: "Close",
    tabIndex: 0,
    onClick: [closeHeader],
  });
  navList.appendChild(closeButton);
  header.appendChild(hamburger);
};

export default MobileHeader;
