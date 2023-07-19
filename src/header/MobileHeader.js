import createElement from "../utils/createElement.js";

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

const addHeaderHandler = (hamburger) => {
  hamburger.addEventListener("click", openHeader);
  document.body.addEventListener("click", (e) => {
    const cutline = window.innerWidth * 0.6;
    const clickPoint = e.clientX;
    if (clickPoint <= cutline) closeHeader();
  });
};

const MobileHeader = () => {
  const header = document.querySelector(".header");
  const navList = document.querySelector(".header-nav-list");
  const hamburger = createElement("img", {
    class: "header__hamberger focusable",
    src: "/public/img/icons/hamburger.png",
    alt: "header navigation",
  });
  const closeButton = createElement("li", {
    class: "header-nav-list__item focusable",
    textContent: "Close",
    tabIndex: 0,
  });
  navList.appendChild(closeButton);
  header.appendChild(hamburger);
  addHeaderHandler(hamburger);
};

export default MobileHeader;
