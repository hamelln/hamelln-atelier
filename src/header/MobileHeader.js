import { makeImg } from "../utils/controllDOM.js";

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

const createHamburger = () => {
  const src = "/public/img/icons/hamburger.png";
  const alt = "header navigation";
  return makeImg("header__hamberger", "focusable")(src, alt);
};

const addHeaderHandler = (hamburger) => {
  hamburger.addEventListener("click", openHeader);

  document.body.addEventListener("click", (e) => {
    const cutline = window.innerWidth * 0.7;
    const clickPoint = e.clientX;
    if (clickPoint <= cutline) closeHeader();
  });
};

const MobileHeader = () => {
  const header = document.querySelector(".header");
  const hamburger = createHamburger();
  addHeaderHandler(hamburger);
  header.appendChild(hamburger);
};

export default MobileHeader;
